<template>
  <div class="notesdetail">
    <div v-if="isNoPage">
      <van-nav-bar title="菜谱详情">
        <template #left>
          <van-icon
            name="arrow-left"
            color="rgb(125, 125, 125)"
            size="22"
            @click="returnBtn"
          />
        </template>
        <template #right>
          <van-icon color="rgb(125, 125, 125)" size="22" name="more-o" />
        </template>
      </van-nav-bar>

      <van-empty description="菜谱审核中...">
        <van-button @click="returnBtn" round color="#f7cc52"
          >查看更多菜谱</van-button
        >
      </van-empty>
    </div>

    <div v-show="isLoadOver">
      <van-nav-bar :fixed="true" @click-left="returnBtn">
        <template #left>
          <van-icon name="arrow-left" color="rgb(125, 125, 125)" size="22" />
        </template>
        <template #title>
          <div class="topTitle">
            <div class="titleLeft">
              <van-image
                round
                width="28px"
                height="28px"
                :src="NotesDetailData.author.p"
                :show-error="false"
              />
              <div class="author">
                <div class="authorName">
                  {{ NotesDetailData.author.n }}
                  <span>LV.{{ NotesDetailData.author.lvl }}</span>
                </div>
                <div class="authorCard">
                  连续打卡{{ NotesDetailData.straight_days }}天
                </div>
              </div>
            </div>
            <div class="feedBtn">关注</div>
          </div>
        </template>
        <template #right>
          <van-icon color="rgb(125, 125, 125)" size="22" name="more-o" />
        </template>
      </van-nav-bar>

      <div class="notesdetailContent">
        <van-swipe
          :width="screenWidth"
          :height="swipeImgHeight"
          @change="onChange"
          v-if="!isVideo"
        >
          <van-swipe-item
            v-for="(image, index) in NotesDetailData.images"
            :key="index"
          >
            <van-image
              width="100%"
              height="100%"
              fit="contain"
              lazy-load
              :src="image.u"
            />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ imgLength }}
            </div>
            <div class="selection_text" v-if="NotesDetailData.selection_text">
              {{ NotesDetailData.selection_text }}
            </div>
          </template>
        </van-swipe>

        <div class="videoBox" v-if="isVideo">
          <video
            width="100%"
            :height="swipeImgHeight"
            :src="NotesDetailData.video_url"
            controls
            autoplay
          ></video>
        </div>
        <div class="content">
          <h3>{{ NotesDetailData.title }}</h3>
          <div class="contentText">
            <span
              v-for="(a, b) in NotesDetailData.contents"
              :key="b"
              :style="{ color: a.color }"
              ><span v-if="a.type == 3">#</span>{{ a.c }}&nbsp;&nbsp;</span
            >
          </div>
          <div class="timeLike">
            <div class="time">{{ NotesDetailData.publishtime }}</div>
            <div class="like">{{ NotesDetailData.like_count }}次赞</div>
          </div>
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
            <h3>全部评论 ({{ NotesDetailData.cc }})</h3>
          </div>
          <div class="commentsAll">
            <div class="noComments" v-if="isNoComments">暂无评论</div>
            <div
              class="comentsItem"
              v-for="(item, index) in NotesDetailData.cs"
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

                <div class="answer" v-if="item.child_comments">
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
          <van-search shape="round" :placeholder="NotesDetailData.comment_hint">
            <template #left-icon></template>
          </van-search>
        </div>

        <div class="right">
          <div @click="showPopup">
            <van-icon name="chat-o" size="18" />
            <span class="rightText">{{ NotesDetailData.cc }}</span>
          </div>
          <div>
            <van-icon name="like-o" size="18" />
            <span class="rightText">{{ NotesDetailData.like_count }}</span>
          </div>
          <div @click="myFavorites">
            <van-icon name="star-o" size="18" v-if="!isFavor" />
            <van-icon name="star" size="18" color="#f6c753" v-if="isFavor" />
            <span class="rightText"><span v-if="isFavor">已</span>收藏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Notesdetail",
  data() {
    return {
      id: null,
      NotesDetailData: {
        author: {
          p: null,
          n: null,
          lvl: null,
        },
      },
      current: 0,
      imgLength: 0,
      swipeImgHeight: 0,
      isLoadOver: false,
      show: false,
      isNoComments: false,
      isNoPage: false,
      isVideo: false,
      screenWidth: document.body.clientWidth,
      fromPage: null,

      loginUser: null,
      isFavor: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.fromPage = this.$route.params.fromPage;
    this.getNotesDetail();

    let loginUser = localStorage.getItem("loginUser");
    this.loginUser = JSON.parse(loginUser);
    if (this.loginUser) {
      let localFavoritesNotes = localStorage.getItem("localFavoritesNotes");
      if (localFavoritesNotes) {
        localFavoritesNotes = JSON.parse(localFavoritesNotes);
        localFavoritesNotes.forEach((ele) => {
          if (ele.loginUser == this.loginUser && ele.id == this.id) {
            this.isFavor = true;
          }
        });
      }
    }
  },
  mounted() {
    // let NotesdetailBox = this.$refs.NotesdetailBox;
    // NotesdetailBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getNotesDetail() {
      //启动加载提示
      Toast.loading({
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        loadingType: "spinner",
        //不会自动关闭提示
        duration: 0,
      });
      let timer = setTimeout(() => {
        Toast("加载失败");
        Toast.clear();
        this.$router.go(-1);
      }, 5000);
      this.axios({
        method: "get",
        url: `note/detail/${this.id}`,
      })
        .then((result) => {
          if (result.status == 200) {
            if (result.data.state == "success") {
              clearTimeout(timer);
              this.NotesDetailData = result.data.result.note;
              this.isLoadOver = true;
              
              if (this.NotesDetailData.video_url) {
                this.isVideo = true;
              }
              if (this.NotesDetailData.cs.length == 0) {
                this.isNoComments = true;
              }
              if (this.NotesDetailData.video_cover_width) {
                this.swipeImgHeight =
                  this.NotesDetailData.video_cover_height /
                  (this.NotesDetailData.video_cover_width / this.screenWidth);
                if (this.swipeImgHeight > 400) {
                  this.swipeImgHeight = 400;
                }
              } else {
                this.imgLength = this.NotesDetailData.images.length;
                this.swipeImgHeight =
                  this.NotesDetailData.images[0].h /
                  (this.NotesDetailData.images[0].w / this.screenWidth);
                if (this.swipeImgHeight > 460) {
                  this.swipeImgHeight = 460;
                }
              }
              Toast.clear();
            } else {
              this.isNoPage = true;
            }
          } else {
            
          }
        })
        .catch((err) => {
          
          Toast.clear();
          this.isNoPage = true;
          this.isLoadOver = false;
        });
    },
    onChange(index) {
      this.current = index;
      if (this.NotesDetailData.images) {
        this.swipeImgHeight =
          this.NotesDetailData.images[index].h /
          (this.NotesDetailData.images[index].w / this.screenWidth);
        
        if (this.swipeImgHeight > 460) {
          this.swipeImgHeight = 460;
        }
      }
    },
    returnBtn() {
      if (this.fromPage) {
        let userid = this.NotesDetailData.author.id;
        let fromPage = this.fromPage;
        this.$router.push({ name: fromPage, params: { userid } });
      } else {
        this.$router.go(-1);
      }
      this.swipeImgHeight = 0;
    },
    showPopup() {
      this.show = true;
    },

    myFavorites() {
      let data = this.NotesDetailData;
      let localFavoritesNotes = localStorage.getItem("localFavoritesNotes");

      if (!this.loginUser) {
        Toast("请先登录");
        this.$router.push({ name: "My" });
        return;
      }

      if (!localFavoritesNotes) {
        localFavoritesNotes = [];
      } else {
        localFavoritesNotes = JSON.parse(localFavoritesNotes);
      }

      if (this.isFavor) {
        localFavoritesNotes = localFavoritesNotes.filter((ele) => {
          return ele.id !== this.id;
        });
        
        this.isFavor = false;
        Toast("取消收藏成功");
      } else {
        let myFavoritesNotesObj = this.$route.params.item;
        myFavoritesNotesObj.id = this.id;
        myFavoritesNotesObj.loginUser = this.loginUser;
        
        localFavoritesNotes.push(myFavoritesNotesObj);
        this.isFavor = true;
        Toast("收藏成功");
      }

      localStorage.setItem(
        "localFavoritesNotes",
        JSON.stringify(localFavoritesNotes)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.notesdetail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.topTitle {
  width: 276px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .titleLeft {
    display: flex;
    align-items: center;
    .author {
      text-align: left;
      margin-left: 6px;
      .authorName {
        font-size: 13px;
        font-weight: bold;
        line-height: 15px;
        span {
          color: #c6a64f;
          font-size: 12px;
          font-weight: bold;
          font-style: italic;
        }
      }
      .authorCard {
        font-size: 12px;
        line-height: 14px;
        color: rgb(149, 149, 149);
      }
    }
  }
  .feedBtn {
    padding: 2px 20px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    background-color: #f6c753;
  }
}

.notesdetailContent {
  position: fixed;
  top: 46px;
  bottom: 64px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  // .videoBox {
  //   background-color: #000;
  // }
  .custom-indicator {
    position: absolute;
    right: 16px;
    bottom: 16px;
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 10px;
    color: #fff;
    background: rgba(61, 61, 61, 0.397);
  }
  .selection_text {
    position: absolute;
    left: 16px;
    bottom: 16px;
    padding: 0 6px;
    border-radius: 3px;
    background-color: #f6c753;
  }
  .content {
    padding: 10px 12px 30px;
    .contentText {
      font-size: 14px;
      padding-bottom: 6px;
      span {
        line-height: 26px;
      }
    }
    .timeLike {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgb(179, 179, 179);
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
    width: 200px;
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
/deep/ .van-nav-bar__title {
  max-width: 100%;
}

/deep/ .van-popup__close-icon {
  z-index: 100;
}
</style>