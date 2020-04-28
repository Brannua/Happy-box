<template>
  <div id="app">
    <common-header></common-header>
    <router-view></router-view>
    <common-footer v-if="showFooter"></common-footer>
  </div>
</template>

<script>

import commonHeader from "@/components/Header.vue"
import commonFooter from "@/components/Footer.vue"

export default {
  components: {
    commonHeader,
    commonFooter
  },
  watch: {
    /* eslint-disable */
    $route(to, from) {

      this.showFooter = true

      if (
        to.path.startsWith("/movieDetail") ||
        to.path.startsWith("/musicList") ||
        to.path.startsWith("/photoDetail")
      ) {
        this.showFooter = false
      }

    }
  },
  data() {
    return {
      showFooter: true
    }
  }
}
</script>
