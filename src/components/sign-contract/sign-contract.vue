<template>
  <transition name="slide">
    <div class="m-container">
      <div class="box">
        <iframe id="mainIframe" name="mainIframe" :src="signUrl" frameborder="0" scrolling="auto" ></iframe>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        showClose: false
      }
    },
    computed: {
      ...mapGetters([
        'signUrl'
      ])
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-container {
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .box{
    position: absolute;
    top: 80px;
    bottom: 0;
    width: 100%;
  }
  #mainIframe{
    width: 100%;
    height: 100%;
  }
</style>
