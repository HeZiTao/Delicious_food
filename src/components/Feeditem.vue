<template>
  <div class="contentItem">
    <div class="itemTop">
      <div class="userMsg">
        <van-image round width="34px" height="34px" :src="item.u.p" />
        <div class="userMargin">
          <div class="userTop">
            <div class="userName">
              {{ item.u.n }}
            </div>
            <div class="userLeve">LV.{{ item.u.lvl }}</div>
          </div>
          <div class="userBottom">
            {{ item.u.followers_count_text }}<span class="dian"> · </span
            >{{ item.u.recipes_count_text }}
          </div>
        </div>
      </div>
      <div class="feedBtn">关注</div>
    </div>
    <van-image width="100%" height="100%" :src="item.img" />
    <div class="collect">
      <div class="collectNumber">
        <div class="allCollectUser">
          <div
            class="collectUser"
            v-for="(a, b) in item.collect_users"
            :key="b"
          >
            <van-image round width="18px" height="18px" :src="a.p" />
          </div>
        </div>
        <div class="collectRight">
          {{ item.collect_count_text }}
        </div>
      </div>
      <div class="iconBtn">
        <van-icon name="star-o" color="#000" size="26px" />
        <van-icon name="chat-o" color="#000" size="26px" />
        <van-icon name="share-o" color="#000" size="26px" />
      </div>
    </div>
    <div class="contentText">
      {{ item.n }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Feeditem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.contentItem {
  margin-bottom: 10px;
  .itemTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userMsg {
      height: 56px;
      padding: 9px 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .userMargin {
        margin-left: 10px;
        .userTop {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 2px;
          .userLeve {
            color: #c6a64f;
            font-size: 12px;
            font-weight: bold;
            font-style: italic;
            margin-left: 10px;
          }
        }
        .userBottom {
          font-size: 12px;
          color: #9d9d9d;
          .dian {
            font-weight: bold;
          }
        }
      }
    }
    .feedBtn {
      padding: 4px 18px;
      margin-right: 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      background-color: #f6c753;
    }
  }

  .collect {
    height: 26px;
    padding: 7px 10px;
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
    .iconBtn {
      width: 110px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .contentText {
    padding: 2px 10px;
    font-size: 15px;
  }
}
</style>