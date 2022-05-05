<template>
  <div class="main">
    <div>
      <keep-alive>
        <router-view @getMessage="showMsg"></router-view>
      </keep-alive>
    </div>

    <van-tabbar
      v-model="activeIndex"
      inactive-color="#9c9c9c"
      active-color="#9c9c9c"
      route
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="{ name: item.routeName }"
      >
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img
            :src="
              props.active
                ? item.dark_image_selected_url
                : item.image_unselected_url
            "
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeIndex: 0,
      tabbarData: [
        {
          name: "首页",
          routeName: "Recommended",
          // routes: ["Recommended"],
          image_unselected_url:
            "https://i1.douguo.com/upload/banner/0/7/f/072aaff4630d9fd571b86c174b608c0f.png",
          dark_image_selected_url:
            "https://i1.douguo.com/upload/banner/6/c/4/6c79ea04fc25d1ef5a976359e29a76e4.png",
        },
        {
          name: "课堂",
          routeName: "Classroom",
          // routes: ["Classroom"],
          image_unselected_url:
            "https://i1.douguo.com/upload/banner/a/e/2/ae66b4af3e411ba65fe452bff7845a42.png",
          dark_image_selected_url:
            "https://i1.douguo.com/upload/banner/9/7/c/9795658a329ef1e63db5ac797eb747dc.png",
        },
        {
          name: "商城",
          routeName: "Store",
          // routes: ["Store"],
          image_unselected_url:
            "https://i1.douguo.com/upload/banner/d/e/3/de8c0a8dfea6bfcdb3053d0ec47391c3.png",
          dark_image_selected_url:
            "https://i1.douguo.com/upload/banner/6/c/8/6c739976317176fd86e81c8ca5900318.png",
        },
        {
          name: "收藏夹",
          routeName: "Favorites",
          // routes: ["Favorites"],
          image_unselected_url:
            "https://i1.douguo.com/upload/banner/6/7/b/677e0c4fe33ea1fb3781c8e69d06f58b.png",
          dark_image_selected_url:
            "https://i1.douguo.com/upload/banner/d/f/4/df227e5f9d363332ee14d9cdb227f974.png",
        },
        {
          name: "我的",
          routeName: "My",
          // routes: ["My"],
          image_unselected_url:
            "https://i1.douguo.com/upload/banner/b/b/b/bba32b6d29734395aa397edebffdf48b.png",
          dark_image_selected_url:
            "https://i1.douguo.com/upload/banner/d/c/f/dc060277b32a28edfc3d155e6157d33f.png",
        },
      ],
    };
  },
  created() {
    // let routeName = this.$route.name;
    // for (let i = 0; i < this.tabbarData.length; i++) {
    //   if (this.tabbarData[i].routes.indexOf(routeName) > -1) {
    //     this.activeIndex = i;
    //     break;
    //   }
    // }
  },

  methods: {
    showMsg(val) {
      this.tabbarData[0].routeName = val;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
