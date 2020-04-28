import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewStatusArr: [{
      path: '/',
      title: "电影",
      color: "rgb(33, 150, 243)",
    }, {
      path: '/music',
      title: "音乐",
      color: "rgb(244, 160, 20)",
    }, {
      path: '/photo',
      title: "相册",
      color: "rgb(221, 81, 69)",
    }],
    photoList: []
  },
  mutations: {
    setPhotoList(state, status) {
      state.photoList = status
    }
  },
  actions: {
    setPhotoListAction({ commit }, status) {
      commit('setPhotoList', status)
    }
  }
})
