<template>
  <v-touch
    :style="styleObj"
    @tap="tap"
    @swipeleft="onSwipeLeft"
    @swiperight="onSwipeRight"
  ></v-touch>
</template>

<script>
export default {
  data() {
    return {
      nowIndex: 0
    }
  },
  computed: {
    styleObj() {
      return {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: "#000",
        backgroundImage: `url(${this.$store.state.photoList[this.nowIndex].src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain"
      }
    }
  },
  mounted() {
    // 注意页面一旦刷新,vuex数据被清除,就会拿不到photoList的数据
    const { photoId } = this.$route.params
    this.nowIndex = photoId
  },
  methods: {
    // 图片左划
    onSwipeLeft() {
      this.nowIndex--
      if (this.nowIndex == -1) {
        this.nowIndex = this.$store.state.photoList.length - 1
      }
    },
    // 图片右划
    onSwipeRight() {
      this.nowIndex++
      if (this.nowIndex == this.$store.state.photoList.length) {
        this.nowIndex = 0
      }
    },
    // 点击大图以返回相册
    tap() {
      this.$router.go(-1)
    }
  }
}
</script>