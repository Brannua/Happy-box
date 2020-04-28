<template>
  <div v-if="musicCates">
    <ul class="music-cate">
      <li class="music-cate-item" v-for="(item, index) in musicCates" :key="index" :style="{backgroundImage:'url('+ item.bg +')'}" @click="turnToMusicList(item.id)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicCates: null
    }
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/data/musicList.json"
    }).then(res => {
      const {data: {albums}} = res
      this.musicCates = albums
    })
  },
  methods: {
    turnToMusicList(index){
      this.$router.push(`/musicList/${index}`)
    }
  }
}
</script>

<style lang="less">
.music-cate {
    margin: 1rem 0rem 1rem;
    font-size: 0;
    &-item {
        display: inline-block;
        width: 50%;
        height: 3.1rem;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>