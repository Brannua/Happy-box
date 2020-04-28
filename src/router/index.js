import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'movie',
  component: () => import("@/views/movie/Movie")
}, {
  path: '/movieDetail/:index',
  name: 'movieDetail',
  component: () => import("@/views/movie/MovieDetail")
}, {
  path: '/music',
  name: 'music',
  component: () => import("@/views/music/Music")
}, {
  path: '/musicList/:musicCateId',
  name: 'musicList',
  component: () => import("@/views/music/MusicList")
}, {
  path: '/photo',
  name: 'photo',
  component: () => import("@/views/photo/Photo")
}, {
  path: '/photoDetail/:photoId',
  name: 'photoDetail',
  component: () => import("@/views/photo/PhotoDetail"),
}]

const router = new VueRouter({
  routes
})

export default router