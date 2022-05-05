<template>
  <div class="usercookwares">
    <van-nav-bar :title="userNick + '的厨房用具'" :fixed="true">
      <template #left>
        <van-icon
          name="arrow-left"
          color="rgb(125, 125, 125)"
          size="22"
          @click="returnBtn"
        />
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="item" v-for="(a, b) in cookwares" :key="b">
        <van-image width="60px" fit="contain" :src="a.image" />
        <div class="name">
          <div>{{ a.brand_name + a.cookware_category_name }}</div>
          <div>{{ a.model_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Usercookwares",
  data() {
    return {
      userData: null,
      cookwares: null,
      userNick: null,
      fromPage: null,
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.userData = this.$route.params.userData;
      this.fromPage = this.$route.params.fromPage;
      this.cookwares = this.userData.cookwares;
      this.userNick = this.userData.nick;
      
    },
    returnBtn() {
      let fromPage = this.fromPage;
      let userid = this.userData.userid;
      this.$router.push({ name: fromPage, params: { userid } });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  position: fixed;
  top: 51px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  .item {
    padding: 14px 20px;
    display: flex;
    align-items: center;
    .name {
      margin-left: 6px;
      font-size: 13px;
      div {
        margin: 4px 0;
      }
    }
  }
}
</style>