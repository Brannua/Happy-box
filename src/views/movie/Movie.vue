<template>
  <div>

    <!-- 电影列表 -->
    <ul class="movieList">
      <li v-for="(movie, index) in movieList" class="movieItem" @click="turnToDetail(index)" :key="index">
        <div class="image" :style="{backgroundImage:`url(${movie.poster})`}"></div>
        <div class="context">
          <span class="title">{{ movie.title }}</span>
          <span class="actors">{{ movie.actors }}</span>
          <span class="time">{{ movie.runtime }}</span>
          <span class="buy">买它 ~</span>
        </div>
      </li>
    </ul>

    <!-- 上拉加载gif图 -->
    <div class="loading" v-show="isLoading">
      <img src="@/assets/img/loading.gif" alt="loading" />
    </div>

  </div>
</template>

<script>

import debounce from "@/assets/js/debounce"

export default {
  data() {
    return {
      isLoading: true, // 首次加载电影列表数据默认显示gif图
      movieList: [], // 存放电影列表数据
      eachGetLength: 10 // 每次请求电影数据接口获取的数据条数
    }
  },
  mounted() {
    // 请求电影数据接口获取数据
    this.getMovieData()
    // 监听用户上拉页面, 触发上拉加载, 函数防抖( 防止一次性发送多次ajax请求 )
    window.onscroll = debounce(this.liftPageToGetMoreData, 500)
  },
  beforeDestroy() {
    // 及时解绑事件,防止其他页面组件的滚动造成该页面组件发送ajax请求
    window.onscroll = null
  },
  methods: {
    // 请求电影数据接口获取数据
    getMovieData() {
      this.$axios({
        method: "get",
        url: `/data/movie.json`
      })
        .then(res => {
          this.movieList = this.movieList.concat(res.data)
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 上拉加载
    liftPageToGetMoreData() {
      let oBody = document.body,
        oHtml = document.documentElement,
        scrollTop = oBody.scrollTop || oHtml.scrollTop,
        { scrollHeight, clientHeight } = oHtml

      if (scrollHeight - scrollTop - clientHeight < 300) {
        // 显示gif-loading图
        this.isLoading = true
        // 模拟网络环境不好
        setTimeout(() => {
          this.getMovieData()
        }, 1000)
      }
    },
    // 点击某一电影,跳转至该电影详情
    turnToDetail(index) {
      let testDetailIndex = index % this.eachGetLength
      this.$router.push(`/movieDetail/${testDetailIndex}`)
    }
  }
}
</script>

<style lang="less">
ul.movieList {
  margin: 1rem 0rem 1rem;
  li.movieItem {
    display: flex;
    height: 2.2rem;
    padding: 0.2rem 0.2rem 0.1rem;
    div.image {
      flex-grow: 1;
      height: 90%;
      border-radius: 0.1rem;
      background-color: #ccc;
      background-size: 100% 100%;
      margin-right: 0.2rem;
    }
    div.context {
      height: 100%;
      flex-grow: 2.7;
      position: relative;
      border-bottom: 1px solid #ccc;
      span {
        position: absolute;
        display: inline-block;
      }
      span.title {
        width: 3rem;
        left: 0.1rem;
        font-weight: bold;
      }
      span.actors {
        top: 0.5rem;
        left: 0.1rem;
        font-size: 0.2rem;
        /* 显示两行,多余打点显示 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span.time {
        bottom: 0.2rem;
        left: 0.1rem;
      }
      span.buy {
        box-sizing: border-box;
        display: inline-block;
        position: absolute;
        bottom: 0.1rem;
        right: 0.1rem;
        border: 1px solid #000;
        width: 1.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        text-align: center;
      }
    }
  }
}
div.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>