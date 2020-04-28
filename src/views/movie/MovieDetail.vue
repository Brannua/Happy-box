<template>
  <div class="movie-detail" v-if="curImgSrc">
    <div class="movie-detail-info">
      <div class="movie-detail-info-img" :style="{backgroundImage:'url('+ curImgSrc +')'}"></div>
      <div class="movie-detail-info-content">
        <span class="movie-detail-info-content-title">{{ curTitle }}</span>
        <span class="movie-detail-info-content-year">{{ curYear }}</span>
        <span class="movie-detail-info-content-type">{{ curType }}</span>
        <span
          class="movie-detail-info-content-directors-filmlocation"
        >导演: {{ curDirectors }}/{{ curFilmLocations }}</span>
        <span class="movie-detail-info-content-time">{{ curDuration }}</span>
        <span class="movie-detail-info-content-language">{{ curLanguage }}</span>
        <span class="movie-detail-info-content-rating">点赞: {{ curRating }}</span>
      </div>
    </div>
    <div class="movie-detail-context">
      <h4>简介:</h4>
      <p>{{ curContext }}</p>
    </div>
    <div class="movie-detail-button" @click="buyTicket">点击购票</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: null,
      curImgSrc: null,
      curTitle: "",
      curType: "",
      curFilmLocations: "",
      curDirectors: "",
      curYear: "",
      curLanguage: "",
      curRating: "",
      curContext: ""
    };
  },
  mounted() {
    this.index = this.$route.params.index
    this.$axios
      .get(`/data/movie.json`)
      .then(res => {
        let curMovieDetail = res.data[this.index]
        this.curImgSrc = curMovieDetail.poster
        this.curTitle = curMovieDetail.title
        this.curType = curMovieDetail.genres
        this.curFilmLocations = curMovieDetail.film_locations
        this.curDirectors = curMovieDetail.directors
        this.curDuration = curMovieDetail.runtime
        this.curYear = curMovieDetail.year
        this.curLanguage = curMovieDetail.language
        this.curRating = curMovieDetail.rating_count
        this.curContext = curMovieDetail.plot_simple
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    buyTicket() {
      alert("恭喜你，购票成功！")
    }
  }
}
</script>

<style lang="less">
.movie-detail {
  margin: 1.2rem 0.2rem 0;
  &-info {
    height: 2rem;
    display: flex;
    &-img {
      flex-grow: 1;
      border-radius: 0.1rem;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &-content {
      height: 2.1rem;
      border-bottom: 1px solid #ddd;
      flex-grow: 2.6;
      margin-left: 0.5rem;
      font-size: 0.2rem;
      &-title {
        font-weight: bold;
        position: absolute;
        left: 1.8rem;
      }
      &-year {
        position: absolute;
        right: 0.4rem;
        font-weight: bold;
      }
      &-type {
        position: absolute;
        left: 1.8rem;
        top: 1.6rem;
      }
      &-directors-filmlocation {
        position: absolute;
        left: 1.8rem;
        top: 2rem;
      }
      &-time {
        position: absolute;
        left: 1.8rem;
        top: 2.4rem;
      }
      &-language {
        position: absolute;
        left: 1.8rem;
        top: 2.8rem;
      }
      &-rating {
        position: absolute;
        right: 0.4rem;
        top: 2.7rem;
        width: 1.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 0.1rem;
        text-align: center;
        background-color: rgb(255, 220, 0);
        color: #fff;
        font-weight: bold;
      }
    }
  }
  &-context {
    height: 3.7rem;
    margin-top: 0.2rem;
    // 多余打点显示
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-button {
    width: 90%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    position: fixed;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.4rem;
    font-family: serif;
    color: #fff;
    background-color: rgb(33, 150, 243);
    border-radius: 0.2rem;
  }
}
</style>