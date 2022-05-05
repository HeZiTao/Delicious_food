<template>
  <div class="Notesitem">
    <div class="NotesitemImg">
      <van-image
        width="100%"
        height="100%"
        :src="a.note ? a.note.image_u : a.activity.image"
      />
      <div class="play" v-if="a.note ? a.note.video_url : ''">
        <van-icon name="play-circle-o" color="#d6d6d6" size="20" />
      </div>
    </div>
    <div class="punchCard" v-if="a.note ? a.note.straight_text : ''">
      <van-icon
        name="checked"
        color="#8eb6bb"
        size="12"
        v-if="a.note ? a.note.straight_text : ''"
        :show-error="false"
      />
      {{ a.note ? a.note.straight_text : "" }}
    </div>
    <div class="contentText">
      {{ a.note ? a.note.title : a.activity.name }}
    </div>
    <div class="contentBottom">
      <div class="author">
        <van-image
          round
          width="18px"
          height="18px"
          :src="a.note ? a.note.author.p : a.activity.author.p"
        />
        <div class="authorName">
          {{ a.note ? a.note.author.n : a.activity.author.n }}
        </div>
      </div>
      <div class="likeNumber">
        <van-icon name="like-o" size="16" v-if="a.note" color="#9a9a9a" />
        <van-image
          width="14px"
          height="14px"
          :src="a.activity ? a.activity.action_icon : ''"
          v-if="a.activity"
        />
        <div class="number">
          {{ a.note ? a.note.like_count : a.activity.action_title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nodesitem",
  props: {
    a: {
      type: Object,
      default() {
        return;
      },
    },
  },
  created() {
    
  },
};
</script>

<style lang="less" scoped>
.NotesitemImg {
  position: relative;
  .play {
    position: absolute;
    right: 8px;
    top: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
}

.punchCard {
  padding: 4px 10px;
  color: #9a9a9a;
}
.contentText {
  margin: 4px 8px 8px;
  font-size: 13px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.contentBottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 4px 6px 10px;
  .author {
    display: flex;
    align-items: center;
    .authorName {
      max-width: 100px;
      margin-left: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .likeNumber {
    display: flex;
    align-items: center;
    /deep/ .van-image__img {
      border-radius: 0;
    }
    .number {
      margin-left: 2px;
      color: #9a9a9a;
    }
  }
}

/deep/ .van-image__img {
  border-radius: 6px;
}
</style>