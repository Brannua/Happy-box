<template>
  <div class="photo">
    <ul class="photo-imgs clearfix">
      <li
        v-for="(item, index) in photoData"
        class="photo-imgs-item"
        :style="{backgroundImage:`url(${item.src})`}"
        @click="turnToDetail(index)"
        :key="index"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoData: [],  // 存放照片数据
    }
  },
  mounted() {
    // 调用接口获取数据
    this.$axios({
      method: "get",
      url: "/data/photoData.json"
    })
      .then(res => {

        const { photoData } = res['data']

        // 格式化图片地址
        photoData.forEach(photo => {
          photo.src = location.origin + location.pathname + photo.src
        })

        // 保存数据
        this.photoData = photoData
        // 写vuex,仅为了练习vuex的使用
        this.$store.dispatch('setPhotoListAction', photoData)
        
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    // 跳转到大图
    turnToDetail(index){
      this.$router.push(`/photoDetail/${index}`)
    }
  }
}
</script>

<style lang="less">
.photo {
  &-imgs {
    margin: 1rem 0 1rem;
    &-item {
      width: 50%;
      height: 2.4rem;
      float: left;

      background-size: cover;
      background-repeat: no-repeat;
      border-radius: .1rem;
    }
  }
}

.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
</style>