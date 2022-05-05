<template>
  <div class="contentItem">
    <div class="userMsg">
      <van-image round width="34px" height="34px" :src="item.r.a.p" />
      <div class="userName userMargin">{{ item.r.a.n }}</div>
      <div class="userLeve userMargin">LV.{{ item.r.a.lvl }}</div>
    </div>
    <div class="videoBox" :style="{ height: videoHeight }">
      <video
        loop
        muted
        ref="videoMsg"
        width="100%"
        :height="videoHeight"
        :src="item.r.vu"
      ></video>
      <div class="muted">
        <van-image
          width="20px"
          height="20px"
          :src="require('../assets/jingyin.png')"
        />
      </div>
    </div>
    <div class="collect">
      <div class="collectNumber">
        <div class="allCollectUser">
          <div
            class="collectUser"
            v-for="(a, b) in item.r.collect_users"
            :key="b"
          >
            <van-image round width="18px" height="18px" :src="a.p" />
            <van-icon name="like" v-if="!a.p" />
          </div>
        </div>
        <div class="collectRight">
          {{ item.r.collect_count_text }}
        </div>
      </div>
      <van-icon name="star-o" color="#000" size="26px" />
    </div>
    <div class="contentText">
      {{ item.r.stdname }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Videositem",
  data() {
    return {
      screenHeight: document.body.clientHeight,
      videoHeight: 400,
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
    this.videoHeight = 0.6 * this.screenHeight;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.contentItem {
  height: 100%;
  .userMsg {
    height: 56px;
    padding: 9px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    .userLeve {
      color: #c6a64f;
      font-size: 12px;
      font-weight: bold;
      font-style: italic;
    }
    .userMargin {
      margin-left: 6px;
    }
  }
  .videoBox {
    // height: 400px;
    background-color: #000;
    position: relative;
    .muted {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }
  }
  .collect {
    height: 26px;
    padding: 7px 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .collectNumber {
      display: flex;
      align-items: center;
      .allCollectUser {
        display: flex;
        align-items: center;
        .collectUser {
          width: 18px;
          height: 18px;
          margin-left: -6px;
          border-radius: 50%;
          &:first-child {
            margin-left: 0;
          }
          &:last-of-type {
            margin-right: 10px;
          }
          /deep/ .van-image--round {
            border: 1px solid #fff;
          }
        }
      }
      .collectRight {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
  .contentText {
    padding: 2px 10px;
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>