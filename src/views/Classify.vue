<template>
  <div class="classify">
    <van-nav-bar
      title="菜谱分类"
      :border="false"
      left-arrow
      fixed
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="20" />
      </template>
    </van-nav-bar>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for="(item, index) in flatcatalogs"
        :key="index"
        :title="item.name"
      />
    </van-sidebar>
    <div class="content">
      <Classifyitem
        v-for="(item, index) in flatcatalogs"
        :key="index"
        :item="item"
        v-show="activeKey + 1 == item.id ? true : false"
      />
    </div>
  </div>
</template>

<script>
import Classifyitem from "../components/Classifyitem.vue";
import { Toast } from "vant";
export default {
  components: { Classifyitem },
  name: "Classify",
  data() {
    return {
      activeKey: 0,
      flatcatalogs: [],
      routeName: null,
    };
  },
  created() {
    //启动加载提示
    Toast.loading({
      message: "加载中...",
      //禁止穿透点击
      forbidClick: true,
      loadingType: "spinner",
      //不会自动关闭提示
      duration: 0,
    });
    this.getflatcatalogs();
    if (this.$route.params.routeName) {
      this.routeName = this.$route.params.routeName;
    }
  },
  methods: {
    getflatcatalogs() {
      this.axios({
        method: "get",
        url: `recipe/flatcatalogs`,
      })
        .then((result) => {
          if (result.status == 200) {
            this.flatcatalogs = result.data.result.cs;
            Toast.clear();
          } else {
          }
        })
        .catch((err) => {});
    },
    onClickLeft() {
      let routeName = this.routeName;
      if (routeName) {
        this.$router.push({ name: routeName });
      } else {
        this.$router.push({ name: "Recommended" });
      }
    },
    onClickRight() {
      this.$router.push({ name: "Search", params: { isClassify: "true" } });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  .van-icon {
    color: #020202;
    font-size: 22px;
  }
  .van-nav-bar__title {
    font-weight: bold;
  }
}

/deep/ .van-sidebar {
  width: 90px;
  height: 100%;
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  background-color: #f7f8fa;
  .van-sidebar-item {
    text-align: center;
    padding: 14px 12px;
  }
  .van-sidebar-item--select::before {
    background-color: #f6c753;
    left: 85px;
    border-radius: 2px;
    width: 3px;
    height: 17px;
  }
}

.classify {
  width: 100%;
  height: 100%;
  .content {
    position: fixed;
    top: 46px;
    right: 0;
    left: 90px;
    bottom: 0;
    overflow-y: scroll;
  }
}
</style>