<template>
  <div class="Searchitem">
    <div class="searchImg">
      <img class="auto-img" :src="item.r.p" alt="" />
    </div>
    <div class="searchTitle">
      <div class="searchName">{{ item.r.n }}</div>
      <div class="searchRate" v-if="item.r.rate == 0 ? false : true">
        {{ item.r.rate }}分
      </div>
      <div
        class="searchTag"
        v-if="item.r.recipe_list_tags.length == 0 ? false : true"
      >
        <div
          class="tagItem"
          v-for="(a, b) in item.r.recipe_list_tags"
          :key="b"
          :style="{
            backgroundImage: `linear-gradient(to right, ${a.background_start_color} , ${a.background_end_color})`,
            color: a.text_color,
          }"
        >
          {{ a.text }}
        </div>
      </div>
      <div class="user">
        <van-image
          round
          fit="cover"
          width="20px"
          height="20px"
          :src="item.r.a.p"
        />
        <div class="userName">{{ item.r.a.n }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchitem",
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
.Searchitem {
  display: flex;
  align-items: center;
  padding: 0 14px 14px;
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
    height: 110px;
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
    .user {
      display: flex;
      align-items: center;
      .userName {
        margin-left: 3px;
      }
    }
  }
}
</style>