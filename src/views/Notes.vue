<template>
  <div class="notes" ref="notesBox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-show="isLoadYes">
        <div class="notesTopList">
          <div
            class="topList"
            v-for="(item, index) in topics"
            :key="index"
            :style="{ width: index == 0 ? oneWidth + 'px' : twoWidth + 'px' }"
          >
            <div class="listItem" v-for="(a, b) in item" :key="b">
              #{{ a.name }}
            </div>
          </div>
        </div>
        <div class="notes-content">
          <div class="content" v-for="(item, index) in list" :key="index">
            <div v-for="(a, b) in item" :key="b" @click="clickItem(a)">
              <Nodesitem :a="a" />
            </div>
          </div>
        </div>
      </div>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </van-pull-refresh>
  </div>
</template>

<script>
import Nodesitem from "../components/Nodesitem.vue";
import { Toast } from "vant";
export default {
  name: "Notes",
  components: {
    Nodesitem,
  },
  data() {
    return {
      offset: 0,
      btmid: null,
      topics: null,
      list: [],
      listOne: [],
      listTwo: [],
      scrollTop: 0,
      isLoading: false,
      isSuccess: false,
      isLoadYes: false,
      oneWidth: null,
      twoWidth: null,
    };
  },
  created() {
    this.getHomeNotes();
  },
  activated() {
    this.$nextTick(() => {
      let refs = this.$refs;
      refs.notesBox.scrollTop = this.scrollTop;
    });
  },
  mounted() {
    let notesBox = this.$refs.notesBox;
    notesBox.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    getHomeNotes() {
      this.axios({
        method: "get",
        url: `home/notes/${this.offset}/20?btmid=${this.btmid}`,
      })
        .then((result) => {
          if (result.status == 200) {
            if (!this.topics) {
              this.topics = result.data.result.topics;
              this.topics.forEach((ele, index) => {
                if (index == 0) {
                  ele.forEach((e) => {
                    this.oneWidth += e.name.length;
                  });
                  this.oneWidth = this.oneWidth * 16.4;
                } else {
                  ele.forEach((e) => {
                    this.twoWidth += e.name.length;
                  });
                  this.twoWidth = this.twoWidth * 16.4;
                }
              });
            }
            result.data.result.list.forEach((ele, index) => {
              if (ele.dsp) {
                return;
              }
              if (index % 2 == 0) {
                this.listOne.push(ele);
              } else {
                this.listTwo.push(ele);
              }
            });
            this.list = [this.listOne, this.listTwo];
            this.btmid = result.data.result.btmid;
            this.isSuccess = false;
            this.isLoadYes = true;
          } else {
            
          }
        })
        .catch((err) => {
          
        });
    },
    handleScroll(e) {
      if (e.target._prevClass != "notes") {
        return;
      }
      this.scrollTop = e.target.scrollTop;
      var recomendBoxHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (Math.abs(scrollHeight - this.scrollTop - recomendBoxHeight) <= 20) {
        if (this.isSuccess) {
          return;
        }
        this.isSuccess = true;
        this.offset += 20;
        this.getHomeNotes();
      }
    },
    onRefresh() {
      this.isLoading = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.list = [];
        this.offset += 20;
        this.isLoadYes = false;
        this.getHomeNotes();
      }, 1000);
    },
    clickItem(item) {
      if (item.note) {
        let id = item.note.id;
        this.$router.push({ name: "Notesdetail", params: { id, item } });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.notes {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .notesTopList {
    padding: 4px 2px 8px;
    background-color: #fff;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .topList {
      min-width: 355px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      &:first-child {
        margin-bottom: 8px;
      }
      .listItem {
        display: inline-block;
        padding: 6px 8px;
        background-color: #e2f3f7;
        border-radius: 20px;
        color: #6ba1aa;
      }
      &:last-child {
        .listItem {
          &:last-child {
            background-color: #f4fcff;
            border: 2px solid #74a9b3;
          }
        }
      }
    }
  }
  .notes-content {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
    .content {
      width: calc(50% - 2px);
      box-sizing: border-box;
    }
  }
}
</style>