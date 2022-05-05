<template>
  <div class="user" v-show="isLoadOver">
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
              :src="userData.avatar_medium"
              :show-loading="false"
            />
            <div class="authorName">
              {{ userData.nick }}
            </div>
          </div>
          <div class="feedBtn">关注</div>
        </div>
      </template>
      <template #right>
        <van-icon color="rgb(125, 125, 125)" size="22" name="more-o" />
      </template>
    </van-nav-bar>

    <div class="userContent" ref="userContent">
      <div class="userMsg">
        <div class="userMsgTop">
          <van-image
            round
            width="84px"
            height="84px"
            :src="userData.user_large_photo"
            :show-loading="false"
          />
          <div class="userName">
            <div class="name">
              <div class="nick">{{ userData.nick }}</div>
              <div class="usermedal">
                <img class="auto-img" :src="userData.usermedal.icon" alt="" />
                <span class="counttext">{{
                  userData.usermedal.count_text
                }}</span>
              </div>
              <div class="lvl">LV.{{ userData.lvl }}</div>
            </div>
            <div class="bigFeedBtn">关注</div>
          </div>
        </div>
        <div class="archivement_tags" v-if="userData.archivement_tags">
          <div
            class="tagItem"
            v-for="(item, index) in userData.archivement_tags"
            :key="index"
            :style="{
              backgroundImage: `linear-gradient(to right, ${item.background_start_color} , ${item.background_end_color})`,
              color: item.text_color,
            }"
          >
            {{ item.text }}
            <van-image
              width="14px"
              height="14px"
              fit="contain"
              :src="item.right_image"
            />
          </div>
        </div>
        <div class="userPlace">
          <div>{{ userData.gender == 2 ? "厨娘" : "厨男" }}</div>
          <div>{{ userData.age }}</div>
          <div>{{ userData.location }}</div>
        </div>
        <div class="introduction">{{ userData.introduction }}</div>
        <div
          class="feedNav"
          :style="{
            borderBottom: iscookwares ? '1px solid #eee' : 'none',
          }"
        >
          <div>
            <div class="navListItem">{{ userData.following_count_text }}</div>
            <div class="navListItemBtn">关注</div>
          </div>
          <div>
            <div class="navListItem">{{ userData.followers_count_text }}</div>
            <div class="navListItemBtn">粉丝</div>
          </div>
          <div>
            <div class="navListItem">{{ userData.favoed_count_text }}</div>
            <div class="navListItemBtn">被收藏</div>
          </div>
          <div>
            <div class="navListItem">{{ userData.noted_count_text }}</div>
            <div class="navListItemBtn">被学做</div>
          </div>
          <div>
            <div class="navListItem">{{ userData.point_text }}</div>
            <div class="navListItemBtn">经验值</div>
          </div>
        </div>
        <div class="cookwaresBox" @click="cookwaresBtn" v-if="iscookwares">
          <div class="cookwaresTitle">厨房用具</div>
          <div class="cookwares_icon">
            <div class="cookwares">
              {{ cookwaresText }}
            </div>
            <van-icon name="arrow" />
          </div>
        </div>
        <van-tabs
          v-model="active"
          @change="changeActive"
          color="#f7cc52"
          line-width="26px"
        >
          <van-tab :title="'菜谱 ' + userData.recipes_count">
            <div class="Userrecipes">
              <div class="recipes">
                <div
                  class="item"
                  v-for="(item, index) in urecipesArray"
                  :key="index"
                  @click="clickRecipesItem(item)"
                >
                  <van-image
                    width="100%"
                    height="210px"
                    fit="cover"
                    :src="item.img"
                  />
                  <div class="textBox">
                    <div class="recipesLabel">{{ item.recommend_label }}</div>
                    <div class="recipesName">{{ item.n }}</div>
                  </div>
                </div>
              </div>
              <van-loading v-show="isNoMoreRecipes" size="24px" vertical
                >加载中...</van-loading
              >
              <h3 class="end" v-show="!isNoMoreRecipes">
                —— &nbsp;End &nbsp; ——
              </h3>
            </div>
          </van-tab>
          <van-tab :title="'笔记 ' + userData.notes_count">
            <div class="usernotes">
              <div
                class="notes"
                v-for="(item, index) in unotesResult"
                :key="index"
              >
                <div class="year">{{ item.year_text }}</div>
                <div class="imgContent">
                  <div class="date">
                    <div class="day">{{ item.day_text }}</div>
                    <div class="month">{{ item.month_text }}</div>
                  </div>
                  <div class="noteItem">
                    <div
                      class="notesImg"
                      v-for="(a, b) in item.day_list"
                      :key="b"
                      @click="clickNotesItem(a)"
                    >
                      <van-image
                        width="80px"
                        height="80px"
                        fit="cover"
                        :src="a.image_u"
                        radius="4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <van-loading v-show="isNoMoreNotes" size="24px" vertical
                >加载中...</van-loading
              >
              <h3 class="end" v-show="!isNoMoreNotes">
                —— &nbsp; End &nbsp; ——
              </h3>
            </div>
          </van-tab>
          <van-tab :title="'收藏 ' + userData.collect_count">
            <div class="favorites">
              <div
                class="Searchitem"
                v-for="(item, index) in ufavoritesArray"
                :key="index"
                @click="clickFavoritesItem(item)"
              >
                <div class="searchImg">
                  <img class="auto-img" :src="item.img" alt="" />
                </div>
                <div class="searchTitle">
                  <div class="searchName">{{ item.n }}</div>
                  <div class="searchRate">
                    <span v-if="item.rate == 0 ? false : true">{{
                      item.rate + " 分·"
                    }}</span>
                    {{ item.recommend_label }}
                  </div>
                  <div
                    class="searchTag"
                    v-if="item.recipe_list_tags.length == 0 ? false : true"
                  >
                    <div
                      class="tagItem"
                      v-for="(a, b) in item.recipe_list_tags"
                      :key="b"
                      :style="{
                        backgroundImage: `linear-gradient(to right, ${a.background_start_color} , ${a.background_end_color})`,
                        color: a.text_color,
                      }"
                    >
                      {{ a.text }}
                    </div>
                  </div>
                  <div class="favoritesuser">
                    <van-image
                      round
                      fit="cover"
                      width="20px"
                      height="20px"
                      :src="item.a.p"
                    />
                    <div class="userName">{{ item.a.n }}</div>
                  </div>
                </div>
              </div>
              <van-loading v-show="isNoMoreFavorites" size="24px" vertical
                >加载中...</van-loading
              >
              <h3 class="end" v-show="!isNoMoreFavorites">
                —— &nbsp; End &nbsp; ——
              </h3>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "User",
  data() {
    return {
      userid: null,
      userData: {
        avatar_medium: null,
        nick: null,
        usermedal: {
          icon: null,
        },
        cookwares: null,
      },
      active: 0,
      cookwaresText: "",
      isLoadOver: false,
      iscookwares: false,
      isFavorites: false,
      isSuccess: false,
      isMoreRecipse: true,
      isNoMoreNotes: true,
      isNoMoreRecipes: true,
      isNoMoreFavorites: true,

      urecipesOffset: 0,
      urecipesArray: [],
      unotesOffset: 20,
      unotesResult: [],
      ufavoritesOffset: 0,
      ufavoritesArray: [],

      fromPageId: null,
      unotesResultLength: null,

      fromval: null,
    };
  },
  created() {
    this.getUser();
    this.getRecipes();
  },
  mounted() {
    let userContent = this.$refs.userContent;
    userContent.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getUser() {
      if (this.userid) {
        return;
      }
      //启动加载提示
      Toast.loading({
        message: "加载中...",
        //禁止穿透点击
        forbidClick: true,
        loadingType: "spinner",
        //不会自动关闭提示
        duration: 0,
      });
      this.userid = this.$route.params.userid;
      this.fromPageId = this.$route.params.id;
      this.val = this.$route.params.val;
      this.isFavorites = this.$route.params.isFavorites;
      this.axios({
        method: "get",
        url: `user/info/${this.userid}`,
      })
        .then((result) => {
          if (result.status == 200) {
            this.userData = result.data.result.user;
            let cookwares = result.data.result.user.cookwares;
            this.iscookwares = false;
            this.cookwaresText = "";
            if (cookwares.length !== 0) {
              cookwares.forEach((ele, index) => {
                this.cookwaresText +=
                  ele.brand_name + ele.cookware_category_name;
                if (index != cookwares.length - 1) {
                  this.cookwaresText += "、";
                }
              });
              this.iscookwares = true;
            }
            
            Toast.clear();
            this.isLoadOver = true;
          } else {
            
          }
        })
        .catch((err) => {
          
        });
    },
    returnBtn() {
      
      if (this.fromPageId && !this.val && !this.isFavorites) {
        let id = this.fromPageId;
        this.$router.push({ name: "Detail", params: { id } });
      } else if (this.val) {
        let Userval = this.val;
        let id = this.fromPageId;
        this.$router.push({ name: "Detail", params: { id, Userval } });
      } else if (this.isFavorites) {
        let id = this.fromPageId;
        let isFavorites = true;
        this.$router.push({ name: "Detail", params: { id, isFavorites } });
      } else {
        this.$router.push({ name: "Recommended" });
      }
      this.userid = null;
      this.isLoadOver = false;
    },
    cookwaresBtn() {
      let userData = this.userData;
      let fromPage = "User";
      this.$router.push({
        name: "Usercookwares",
        params: { userData, fromPage },
      });
    },
    changeActive(index) {
      if (index == 0 && this.urecipesArray.length == 0) {
        this.getRecipes();
      } else if (index == 1 && this.unotesResult.length == 0) {
        this.getUnotesResult();
      } else if (index == 2 && this.ufavoritesArray.length == 0) {
        this.getUfavoritesResult();
      }
    },
    clickRecipesItem(item) {
      let id = item.id;
      let fromPage = "User";
      this.$router.push({ name: "Detail", params: { id, fromPage } });
    },
    clickNotesItem(item) {
      let id = item.id;
      let fromPage = "User";
      this.$router.push({ name: "Notesdetail", params: { id, fromPage } });
    },
    clickFavoritesItem(item) {
      let id = item.id;
      let userid = this.userid;
      let fromPage = "User";
      this.$router.push({ name: "Detail", params: { id, fromPage, userid } });
    },
    handleScroll(e) {
      var scrollTop = e.target.scrollTop;
      var recomendBoxHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (Math.abs(scrollHeight - scrollTop - recomendBoxHeight) <= 1) {
        if (this.isSuccess) {
          return;
        }
        this.isSuccess = true;
        if (this.active == 0) {
          if (this.userData.recipes_count == this.urecipesArray.length) {
            this.isNoMoreRecipes = false;
            return;
          }
          this.urecipesOffset += 20;
          this.getRecipes();
        } else if (this.active == 1) {
          this.unotesResult.forEach((ele) => {
            this.unotesResultLength += ele.day_list.length;
          });
          if (this.userData.notes_count == this.unotesResultLength) {
            this.isNoMoreNotes = false;
            return;
          }
          this.unotesOffset += 20;
          this.getUnotesResult();
        } else if (this.active == 2) {
          if (this.userData.collect_count == this.ufavoritesArray.length) {
            this.isNoMoreFavorites = false;
            return;
          }
          this.ufavorites += 20;
          this.getUfavoritesResult();
        }
      }
    },
    getRecipes() {
      this.axios({
        methods: "get",
        url: `user/urecipes/${this.userid}/${this.urecipesOffset}/20`,
      })
        .then((result) => {
          if (result.status == 200) {
            result.data.result.list.forEach((ele) => {
              if (ele.r) {
                this.urecipesArray.push(ele.r);
              }
            });
            if (this.urecipesArray.length < 3) {
              this.isNoMoreRecipes = false;
            }
            
            this.isSuccess = false;
          }
        })
        .catch((err) => {
          
        });
    },
    getUnotesResult() {
      this.axios({
        methods: "get",
        url: `user/usernotescalendar/${this.userid}/0/${this.unotesOffset}`,
      })
        .then((result) => {
          if (result.status == 200) {
            this.unotesResult = result.data.result.notes;

            if (this.unotesResult.length < 3) {
              this.isNoMoreNotes = false;
            }
            this.isSuccess = false;
          }
        })
        .catch((err) => {
          
        });
    },
    getUfavoritesResult() {
      this.axios({
        methods: "get",
        url: `user/ufavorites/${this.userid}/${this.ufavoritesOffset}/20`,
      })
        .then((result) => {
          if (result.status == 200) {
            result.data.result.recipes.forEach((ele) => {
              
              this.ufavoritesArray.push(ele);
            });

            if (this.ufavoritesArray.length < 3) {
              this.isNoMoreFavorites = false;
            }

            this.isSuccess = false;
          }
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .topTitle {
    width: 276px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .titleLeft {
      display: flex;
      align-items: center;
      .authorName {
        font-size: 13px;
        line-height: 15px;
        margin-left: 8px;
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
  .userContent {
    position: fixed;
    top: 46px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    .userMsg {
      padding: 10px 22px;
      .userMsgTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 26px;
        .userName {
          .name {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            .nick {
              font-size: 17px;
              margin-right: 6px;
            }
            .usermedal {
              width: 54px;
              position: relative;
              margin-right: 6px;
              .counttext {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 4px;
                font-weight: bold;
                color: #937c3a;
              }
            }
            .lvl {
              font-weight: bold;
              font-style: italic;
              color: #c6a64f;
            }
          }
          .bigFeedBtn {
            padding: 4px 104px;
            border-radius: 20px;
            font-size: 15px;
            background-color: #f6c753;
            text-align: center;
          }
        }
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
      .userPlace {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 8px;
        div {
          margin-right: 13px;
        }
      }
      .introduction {
        font-size: 13px;
        white-space: pre-line;
        margin-bottom: 18px;
      }
      .feedNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding-bottom: 14px;
        .navListItem {
          font-size: 15px;
        }
        .navListItemBtn {
          color: #adadad;
        }
      }
      .cookwaresBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0 28px;
        .cookwaresTitle {
          font-size: 14px;
        }

        .cookwares_icon {
          display: flex;
          align-items: center;
          .cookwares {
            width: 194px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
          }
        }
      }
    }
    .recipes {
      width: 375px;
      position: relative;
      left: -22px;
      .textBox {
        padding: 10px 12px 22px;
        .recipesName {
          padding-top: 4px;
          font-size: 14px;
        }
      }
    }
  }
}

.notes {
  .year {
    font-size: 14px;
  }
  .imgContent {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }

  .date {
    width: 100px;
    display: flex;
    align-items: flex-end;
    .day {
      font-size: 24px;
      margin-right: 4px;
    }
    .month {
      font-size: 12px;
    }
  }
  .noteItem {
    width: 310px;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    margin: 4px 0;

    .notesImg {
      margin-right: 6px;
    }
  }
}
.end {
  text-align: center;
  font-style: italic;
  color: rgb(198, 198, 198);
  font-size: 12px;
}

.Searchitem {
  display: flex;
  align-items: center;
  padding: 0 0 14px;
  .searchImg {
    width: 50%;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .searchTitle {
    width: calc(50% - 10px);
    height: 100px;
    padding-left: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .searchName {
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .searchRate {
      font-size: 13px;
    }
    .searchTag {
      display: flex;
      align-items: center;
      .tagItem {
        border-radius: 2px;
        padding: 0px 6px;
        margin-right: 6px;
      }
    }
    .favoritesuser {
      display: flex;
      align-items: center;
      padding-top: 12px;
      .userName {
        margin-left: 3px;
        color: rgb(169, 169, 169);
      }
    }
  }
}
/deep/ .van-nav-bar__title {
  max-width: 100%;
}

/deep/ .van-tabs__line {
  bottom: 21px;
}
</style>