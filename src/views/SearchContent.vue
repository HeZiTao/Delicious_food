<template>
  <div class="searchContent">
    <div class="topFixed">
      <div class="top">
        <van-icon name="arrow-left" @click="returnBtn" />
        <van-search v-model="value" :clearable="false" @focus="toSearchBtn" />
      </div>
      <van-tabs
        v-model="active"
        @change="changeActive"
        color="#f7cc52"
        line-width="26px"
        duration="0.2"
      >
        <van-tab title="综合"></van-tab>
        <van-tab title="收藏高"></van-tab>
        <van-tab title="学做多"></van-tab>
      </van-tabs>
    </div>

    <div class="content" ref="searchContentBox">
      <div
        class="searchItem"
        v-for="(item, index) in searchData"
        :key="index"
        @click="clickItem(item)"
      >
        <Searchitem :item="item" />
      </div>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Searchitem from "../components/Searchitem.vue";
export default {
  components: { Searchitem },
  name: "SearchContent",
  data() {
    return {
      value: "",
      active: 0,
      order: 0,
      searchData: [],
      scrollTop: 0,
    };
  },
  activated() {
    this.isSearch = this.$route.params.isSearch;
    if (this.isSearch) {
      Toast.loading({
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        loadingType: "spinner",
        //不会自动关闭提示
        duration: 0,
      });
      this.scrollTop = 0;
      this.active = 0;
      this.searchData = [];
      this.value = this.$route.params.val;
      this.getSearchContent();
    }
    this.$nextTick(() => {
      let refs = this.$refs;
      refs.searchContentBox.scrollTop = this.scrollTop;
    });
  },
  mounted() {
    let searchContentBox = this.$refs.searchContentBox;
    searchContentBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getSearchContent() {
      this.axios({
        method: "get",
        url: `recipe/search`,
        params: {
          keyword: this.value,
          order: this.order,
          type: 0,
          secondary_keyword: null,
          offset: 0,
          limit: 20,
          isSuccess: false,
          isSearch: false,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            result.data.result.list.forEach((ele) => {
              if (ele.r) {
                this.searchData.push(ele);
              }
              this.isSuccess = false;
            });
            
            Toast.clear();
          } else {
            
          }
        })
        .catch((err) => {
          
          Toast.clear();
        });
    },
    returnBtn() {
      let isClassify = this.$route.params.isClassify;
      if (this.isSearch && !isClassify) {
        this.$router.push({ name: "Search" });
      } else if (isClassify) {
        this.$router.push({ name: "Classify" });
      } else {
        this.$router.push({ name: "Search" });
      }
    },
    toSearchBtn() {
      let val = this.value;
      this.$router.push({
        name: "Search",
        params: { val: val, isSearchContent: true },
      });
    },
    changeActive() {
      if (this.active == 1) {
        this.order = 2;
      } else if (this.active == 2) {
        this.order = 3;
      } else {
        this.order = 0;
      }
      this.searchData = [];
      this.getSearchContent();
    },
    handleScroll(e) {
      this.scrollTop = e.target.scrollTop;
      var searchContentBoxHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (
        Math.abs(scrollHeight - this.scrollTop - searchContentBoxHeight) <= 1
      ) {
        if (this.isSuccess) {
          return;
        }
        this.isSuccess = true;
        this.offset += 20;
        this.getSearchContent();
      }
    },
    clickItem(item) {
      let id = item.r.id;
      let val = this.value;
      this.$router.push({
        name: "Detail",
        params: { id, val },
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-icon-arrow-left {
  color: #020202;
  font-size: 22px;
  padding-left: 12px;
  padding-right: 2px;
}
/deep/ .van-search {
  width: 100%;
}
/deep/ .van-tabs__line {
  bottom: 21px;
}

.searchContent {
  width: 100%;
  height: 100%;
  .topFixed {
    width: 100%;
    height: 100px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .top {
    display: flex;
    align-items: center;
  }
  .content {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
  }
}
</style>