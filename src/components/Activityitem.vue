<template>
  <div class="contentItem">
    <van-image width="100%" height="190px" :src="item.image" />
    <div class="activityContent">
      <div class="itemName">{{ item.name }}</div>
      <div class="itemBtn">{{ isOld ? "查看详情 >" : "立即参与 >" }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activityitem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    isOld: {
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.activityContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0 20px;
  .itemName {
    width: 250px;
    line-height: 24px;
    font-size: 14px;
    font-weight: bold;
  }
  .itemBtn {
    font-size: 13px;
    font-weight: bold;
    color: #62959e;
  }
}
</style>