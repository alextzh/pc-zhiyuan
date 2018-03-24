<template>
  <transition name="slide">
    <div class="box">
      <navbar></navbar>
      <div class="content">
        <div class="img_wrap">
          <img src="./error.png" alt="">
          <p>请使用PC端访问</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Navbar from 'base/navbar/navbar'

  export default {
    data() {
      return {
        showClose: false
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
  .content {
    position: absolute;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .img_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  img {
    display: block;
    width: 260px;
    height: auto;
  }
  p{
    font-size:24px;
    color:#999;
  }
</style>
