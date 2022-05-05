<template>
  <div class="videos" ref="videosBox">
    <van-swipe
      style="height: 100%"
      :loop="false"
      :show-indicators="false"
      vertical
      @change="onChange"
      ref="videosItemBox"
      :duration="duration"
    >
      <van-swipe-item
        v-for="(item, index) in list"
        :key="index"
        @click="clickItem(item)"
      >
        <Videositem :item="item" ref="vItem" />
      </van-swipe-item>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </van-swipe>
  </div>
</template>

<script>
import Videositem from "../components/Videositem.vue";
import { Toast } from "vant";
export default {
  name: "Videos",
  components: {
    Videositem,
  },
  data() {
    return {
      offset: 0,
      list: [],
      current: 0,
      isSuccess: false,
      oldCurrent: 0,
      one: 0,
      duration: 500,
    };
  },
  created() {
    this.getHomeVideos();
  },
  activated() {
    this.rePlay();
  },
  updated() {
    this.$nextTick(() => {
      let ref = this.$refs;
      let firstvideo = ref.vItem[this.current].$refs.videoMsg;
      firstvideo.setAttribute("autoplay", "true");
    });
  },
  methods: {
    getHomeVideos() {
      this.axios({
        method: "get",
        url: `home/videos/${this.offset}/20`,
      })
        .then((result) => {
          if (result.status == 200) {
            if (!result.data.result.list.length) {
              this.offset += 20;
              this.getHomeVideos();
            }
            result.data.result.list.forEach((ele) => {
              if (!ele.dsp) {
                if (ele.r.vu.indexOf("undefined") == -1) {
                  this.list.push(ele);
                }
              }
            });
            this.isSuccess = false;
            let ref = this.$refs;
            ref.videosItemBox.swipeTo(this.oldCurrent);
            Toast.clear();
            this.one = 1;
          } else {
            
          }
        })
        .catch((err) => {
          
        });
    },
    onChange(index) {
      this.current = index;
      let ref = this.$refs;
      for (let i = 0; i < ref.vItem.length; i++) {
        ref.vItem[i].$refs.videoMsg.pause();
      }
      ref.vItem[this.current].$refs.videoMsg.play();
      if (this.list.length - this.current == 2) {
        this.oldCurrent = index;
        this.offset += 20;
        // 启动加载提示
        Toast.loading({
          message: "加载中...",
          //禁止穿透点击
          forbidClick: true,
          loadingType: "spinner",
          //不会自动关闭提示
          duration: 0,
        });
        this.getHomeVideos();
      }
    },
    rePlay() {
      if (this.one == 0) {
        return;
      } else {
        this.$nextTick(() => {
          let ref = this.$refs;
          ref.videosItemBox.swipeTo(this.current);
          ref.vItem[this.current].$refs.videoMsg.play();
          this.duration = 0;
          setTimeout(() => {
            this.duration = 500;
          }, 100);
        });
      }
    },
    clickItem(item) {
      
      let id = item.r
        ? item.r.id
        : item.note
        ? item.note.id
        : item.mg
        ? item.mg.id
        : "";
      
      this.$router.push({ name: "Detail", params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.videos {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
}
</style>