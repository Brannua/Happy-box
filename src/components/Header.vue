<template>
  <div class="header" :style="{background:curColor}">
    <span class="header-home" @click="$router.go(-1)" v-if="ShowReturn">&lt;返回</span>
    <h2 class="header-title">{{ curTitle }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curTitle: "",
      curColor: "",
      ShowReturn: false,  // 默认不显示返回按钮
    }
  },
  watch: {
    $route(to, from) {
      // 设置当前状态      
      for (let item of this.$store.state.viewStatusArr) {
        if (to.path === item.path) {
          this.curTitle = item.title
          this.curColor = item.color
        }
      }

      // 详情页刷新，navbar状态也不失效
      if (from.path == "/") {
        const viewStatusArr = this.$store.state.viewStatusArr
        if (to.path.startsWith("/movie")) {
          const {title, color} = viewStatusArr[0]
          this.curTitle = title
          this.curColor = color
        }
        if (to.path.startsWith("/music")) {
          const {title, color} = viewStatusArr[1]
          this.curTitle = title
          this.curColor = color
        }
        if (to.path.startsWith('/photo')) {
          // 注意由于照片数据放在了vuex中，刷新页面后vuex被清空，会导致图片不显示，报错
          const {title, color} = viewStatusArr[2]
          this.curTitle = title
          this.curColor = color
        }
      }

      // 电影详情页和音乐详情页显示顶部导航返回按钮，其余页面组件不显示该按钮
      const curPath = this.$route.path
      if (
        curPath.startsWith('/movieDetail') ||
        curPath.startsWith('/musicList')
      ) {
        this.ShowReturn = true
      } else {
        this.ShowReturn = false
      }
    }
  }
}
</script>

<style lang="less">
.header {
  height: 1rem;
  line-height: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  z-index: 99; /*防止由于电影介绍字体脱离文档流浮于header之上*/
  &-home {
    font-size: .3rem;
    color: #fff;
    margin-left: 0.2rem;
    cursor: pointer;
  }
  &-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: .4rem;
  }
}
</style>