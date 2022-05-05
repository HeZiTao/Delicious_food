<template>
  <div class="feed" ref="feedBox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="feedTop" v-show="isLoadYes">
        <div class="one">豆果美食，会做饭很酷~</div>
        <div class="two">你关注人的动态会出现在这</div>
        <div class="two">为你推荐了一些有趣的人，快关注TA们吧</div>
      </div>
      <div class="feed-content">
        <div
          v-for="(item, index) in feedList"
          :key="index"
          @click="clickItem(item)"
        >
          <Feeditem :item="item" />
        </div>
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Feeditem from "../components/Feeditem.vue";
import { Toast } from "vant";
export default {
  name: "Feed",
  components: {
    Feeditem,
  },
  data() {
    return {
      feedList: [],
      isLoading: false,
      offset: 0,
      scrollTop: 0,
      isSuccess: false,
      isLoadYes: false,
    };
  },
  created() {
    this.getHomeFeed();
  },
  mounted() {
    let feedBox = this.$refs.feedBox;
    feedBox.addEventListener("scroll", this.handleScroll, true);
  },
  activated() {
    this.$nextTick(() => {
      let refs = this.$refs;
      refs.feedBox.scrollTop = this.scrollTop;
    });
  },
  methods: {
    getHomeFeed() {
      this.axios({
        method: "get",
        url: `home/ffeeds/${this.offset}/20`,
      })
        .then((result) => {
          if (result.status == 200) {
            result.data.result.rfs.forEach((ele) => {
              this.feedList.push(ele);
            });
            this.isSuccess = false;
            this.isLoadYes = true;
          } else {
            
          }
        })
        .catch((err) => {
          
        });
    },
    handleScroll(e) {
      this.scrollTop = e.target.scrollTop;
      var recomendBoxHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (Math.abs(scrollHeight - this.scrollTop - recomendBoxHeight) <= 1) {
        if (this.isSuccess) {
          return;
        }
        this.isSuccess = true;
        this.offset += 20;
        this.getHomeFeed();
      }
    },
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.feedList = [];
        this.offset += 20;
        this.isLoadYes = false;
        this.getHomeFeed();
      }, 1000);
    },
    clickItem(item) {
      
      let id = item.item_id;
      
      this.$router.push({ name: "Detail", params: { id, item } });
    },
  },
};
</script>

<style lang="less" scoped>
.feed {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .feedTop {
    padding: 16px;
    background-color: #fafafa;
    .one {
      font-size: 15px;
      margin-bottom: 8px;
    }
    .two {
      color: #9e9e9e;
    }
  }
  .feed-content {
    background-color: #fff;
  }
}
</style>