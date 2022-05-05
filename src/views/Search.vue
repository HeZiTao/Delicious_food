<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      :placeholder="placeholder"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
      ref="seach_input"
    />
    <div class="searchContent" v-if="!value">
      <div class="historySearch" v-if="isHistory">
        <div class="historyDel">
          <h3>历史搜索</h3>
          <van-icon
            name="delete-o"
            size="20"
            color="rgb(161, 161, 161)"
            @click="delHistory"
          />
        </div>
        <div class="historyBox">
          <div
            class="historyBoxItem"
            v-for="(item, index) in historySearch"
            :key="index"
            @click="historyBtn(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="hotSearch">
        <h3>热门搜索</h3>
        <div class="hotBox">
          <div
            class="hotItem"
            v-for="(item, index) in suggestdetails"
            :key="index"
            :style="{
              borderColor: item.borderColor,
              backgroundColor: item.background_color,
              color: item.color,
            }"
            @click="historyBtn(item.title)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="searchSuggests" v-if="value">
      <van-loading
        v-show="searchSuggests[0] ? false : true"
        size="24px"
        vertical
        >加载中...</van-loading
      >
      <div
        class="suggestItem"
        v-for="(item, index) in searchSuggests"
        :key="index"
        @click="historyBtn(item.name)"
      >
        <div class="suggestName">
          <span
            v-for="(a, b) in item.suggests_names"
            :key="b"
            :style="{ fontWeight: a.is_bold ? 'bold' : 'normal' }"
            >{{ a.suggests_name }}</span
          >
        </div>
        <div
          class="suggestTag"
          v-if="item.tag"
          :style="{
            borderColor: item.tag.border_color,
            color: item.tag.text_color,
            backgroundColor: item.tag.background_color,
          }"
        >
          {{ item.tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      suggestdetails: [],
      placeholder: null,
      historySearch: [],
      isHistory: false,
      searchSuggests: [],
      routeName: null,
    };
  },
  created() {
    this.getHomeSearch();
    this.setLocalStorage();
  },
  activated() {
    this.showsearch();
    if (this.historySearch.length > 0) {
      this.isHistory = true;
    }
    this.value = this.$route.params.val;

    if (this.$route.params.routeName) {
      this.routeName = this.$route.params.routeName;
    }
  },
  methods: {
    getHomeSearch() {
      this.axios({
        method: "get",
        url: `recipe/search/hot`,
      })
        .then((result) => {
          if (result.status == 200) {
            this.suggestdetails = result.data.result.suggestdetails;
            this.placeholder = result.data.result.default_search.title;
          } else {
          }
        })
        .catch((err) => {});
    },
    onSearch(val) {
      if (!val) {
        val = this.placeholder;
      }
      if (this.historySearch.indexOf(val) == -1) {
        this.historySearch.push(val);
        localStorage.setItem(
          "douguohistory",
          JSON.stringify(this.historySearch)
        );
      }
      this.$router.push({
        name: "SearchContent",
        params: { val: val, isSearch: "true" },
      });
      this.value = "";
    },
    onCancel() {
      let isSearchContent = this.$route.params.isSearchContent;
      if (isSearchContent) {
        let val = this.$route.params.val;
        this.$router.push({ name: "SearchContent", params: { val } });
      } else {
        let routeName = this.routeName;
        this.$router.push({ name: routeName });
      }
    },
    onInput(val) {
      if (!val) {
        return;
      }
      this.searchSuggests = [];
      this.axios({
        method: "get",
        url: `recipe/search/suggests`,
        params: {
          kw: val,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.searchSuggests = result.data.result.suggests;
          } else {
          }
        })
        .catch((err) => {});
    },
    showsearch() {
      this.$nextTick(() => {
        let inputBox =
          this.$refs.seach_input.children[0].children[0].children[1].children[0]
            .children[0];
        inputBox.focus();
      });
    },
    delHistory() {
      localStorage.removeItem("douguohistory");
      this.historySearch = [];
      this.isHistory = false;
    },
    setLocalStorage() {
      this.historySearch = localStorage.getItem("douguohistory");
      this.historySearch = JSON.parse(this.historySearch);
      if (!this.historySearch) {
        this.historySearch = [];
      }
    },
    historyBtn(item) {
      this.onSearch(item);
      this.onInput(item);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-search__action {
  font-size: 12px;
  color: rgb(102, 102, 102);
}
.historySearch {
  padding: 0 14px;
  .historyDel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .historyBox {
    display: flex;
    flex-flow: row wrap;
    .historyBoxItem {
      color: rgb(63, 63, 63);
      border: 1px solid rgb(250, 250, 250);
      background-color: rgb(250, 250, 250);
      margin-right: 12px;
      margin-bottom: 12px;
      border-radius: 6px;
      padding: 3px 10px;
      font-size: 14px;
    }
  }
}
.hotSearch {
  padding: 0 14px;

  .hotBox {
    display: flex;
    flex-flow: row wrap;
    .hotItem {
      border: 1px solid #000;
      margin-right: 12px;
      margin-bottom: 12px;
      border-radius: 6px;
      padding: 3px 10px;
      font-size: 14px;
    }
  }
}
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
.searchSuggests {
  padding: 10px 12px 12px;
  .suggestItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 8px 0;
    .suggestName {
      font-size: 15px;
    }
    .suggestTag {
      border: 1px solid #000;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 10px;
    }
  }
}
</style>