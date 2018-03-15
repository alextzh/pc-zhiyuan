<template>
  <transition name="slide">
    <div class="m-container">
      <navbar @logout="logOut" :isLogined="isLogined" :name="userName"></navbar>
      <div class="box">
        <iframe id="mainIframe" name="mainIframe" :src="viewUrl" frameborder="0" scrolling="auto" ></iframe>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import Navbar from 'base/navbar/navbar'
  import { mapGetters } from 'vuex'
  import {getUserInfo, clearStorage} from 'common/js/storage'
  import 'weui'
  import weui from 'weui.js'

  export default {
    data() {
      return {
        showClose: false
      }
    },
    computed: {
      userName() {
        return getUserInfo().name ? getUserInfo().name : ''
      },
      isLogined() {
        return getUserInfo().id ? true : false
      },
      ...mapGetters([
        'viewUrl'
      ])
    },
    methods: {
      logOut() {
        weui.confirm('您确定要退出当前账号吗', {
          title: '退出提示',
          buttons: [{
            label: '取消',
            type: 'default',
            onClick: () => {
              console.log('已取消')
            }
          }, {
            label: '退出',
            type: 'primary',
            onClick: () => {
              clearStorage()
              this.$router.push({
                path: '/login'
              })
            }
          }]
        })
      }
    },
    components: {
      Navbar
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
