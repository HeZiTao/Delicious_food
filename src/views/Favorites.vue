<template>
  <div>
    <van-tabs
      v-model="active"
      color="#f7cc52"
      line-width="26px"
      duration="0.2"
      fixed
      @change="changeFavorite"
    >
      <van-tab title="菜谱">
        <div class="favRecipes">
          <div
            v-for="(item, index) in localFavoritesRecipes"
            :key="index"
            @click="clickRecipes(item)"
          >
            <van-swipe-cell>
              <div class="Searchitem">
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
                      :src="item.p"
                    />
                    <div class="userName">{{ item.n }}</div>
                  </div>
                </div>
              </div>
              <template #right>
                <van-button
                  square
                  text="取消收藏"
                  color="#f7cc52"
                  class="delete-button"
                  @click="cancelFavoritesRecipes(item.id)"
                />
              </template>
            </van-swipe-cell>
          </div>
          <van-empty
            description="您的菜谱收藏列表有点空"
            v-show="recipesEmpty"
          />
        </div>
      </van-tab>
      <van-tab title="笔记">
        <div class="favNotes">
          <div
            class="content"
            v-for="(item, index) in localFavoritesNotes"
            :key="index"
          >
            <div v-for="(a, b) in item" :key="b" @click="clickNotes(a)">
              <Nodesitem :a="a" />
            </div>
          </div>
        </div>
        <van-empty description="您的笔记收藏列表有点空" v-show="notesEmpty" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Nodesitem from "../components/Nodesitem.vue";
import { Empty } from "vant";
import { Toast } from "vant";
export default {
  name: "Favorites",
  components: {
    Nodesitem,
  },
  data() {
    return {
      active: 0,
      localFavoritesRecipes: [],
      localFavoritesNotes: [],
      loginUser: null,

      localNotesOne: [],
      localNotesTwo: [],

      recipesEmpty: true,
      notesEmpty: true,
    };
  },
  activated() {
    this.getLoginUser();
  },
  methods: {
    getLoginUser() {
      let loginUser = localStorage.getItem("loginUser");
      this.loginUser = JSON.parse(loginUser);
      if (!this.loginUser) {
        Toast("请先登录");
        this.$router.push({ name: "My" });
        return;
      }
      this.getLocalFavoritesRecipes();
      this.getLocalFavoritesNotes();
    },
    getLocalFavoritesRecipes() {
      this.localFavoritesRecipes = [];
      let localFavoritesRecipes = localStorage.getItem("localFavoritesRecipes");
      let localFavoritesRecipesData = JSON.parse(localFavoritesRecipes);
      if (localFavoritesRecipesData.length > 0) {
        localFavoritesRecipesData.forEach((ele) => {
          if (ele.loginUser == this.loginUser) {
            this.localFavoritesRecipes.push(ele);
          }
        });
        this.recipesEmpty = false;
        if (this.localFavoritesRecipes.length == 0) {
          this.recipesEmpty = true;
        }
      }
    },
    getLocalFavoritesNotes() {
      this.localFavoritesNotes = [];
      this.localNotesOne = [];
      this.localNotesTwo = [];
      let localFavoritesNotes = localStorage.getItem("localFavoritesNotes");
      let localFavoritesNotesData = JSON.parse(localFavoritesNotes);
      if (localFavoritesNotesData.length > 0) {
        localFavoritesNotesData.forEach((ele, index) => {
          if (ele.loginUser == this.loginUser) {
            if (index % 2 == 0) {
              this.localNotesOne.push(ele);
            } else {
              this.localNotesTwo.push(ele);
            }
          }
        });
        this.localFavoritesNotes = [this.localNotesOne, this.localNotesTwo];
        this.notesEmpty = false;
        if (this.localNotesOne.length == 0 && this.localNotesTwo.length == 0) {
          this.notesEmpty = true;
        }
      }
    },
    changeFavorite(index) {
      if (index == 0) {
        this.getLocalFavoritesRecipes();
      } else {
        this.getLocalFavoritesNotes();
      }
    },
    cancelFavoritesRecipes(id) {
      let localFavoritesRecipes = localStorage.getItem("localFavoritesRecipes");
      localFavoritesRecipes = JSON.parse(localFavoritesRecipes);
      localFavoritesRecipes = localFavoritesRecipes.filter((ele) => {
        return ele.id !== id;
      });
      localStorage.setItem(
        "localFavoritesRecipes",
        JSON.stringify(localFavoritesRecipes)
      );
      Toast("取消收藏成功");
      this.getLocalFavoritesRecipes();
    },
    clickRecipes(item) {
      let id = item.id;
      this.$router.push({ name: "Detail", params: { id, isFavorites: true } });
    },
    clickNotes(item) {
      let id = item.id;
      this.$router.push({ name: "Notesdetail", params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.favRecipes {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 50px;
  padding: 0 16px;
  overflow-y: scroll;
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
          border-radius: 4px;
          padding: 2px;
          margin-right: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .favoritesuser {
        display: flex;
        align-items: center;
        padding-top: 12px;
        .userName {
          margin-left: 3px;
          color: rgb(169, 169, 169);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.favNotes {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-between;
  padding: 0px 4px;
  .content {
    width: calc(50% - 2px);
    box-sizing: border-box;
  }
}
.empty {
  text-align: center;
  font-size: 14px;
  color: #999;
}

.delete-button {
  height: 100%;
}
</style>