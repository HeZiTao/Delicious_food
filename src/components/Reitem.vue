<template>
  <div class="contentItem">
    <div class="userMsg">
      <van-image
        round
        width="34px"
        height="34px"
        :src="
          item.r ? item.r.a.p : item.note ? item.note.author.p : item.mg.a.p
        "
        @click.stop="user"
      />
      <div class="userName userMargin">
        {{ item.r ? item.r.a.n : item.note ? item.note.author.n : item.mg.a.n }}
      </div>
      <div class="userLeve userMargin">
        LV.{{
          item.r
            ? item.r.a.lvl
            : item.note
            ? item.note.author.lvl
            : item.mg.a.lvl
        }}
      </div>
    </div>
    <div class="reItemImg">
      <van-image
        width="100%"
        :height="swipeImgHeight + 'px'"
        fit="contain"
        @load="checkImg(item)"
        :src="
          item.r ? item.r.p : item.note ? item.note.image_u : item.mg.image_url
        "
      />
      <div
        class="play"
        v-if="item.r ? item.r.vfurl : item.note ? item.note.video_url : ''"
      >
        <van-icon name="play-circle-o" color="#eee" size="26" />
      </div>
    </div>
    <div class="collect" v-if="isCollectUser">
      <div class="collectNumber">
        <div class="allCollectUser">
          <div class="collectUser" v-for="(a, b) in collectUser" :key="b">
            <van-image round width="18px" height="18px" :src="a.p" />
            <van-icon name="like" v-if="!a.p" />
          </div>
        </div>
        <div class="collectRight">
          {{
            item.r
              ? item.r.collect_count_text
              : item.note
              ? item.note.like_count + "人点赞"
              : ""
          }}
        </div>
      </div>
      <van-icon name="star-o" color="#000" size="26px" v-if="!isFavor" />
      <van-icon name="star" size="26" color="#f6c753" v-else />
    </div>
    <div class="contentText">
      {{
        item.r ? item.r.stdname : item.note ? item.note.title : item.mg.title
      }}
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Reitem",
  data() {
    return {
      screenWidth: document.body.clientWidth,
      swipeImgHeight: null,

      loginUser: null,
      isFavor: false,
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    collectUser: {
      default() {
        return {};
      },
    },
    isCollectUser: {
      default: false,
    },
  },
  created() {
    if (this.item.r) {
      this.getLocalFavoritesRecipes();
    }
  },
  activated() {
    if (this.item.r) {
      this.getLocalFavoritesRecipes();
    }
  },
  methods: {
    checkImg(item) {
      let itemData = item.r ? item.r : item.note ? item.note : item.mg;

      if (itemData.ph && itemData.pw) {
        this.swipeImgHeight = itemData.ph / (itemData.pw / this.screenWidth);
        if (this.swipeImgHeight > 400) {
          this.swipeImgHeight = 400;
        }
      }
    },
    user() {
      let userid = null;
      if (this.item.r) {
        userid = this.item.r.a.id;
      } else if (this.item.note) {
        userid = this.item.note.author.id;
      } else {
        userid = this.item.mg.a.id;
      }
      this.$router.push({ name: "User", params: { userid } });
    },
    getLoginUser() {
      // if (!this.loginUser) {
      // Toast("请先登录");
      // this.$router.push({ name: "My" });
      // return;
      // }
    },

    getLocalFavoritesRecipes() {
      let loginUser = localStorage.getItem("loginUser");
      this.loginUser = JSON.parse(loginUser);
      this.isFavor = false;
      let localFavoritesRecipes = localStorage.getItem("localFavoritesRecipes");
      let localFavoritesRecipesData = null;
      if (localFavoritesRecipes) {
        localFavoritesRecipesData = JSON.parse(localFavoritesRecipes);
      } else {
        localFavoritesRecipesData = [];
      }

      if (localFavoritesRecipesData.length > 0) {
        localFavoritesRecipesData.forEach((ele) => {
          if (ele.loginUser == this.loginUser && ele.id == this.item.r.id) {
            this.isFavor = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentItem {
  margin-bottom: 10px;
  .userMsg {
    height: 56px;
    padding: 14px 12px 9px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 13px;
    .userLeve {
      color: #c6a64f;
      font-size: 12px;
      font-weight: bold;
      font-style: italic;
    }
    .userMargin {
      margin-left: 10px;
    }
  }
  .reItemImg {
    position: relative;
    .play {
      position: absolute;
      bottom: 10px;
      right: 10px;
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
  }
  .contentText {
    padding: 2px 10px;
    font-size: 15px;
  }
}
</style>