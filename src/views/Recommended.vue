<template>
  <div class="recommended" ref="recomendBox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-show="isLoadYes">
        <van-swipe height="110" :autoplay="3700" indicator-color="#fff">
          <van-swipe-item
            v-for="(item, index) in recommendedBanner"
            :key="index"
          >
            <img class="auto-img" v-lazy="item.i" />
          </van-swipe-item>
        </van-swipe>
        <div class="recommended-content">
          <div
            v-for="(item, index) in recommendedList"
            :key="index"
            @click="clickItem(item)"
          >
            <Reitem
              :item="item"
              :collectUser="
                item.r
                  ? item.r.collect_users
                  : item.note
                  ? item.note.collect_users
                  : []
              "
              :isCollectUser="
                item.r
                  ? item.r.collect_users
                  : item.note
                  ? item.note.collect_users
                  : false
              "
            />
          </div>
        </div>
      </div>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </van-pull-refresh>
  </div>
</template>

<script>
import Reitem from "../components/Reitem.vue";
import { Toast } from "vant";
export default {
  name: "Recommended",
  components: {
    Reitem,
  },
  data() {
    return {
      recommendedBanner: [],
      recommendedList: [],
      offset: 0,
      isLoading: false,
      scrollTop: 0,
      isSuccess: false,
      isLoadYes: false,
    };
  },
  created() {
    this.getHomeRecommended();
  },
  activated() {
    this.$nextTick(() => {
      let refs = this.$refs;
      refs.recomendBox.scrollTop = this.scrollTop;
    });
  },
  mounted() {
    let recomendBox = this.$refs.recomendBox;
    recomendBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getHomeRecommended() {
      this.axios({
        method: "get",
        url: `home/recommended/${this.offset}/10`,
      })
        .then((result) => {
          if (result.status == 200) {
            this.recommendedBanner = result.data.result.banner;
            result.data.result.list.forEach((ele) => {
              if (!ele.dsp) {
                this.recommendedList.push(ele);
              }
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
        this.offset += 10;
        this.getHomeRecommended();
      }
    },
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.recommendedList = [];
        this.offset += 10;
        this.isLoadYes = false;
        this.getHomeRecommended();
      }, 1000);
    },
    clickItem(item) {
      
      let id = item.r
        ? item.r.id
        : item.note
        ? item.note.id
        : item.mg
        ? item.mg.id
        : "";
      if (item.r) {
        this.$router.push({ name: "Detail", params: { id } });
      } else {
        this.$router.push({ name: "Notesdetail", params: { id } });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.recommended {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .recommended-content {
    background-color: #fff;
  }
}
/deep/ .van-swipe__indicators {
  bottom: 6px;
  .van-swipe__indicator {
    width: 14px;
    height: 3px;
    border-radius: 0;
    background-color: #4e3423;
  }
}
</style>