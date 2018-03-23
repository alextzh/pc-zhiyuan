<template>
  <div class="navbar">
    <div class="container">
      <a class="logo" href="/">
        <img src="./logo.png" alt="至元管理">
      </a>
      <div class="nav">
        <div class="logout" v-if="isLogined">
          <span class="name">欢迎您，{{name}}</span>
          <span class="quit" @click="logout">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'navbar',
    props: {
      isLogined: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    created() {
    },
    methods: {
      logout() {
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped lang="scss">
  .navbar{
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    height:80px;
    line-height: 80px;
    background: #fff;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    z-index: 9999;
    .container{
      display: flex;
      align-items: center;
      width:80%;
      max-width:1280px;
      margin: 0 auto;
      .logo{
        flex: 0 auto;
        display: block;
        height: 50px;
        img{
          width: auto;
          height: 100%;
          border: 0;
          display: block;
        }
      }
      .nav{
        flex: 1;
        height: 80px;
        .logout{
          float: right;
          .name{
            color: #333;
            font-size: 14px;
          }
          .quit{
            display: inline-block;
            padding: 0 20px;
            background: #fff;
            color: #ff5251;
            font-size: 16px;
            transition: all .1s ease-in-out;
          }
          .quit:hover{
            background: #ff5251;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    
  }
</style>
