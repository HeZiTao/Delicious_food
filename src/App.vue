<template>
  <div id="app">
    <keep-alive exclude="Detail,Notesdetail,Userrecipes,Usernotes,User">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
body {
  margin: 0 auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.auto-img {
  width: 100%;
  display: block;
}
</style>
