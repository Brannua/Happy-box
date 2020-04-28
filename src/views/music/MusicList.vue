<template>
  <div class="musiclist">
    <Aplayer
      v-if="loadSuccess"
      :list="musicList"
      :music="musicList[0]"
      :showLrc="showLrc"
    />
  </div>
</template>

<script>

import Aplayer from "vue-aplayer"

export default {
  components: {
    Aplayer
  },
  data() {
    return {
      curMusicCateId: this.$route.params.musicCateId,
      loadSuccess: false,
      musicList: [],
      showLrc: true
    }
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/data/musicData.json"
    })
      .then(res => {

        const { musicData } = res.data

        musicData.forEach(music => {
          let {title, artist, src, pic, lrc} = music
          let {origin, pathname} = location
          lrc = origin + pathname + lrc
          this.musicList.push({ title, artist, src, pic, lrc })
        })

        this.loadSuccess = true

      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style lang="less">
.musiclist {
  margin: 1.2rem 0.1rem 0
}
</style>
