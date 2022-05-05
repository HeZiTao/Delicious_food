<template>
  <div class="home">
    <van-nav-bar>
      <template #left>
        <div class="publishBtn">+</div>
      </template>
      <template #title>
        <van-search placeholder="请输入搜索关键词" @focus="inSearch" />
      </template>
      <template #right>
        <van-icon color="#010101" size="26" name="bars" @click="inClassify" />
        <van-icon color="#010101" size="26" name="bullhorn-o" />
      </template>
    </van-nav-bar>

    <van-tabs
      v-model="homeTabsActive"
      color="#f7cc52"
      line-width="24px"
      duration="0.2"
      @change="tabschange"
    >
      <van-tab
        v-for="(item, index) in homeTabsArray"
        :title="item.title"
        :key="index"
        :to="item.PageName"
      >
      </van-tab>
    </van-tabs>

    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      homeTabsArray: [
        {
          routeName: "feed",
          PageName: "Feed",
          title: "关注",
        },
        {
          routeName: "recommended",
          PageName: "Recommended",
          title: "推荐",
        },
        {
          routeName: "notes",
          PageName: "Notes",
          title: "笔记",
        },
        {
          routeName: "videos",
          PageName: "Videos",
          title: "视频",
        },
        {
          routeName: "activity",
          PageName: "Activity",
          title: "活动",
        },
        {
          routeName: "infantmom",
          PageName: "Infantmom",
          title: "母婴",
        },
        {
          routeName: "baking",
          PageName: "Baking",
          title: "安佳烘焙",
        },
      ],
      homeTabsActive: 1,
    };
  },
  activated() {
    let routeName = this.$route.name;
    for (let i = 0; i < this.homeTabsArray.length; i++) {
      if (this.homeTabsArray[i].routeName == routeName.toLowerCase()) {
        this.homeTabsActive = i;
        break;
      }
    }
    let nowPage = this.homeTabsArray[this.homeTabsActive].PageName;
    this.$emit("getMessage", nowPage);
  },
  methods: {
    inClassify() {
      let routeName = this.$route.name;
      this.$router.push({ name: "Classify", params: { routeName } });
    },
    inSearch() {
      let routeName = this.$route.name;
      this.$router.push({ name: "Search", params: { routeName } });
    },
    tabschange() {
      let nowPage = this.homeTabsArray[this.homeTabsActive].PageName;
      this.$emit("getMessage", nowPage);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  /deep/ .van-tab {
    font-size: 15px;
  }
  /deep/ .van-search {
    width: 400px;
    padding: 0;
  }
  /deep/ .van-nav-bar__title {
    margin-left: 50px;
  }
  /deep/ .van-icon {
    color: #a0a0a0;
    font-size: 18px;
  }
  /deep/ .van-icon-bullhorn-o {
    margin-left: 16px;
  }

  /deep/ .van-hairline--bottom::after {
    border-bottom: none;
  }

  /deep/ .van-tab--active {
    font-weight: bold;
    font-size: 20px;
  }
  /deep/ .van-tabs__line {
    bottom: 19px;
  }

  .publishBtn {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 22px;
    border-radius: 50%;
    background-color: #f7cc52;
  }
  .content {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
  }
}
</style>