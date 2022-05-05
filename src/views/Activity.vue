<template>
  <div class="activity" ref="activityBox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-show="isLoadYes">
        <div class="swipe">
          <div class="notice">公告</div>
          <van-swipe
            style="height: 36px"
            vertical
            :show-indicators="false"
            autoplay="2000"
            duration="1400"
          >
            <van-swipe-item
              v-for="(item, index) in activityBanner"
              :key="index"
            >
              <div class="swipeContent">
                <div class="swipeUser">{{ item.nickname }}</div>
                <div class="center">刚参加了活动</div>
                <div class="activityName">{{ item.name }}</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="activity-content">
          <div class="hotActivity">
            <h2>热门活动上线中</h2>
            <div v-for="(item, index) in ongoing" :key="index">
              <Activityitem :item="item" :isOld="false" />
            </div>
          </div>
          <div class="oldActivity">
            <h2>往期回顾</h2>
            <div v-for="(item, index) in ended" :key="index">
              <Activityitem :item="item" :isOld="true" />
            </div>
          </div>
        </div>
      </div>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </van-pull-refresh>
  </div>
</template>

<script>
import Activityitem from "../components/Activityitem.vue";
import { Toast } from "vant";
export default {
  name: "Activity",
  components: {
    Activityitem,
  },
  data() {
    return {
      offset: 0,
      activityBanner: [],
      ongoing: [],
      ended: [],
      scrollTop: 0,
      isLoading: false,
      isSuccess: false,
      isLoadYes: false,
    };
  },
  created() {
    this.getHomeActivity();
  },
  activated() {
    this.$nextTick(() => {
      let refs = this.$refs;
      refs.activityBox.scrollTop = this.scrollTop;
    });
  },
  mounted() {
    let activityBox = this.$refs.activityBox;
    activityBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getHomeActivity() {
      this.axios({
        method: "get",
        url: `home/events/getlists?offset=${this.offset}limit=20`,
      })
        .then((result) => {
          if (result.status == 200) {
            if (this.ongoing.length == 0) {
              
              this.ongoing = result.data.data.ongoing.events;
              this.activityBanner = result.data.data.banner;
            }
            result.data.data.ended.events.forEach((ele) => {
              this.ended.push(ele);
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
      if (Math.abs(scrollHeight - this.scrollTop - recomendBoxHeight) <= 50) {
        if (this.isSuccess) {
          return;
        }
        this.isSuccess = true;
        this.offset += 20;
        this.getHomeActivity();
        
      }
    },
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.offset = 0;
        this.activityBanner = [];
        this.ongoing = [];
        this.ended = [];
        this.isLoadYes = false;
        this.getHomeActivity();
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.activity {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .swipe {
    width: calc(90% - 45px);
    padding-left: 45px;
    line-height: 36px;
    margin: 0 auto;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 8px;
    position: relative;
    .notice {
      width: 30px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      background-color: #f6c753;
      border-radius: 2px 6px 2px 6px;
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
    }
    .swipeContent {
      height: 36px;
      display: flex;
      align-items: center;
      .swipeUser {
        max-width: 80px;
        font-size: 13px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .center {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 2px;
      }
      .activityName {
        width: 130px;
        font-size: 13px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .activity-content {
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 17px;
    }
  }
}
</style>