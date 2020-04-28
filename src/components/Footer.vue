<template>
  <ul class="footer">
    <router-link
      tag="li"
      v-for="(item, index) in viewStatusArr"
      :to="viewStatusArr[index].path"
      :style="{color: curPath === item.path ? item.color : '#999'}"
      :key="index"
    >{{ item.title }}</router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      curPath: "",
      viewStatusArr: []
    }
  },
  watch: {
    $route(to) {
      // 点击footer跳转路由就刷新本地缓存      
      this.curPath = to.path
      this.setLocalActive(to.path)

      // 读取vuex
      const storeViewStatusArr = this.$store.state.viewStatusArr
      this.viewStatusArr = storeViewStatusArr
    }
  },
  mounted() {
    // 读取vuex
    const storeViewStatusArr = this.$store.state.viewStatusArr
    this.viewStatusArr = storeViewStatusArr
    
    // 由于footer的销毁和重建会导致watch失效,故根据当前路由刷新本地缓存
    this.setLocalActive(this.$route.path)
    this.curPath = storeViewStatusArr[localStorage.active].path
  },
  methods: {
    // 根据当前路由刷新本地缓存
    setLocalActive(path) {
      switch (path) {
        case "/":
          localStorage.setItem("active", 0)
          break
        case "/music":
          localStorage.setItem("active", 1)
          break
        case "/photo":
          localStorage.setItem("active", 2)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less">
.footer {
  height: 1rem;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  font-size: .3rem;
  li {
    flex-grow: 1;
    text-align: center;
    line-height: 1rem;
    cursor: pointer;
  }
  li.router-link-exact-active {
    text-shadow: 0 0 0.2rem;
  }
}
</style>