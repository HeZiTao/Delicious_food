<template>
  <div class="classifyitem">
    <div class="notTitle" v-show="!isTitle">
      <div
        class="notTitleItem"
        v-for="(a, b) in item.cs"
        :key="b"
        @click="searchText(a.name)"
      >
        {{ a.name }}
      </div>
    </div>
    <div class="title" v-show="isTitle">
      <div class="titleItem" v-for="(a, b) in item.cs" :key="b">
        <div class="bigTitle" @click="searchText(a.name)">
          {{ a.name }}
          <van-icon name="arrow" />
        </div>
        <div class="little">
          <div
            class="littleTitle"
            v-for="(x, y) in a.cs"
            :key="y"
            @click="searchText(x.name)"
          >
            {{ x.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classifyitem",
  data() {
    return {
      isTitle: true,
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.item.cs.forEach((ele) => {
      if (ele.cs.length !== 0) {
        this.isTitle = true;
        return;
      }
      this.isTitle = false;
    });
  },
  methods: {
    searchText(item) {
      this.$router.push({
        name: "SearchContent",
        params: { val: item, isSearch: "true", isClassify: "true" },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.notTitle {
  padding: 0 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  .notTitleItem {
    min-width: 48px;
    padding: 8px 16px;
    text-align: center;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 4px;
    color: rgb(48, 48, 48);
    margin: 10px 2px;
  }
}

.title {
  .titleItem {
    width: 90%;
    margin: 10px auto;
    .bigTitle {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
      border-radius: 6px;
      background-color: #ffe9ad;
      color: #ebb930;
    }
    .little {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      .littleTitle {
        min-width: 48px;
        padding: 8px 14px;
        text-align: center;
        border: 1px solid rgb(240, 240, 240);
        border-radius: 4px;
        color: rgb(48, 48, 48);
        margin: 10px 0px;
      }
    }
  }
}
</style>