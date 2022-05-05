<template>
  <div class="detail" ref="detailBox">
    <div v-if="isNoPage">
      <van-nav-bar title="菜谱详情">
        <template #left>
          <van-icon
            name="arrow-left"
            color="rgb(125, 125, 125)"
            size="22"
            @click="moreRecipes"
          />
        </template>
        <template #right>
          <van-icon color="rgb(125, 125, 125)" size="22" name="more-o" />
        </template>
      </van-nav-bar>

      <van-empty description="菜谱审核中...">
        <van-button @click="moreRecipes" round color="#f7cc52"
          >查看更多菜谱</van-button
        >
      </van-empty>
    </div>

    <div v-show="isLoadOver">
      <div
        class="topBtn"
        :style="{
          backgroundColor: isScroll ? '#fff' : 'rgba(123, 125, 125, 0.2)',
          boxShadow: isScroll
            ? '0 1px 10px rgba(187, 187, 187, 0.758)'
            : 'none',
        }"
      >
        <div class="left">
          <van-icon
            name="arrow-left"
            :color="isScroll ? 'rgb(125, 125, 125)' : '#fff'"
            size="22"
            @click="returnBtn"
          />
          <div class="center" v-if="isScroll">
            <van-image
              round
              width="32px"
              height="32px"
              :src="detailData.user.user_photo"
            />
            <div class="feedBtn">关注</div>
          </div>
        </div>

        <div class="right">
          <van-icon
            :color="isScroll ? 'rgb(125, 125, 125)' : '#fff'"
            size="22"
            name="share-o"
          />
          <van-icon
            :color="isScroll ? 'rgb(125, 125, 125)' : '#fff'"
            size="22"
            name="more-o"
          />
        </div>
      </div>

      <div class="boxContent">
        <div ref="topImgBox">
          <video
            width="100%"
            :height="imgHeight + 'px'"
            v-if="isVideo"
            :src="detailData.vfurl"
            controls
            autoplay
          ></video>
          <van-image
            width="100%"
            :height="imgHeight + 'px'"
            fit="contain"
            :src="detailData.original_photo_path"
            v-if="!isVideo"
            :show-loading="false"
            @load="checkImg"
          />
        </div>
        <div class="content">
          <div class="title">{{ detailData.title }}</div>
          <div class="viewContent">
            <span>精品</span>
            <span> · </span>
            <span>浏览{{ detailData.views_count_text }}</span>
            <span> · </span>
            <span>{{ detailData.favo_counts_text }}人收藏</span>
          </div>

          <div class="archivement_tags" v-if="detailData.recipe_tags">
            <div
              class="tagItem"
              v-for="(x, y) in detailData.recipe_tags"
              :key="y"
              :style="{
                backgroundImage: `linear-gradient(to right, ${x.background_start_color} , ${x.background_end_color})`,
                color: x.text_color,
              }"
            >
              {{ x.text }}
              <van-image
                width="14px"
                height="14px"
                fit="contain"
                :src="x.right_image"
              />
            </div>
          </div>

          <div class="user">
            <div class="userLeft">
              <van-image
                round
                width="36px"
                height="36px"
                :src="detailData.user.user_photo"
                @click="clickUserImg(detailData.user.user_id)"
              />
              <div class="userName userMargin">
                {{ detailData.user.nickname }}
              </div>
              <div class="userLeval userMargin">
                LV.{{ detailData.user.lvl }}
              </div>
            </div>
            <div class="feedBtn">关注</div>
          </div>
          <div class="cookstory">{{ detailData.cookstory }}</div>
          <div
            class="cook_msg"
            v-if="detailData.cook_time == '' ? false : true"
          >
            <div class="cook_time">
              <van-image
                width="22px"
                height="22px"
                :src="detailData.cook_time_image"
              />
              <div class="cook_time_text">
                {{ detailData.cook_time }}
              </div>
            </div>
            <div class="cook_time">
              <van-image
                width="26px"
                height="26px"
                :src="detailData.cook_difficulty_image"
              />
              <div class="cook_time_text">
                {{ detailData.cook_difficulty }}
              </div>
            </div>
          </div>
          <div class="cook_list">
            <div class="list_title">
              <h2>食材清单</h2>
              <div class="addBuy">加入采购清单</div>
            </div>
            <div class="list_item" v-for="(a, b) in detailData.major" :key="b">
              <div class="list_item_title">{{ a.title }}</div>
              <div>{{ a.note }}</div>
            </div>
          </div>
          <div class="nutrition_facts" v-if="isNutrition">
            <h2>营养分析</h2>
            <div class="nutrition_facts_content">
              <div class="facts_items">
                <div
                  class="facts_item"
                  v-for="(a, b) in detailData.nutrition_facts"
                  :key="b"
                >
                  <div
                    class="point"
                    :style="{ backgroundColor: a.pie_chart_color }"
                  ></div>
                  <div class="facts_title">{{ a.nutrient }}</div>
                  <div class="facts_num">{{ a.amount }}</div>
                </div>
              </div>
              <div class="energyBox">
                <div class="energy">{{ detailData.energy }}</div>
                <div class="energy_before">千卡</div>
              </div>
            </div>
            <div class="hint_text">
              {{ detailData.nutrition_facts_hint_text }}
            </div>
          </div>
          <div class="cook_steps">
            <h2>烹饪步骤</h2>
            <div
              class="steps_item"
              v-for="(a, b) in detailData.cookstep"
              :key="b"
            >
              <div class="steps_item_title">
                步骤{{ a.position }}/{{ detailData.cookstep.length }}
              </div>
              <div class="steps_item_img">
                <img class="auto-img" :src="a.image" :alt="a.content" />
              </div>
              <div class="steps_item_content">
                {{ a.content }}
              </div>
            </div>
          </div>
          <div class="create_time">{{ detailData.release_time }}</div>
          <div class="tips" v-if="detailData.tips == '' ? false : true">
            <h2>小贴士</h2>
            <div class="tipsTitle">{{ detailData.tips }}</div>
          </div>
          <div class="hotComments"></div>
        </div>
      </div>

      <van-popup
        v-model="show"
        position="bottom"
        round
        :style="{ height: '66%' }"
        :closeable="true"
      >
        <div class="comments">
          <div class="commentsTop">
            <h3>全部评论 ({{ commentsData.cc }})</h3>
          </div>
          <div class="commentsAll">
            <div class="noComments" v-if="isNoComments">暂无评论</div>
            <div
              class="comentsItem"
              v-for="(item, index) in commentsData.comments"
              :key="index"
            >
              <div class="commentsUser">
                <div class="commentsUserMsg">
                  <van-image round width="26px" height="26px" :src="item.u.p" />
                  <div class="userName userMargin">
                    {{ item.u.n }}
                  </div>
                  <div class="userLeve userMargin">LV.{{ item.u.lvl }}</div>
                </div>
                <div class="likeNum">
                  <van-icon
                    name="like-o"
                    size="18px"
                    color="rgb(152, 152, 152)"
                  />
                  <div class="num">
                    {{ item.like_count == 0 ? "赞" : item.like_count }}
                  </div>
                </div>
              </div>
              <div class="commetnsText" v-for="(a, b) in item.content" :key="b">
                {{ a.c }}

                <div class="answer" v-if="item.child_comments[0]">
                  <div v-for="(x, y) in item.child_comments" :key="y">
                    {{ x.u.n }}:
                    <span v-for="(one, two) in x.content" :key="two">{{
                      one.c
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>

      <div class="BottomBtn">
        <div class="left">
          <van-search shape="round" placeholder="说点什么...">
            <template #left-icon></template>
          </van-search>
        </div>

        <div class="right">
          <div @click="showPopup">
            <van-icon name="chat-o" size="18" />
            <span class="rightText">{{ detailData.comments_count }}</span>
          </div>
          <div @click="myFavorites">
            <van-icon name="star-o" size="18" v-if="!isFavor" />
            <van-icon name="star" size="18" color="#f6c753" v-else />
            <span class="rightText"><span v-if="isFavor">已</span>收藏</span>
          </div>
          <div>
            <van-icon name="bag" size="18" color="#f6c753" />
            <span class="rightText">传学做</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Detail",
  data() {
    return {
      detailData: {
        user: {
          user_photo: null,
          nickname: null,
          lvl: null,
        },
      },
      isNoPage: false,
      isLong: false,
      isLoadOver: false,
      id: null,
      isVideo: false,
      isScroll: false,
      isNutrition: true,
      show: false,
      isNoComments: false,
      commentsData: [],
      fromPage: null,
      fromuserid: null,
      screenWidth: document.body.clientWidth,
      imgHeight: 0,
      isFavorites: false,
      loginUser: null,
      isFavor: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.fromPage = this.$route.params.fromPage;
    this.fromuserid = this.$route.params.userid;
    this.isFavorites = this.$route.params.isFavorites;
    this.Userval = this.$route.params.Userval;
    this.getDetail();
    let loginUser = localStorage.getItem("loginUser");
    this.loginUser = JSON.parse(loginUser);
    if (this.loginUser) {
      let localFavoritesRecipes = localStorage.getItem("localFavoritesRecipes");
      if (localFavoritesRecipes) {
        localFavoritesRecipes = JSON.parse(localFavoritesRecipes);
        localFavoritesRecipes.forEach((ele) => {
          if (ele.loginUser == this.loginUser && ele.id == this.id) {
            this.isFavor = true;
          }
        });
      }
    }
  },
  mounted() {
    let detailBox = this.$refs.detailBox;
    detailBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getDetail() {
      //启动加载提示
      Toast.loading({
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        loadingType: "spinner",
        //不会自动关闭提示
        duration: 0,
      });
      this.axios({
        method: "get",
        url: `recipe/detail/${this.id}`,
      })
        .then((result) => {
          if (result.status == 200) {
            Toast.clear();
            if (result.data.state == "success") {
              this.detailData = result.data.result.recipe;
              if (this.detailData.vfurl !== "") {
                this.isVideo = true;
              }
              this.isLoadOver = true;
              if (this.detailData.nutrition_facts.length == 0) {
                this.isNutrition = false;
              }
              this.imgHeight =
                this.detailData.ph / (this.detailData.pw / this.screenWidth);
              if (this.imgHeight > 460) {
                this.imgHeight = 460;
              }
            } else {
              this.isNoPage = true;
            }
          } else {
          }
        })
        .catch((err) => {});
    },
    returnBtn() {
      if (this.fromPage && !this.fromuserid) {
        let userid = this.detailData.user.user_id;
        let fromPage = this.fromPage;
        this.$router.push({ name: fromPage, params: { userid } });
      } else if (this.fromPage && this.fromuserid) {
        let userid = this.fromuserid;
        let fromPage = this.fromPage;
        this.$router.push({ name: fromPage, params: { userid } });
      } else if (this.Userval) {
        let val = this.Userval;
        this.$router.push({ name: "SearchContent", params: { val } });
      } else if (this.isFavorites) {
        this.$router.push({ name: "Favorites" });
      } else if (!this.isFavorites) {
        this.$router.go(-1);
      }
    },
    handleScroll(e) {
      if (e.target.className == "commentsAll") {
        return;
      }
      let scrollTop = e.target.scrollTop;
      let topImgBoxHeight = this.$refs.topImgBox.clientWidth;
      if (scrollTop >= topImgBoxHeight) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    checkImg() {
      this.$nextTick(() => {
        let refs = this.$refs;
        if (refs.topImgBox.clientHeight > 400) {
          this.isLong = true;
        }
      });
    },
    showPopup() {
      this.show = true;
      this.axios({
        method: "get",
        url: `recipe/flatcomments/${this.id}/0/20`,
      })
        .then((result) => {
          if (result.status == 200) {
            if (result.data.state == "success") {
              this.commentsData = result.data.result;
              if (this.commentsData.comments.length == 0) {
                this.isNoComments = true;
              }
            } else {
            }
          } else {
          }
        })
        .catch((err) => {});
    },
    clickUserImg(userid) {
      if (this.fromPage && !this.fromuserid) {
        this.returnBtn();
      } else if (this.fromuserid) {
        this.$router.push({ name: "User", params: { userid } });
      } else if (this.isFavorites) {
        let isFavorites = this.isFavorites;
        let id = this.id;
        this.$router.push({
          name: "User",
          params: { userid, id, isFavorites },
        });
      } else {
        let id = this.id;
        let val = this.$route.params.val;
        this.$router.push({ name: "User", params: { userid, id, val } });
      }
    },
    myFavorites() {
      let data = this.detailData;
      let localFavoritesRecipes = localStorage.getItem("localFavoritesRecipes");

      if (!this.loginUser) {
        Toast("请先登录");
        this.$router.push({ name: "My" });
        return;
      }
      let myFavoritesRecipesObj = {
        loginUser: this.loginUser,
        id: data.cook_id,
        img: data.photo_path,
        n: data.title,
        rate: 0,
        recommend_label: data.views_count_text,
        recipe_list_tags: data.recipe_list_tags,
        p: data.user.user_photo,
      };
      if (!localFavoritesRecipes) {
        localFavoritesRecipes = [];
      } else {
        localFavoritesRecipes = JSON.parse(localFavoritesRecipes);
      }

      if (this.isFavor) {
        localFavoritesRecipes = localFavoritesRecipes.filter((ele) => {
          return ele.id !== data.cook_id;
        });
        this.isFavor = false;
        Toast("取消收藏成功");
      } else {
        localFavoritesRecipes.unshift(myFavoritesRecipesObj);
        this.isFavor = true;
        Toast("收藏成功");
      }

      localStorage.setItem(
        "localFavoritesRecipes",
        JSON.stringify(localFavoritesRecipes)
      );
    },
    moreRecipes() {
      this.$router.push("Recommended");
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  width: 100vw;
  height: 100vh;
  .topBtn {
    width: 100%;
    padding: 14px 10px 8px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .center {
        display: flex;
        align-items: center;
        margin-left: 16px;
        .feedBtn {
          padding: 4px 16px;
          border-radius: 20px;
          margin-left: 8px;
          font-size: 12px;
          font-weight: bold;
          background-color: #f6c753;
        }
      }
    }
    .right {
      width: 64px;
      display: flex;
      justify-content: space-between;
    }
  }
  .boxContent {
    position: fixed;
    top: 0;
    bottom: 54px;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .topImg {
      height: 400px;
    }
    .content {
      padding: 14px;
      .title {
        font-size: 20px;
        padding-bottom: 6px;
      }
      .viewContent {
        font-size: 14px;
        color: rgb(184, 184, 184);
        padding-bottom: 18px;
      }
      .archivement_tags {
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 12px;
        .tagItem {
          padding: 3px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          margin-right: 6px;
        }
      }
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 18px;
        .userLeft {
          display: flex;
          align-items: center;
          .userName {
            font-size: 14px;
          }
          .userLeval {
            color: #c6a64f;
            font-size: 12px;
            font-weight: bold;
            font-style: italic;
          }
          .userMargin {
            margin-left: 8px;
          }
        }
        .feedBtn {
          padding: 5px 20px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          background-color: #f6c753;
        }
      }
      .cookstory {
        font-size: 16px;
        line-height: 26px;
        padding-bottom: 18px;
      }
      .cook_msg {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-bottom: 10px;
        .cook_time {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .cook_time_text {
            font-size: 16px;
            font-weight: bold;
            margin-left: 8px;
          }
        }
      }
      .cook_list {
        .list_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .addBuy {
            color: #74abb5;
            font-size: 13px;
          }
        }
        .list_item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          padding-bottom: 20px;
          .list_item_title {
            color: #74abb5;
          }
        }
      }
      .nutrition_facts {
        padding-bottom: 18px;
        .facts_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .addBuy {
            color: #74abb5;
            font-size: 13px;
          }
        }
        .nutrition_facts_content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          .facts_item {
            display: flex;
            align-items: center;
            padding: 2px 0;
            .point {
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
            .facts_title {
              width: 80px;
              margin-left: 10px;
              color: rgb(141, 141, 141);
            }
            .facts_num {
              font-size: 13px;
              font-weight: bold;
            }
          }

          .energyBox {
            width: 100px;
            height: 36px;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            border-left: 1px solid rgb(227, 227, 227);
            .energy {
              font-size: 18px;
            }
          }
        }
        .hint_text {
          font-size: 13px;
          font-weight: bold;
        }
      }
      .cook_steps {
        .steps_item {
          padding-bottom: 16px;
          .steps_item_title {
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 12px;
          }
          .steps_item_img {
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 4px;
          }
          .steps_item_content {
            font-size: 16px;
            line-height: 28px;
          }
        }
      }
      .create_time {
        color: rgb(148, 148, 148);
        font-size: 13px;
      }
      .tips {
        .tipsTitle {
          font-size: 16px;
        }
      }
    }
  }
  .comments {
    padding: 0px 0;
    .commentsTop {
      width: calc(100% - 26px);
      margin-left: 14px;
      border-top-right-radius: 10%;
      position: fixed;
      z-index: 100;
      background-color: #fff;
    }
    .commentsAll {
      width: 100%;
      height: 400px;
      box-sizing: border-box;
      padding: 50px 14px 0;
      position: fixed;
      overflow-y: scroll;
      .noComments {
        text-align: center;
        font-size: 16px;
        color: rgb(152, 152, 152);
      }
      .comentsItem {
        padding-bottom: 14px;
        .commentsUser {
          height: 56px;
          padding: 14px 0px 6px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          .commentsUserMsg {
            display: flex;
            align-items: center;
            font-weight: bold;
            .userLeve {
              color: #c6a64f;
              font-size: 12px;
              font-style: italic;
            }
            .userMargin {
              margin-left: 10px;
            }
          }
          .likeNum {
            display: flex;
            align-items: center;
            .num {
              color: rgb(152, 152, 152);
              font-size: 14px;
              margin-left: 4px;
            }
          }
        }
        .commetnsText {
          padding-left: 36px;
          padding-right: 20px;
          font-size: 14px;
          line-height: 22px;
          .answer {
            background-color: #f5f5f5;
            margin-top: 8px;
            padding: 6px;
            font-size: 12px;
            font-weight: bold;
            span {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
  .BottomBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding-bottom: 10px;
    box-shadow: 0 -1px 10px rgba(187, 187, 187, 0.758);
    .left {
      width: 170px;
    }
    .right {
      height: 24px;
      display: flex;
      align-items: center;
      color: rgb(105, 105, 105);
      div {
        height: 24px;
        line-height: 24px;
        display: flex;
        align-items: center;
        margin-right: 14px;
        .rightText {
          font-size: 13px;
          margin-left: 2px;
        }
      }
    }
  }
}

/deep/ .van-nav-bar {
  background-color: transparent;
}

/deep/ .van-button__text {
  color: #000;
  font-size: 15px;
  font-weight: bold;
}

/deep/ .van-popup__close-icon {
  z-index: 100;
}
</style>