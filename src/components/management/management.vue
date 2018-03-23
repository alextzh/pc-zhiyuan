<template>
  <transition name="slide">
    <div class="m-container">
      <navbar @logout="logOut" :isLogined="isLogined" :name="userName"></navbar>
      <div class="list">
        <ul>
          <li class="item-box" v-for="(item, index) in contractList" :key="index">
            <div class="item">
              <div class="item_head">
                <i class="iconfont icon-agreement"></i>
                <span class="title">{{item.contract_type}}</span>
                <span class="item_state" style='color: #652D92;' v-if="item.status === 'DQ'">{{item.contract_status}}</span>
                <span class="item_state" style='color: #09B3CD;' v-if="item.status === 'QYWC'">{{item.contract_status}}</span>
                <span class="item_state" style='color: #92278F;' v-if="item.status === 'GD'">{{item.contract_status}}</span>
                <span class="item_state" style='color: #41123C;' v-if="item.status === 'WQ'">{{item.contract_status}}</span>
                <span class="item_state" style='color: #2E3094;' v-if="item.status === 'KHYQ'">{{item.contract_status}}</span>
              </div>
              <div class="item_body">
                <div class="item__left">
                  <span>合同名称：</span>
                  <span class="new_data">{{item.doc_title}}</span>
                </div>
              </div>
              <div class="item_action" v-if="item.sign_url && item.status === 'DQ'">
                <div style="flex: 1;">
                  <a class="btn" href="javascript:;" @click="toSign(item.sign_url)">签署合同</a>
                </div>
              </div>
              <div class="item_action" v-else>
                <div style="flex: 1;margin-right:10px;">
                  <a class="btn" :href="item.download_url">下载合同</a>
                </div>
                <div style="flex: 1;">
                  <a class="btn" href="javascript:;" @click="toView(item.viewpdf_url)">预览合同</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="hasData">
          <div class="no_data">
            <i class="iconfont icon-nodata"></i>
            <p>暂无合同记录</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import Navbar from 'base/navbar/navbar'
  import * as API from 'common/js/http'
  import {getUserInfo, clearStorage} from 'common/js/storage'
  import {getMd5, getBJDate} from 'common/js/tool'
  import 'weui'
  import weui from 'weui.js'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        loading: null,
        contractList: [],
        customer_id: '',
        hasData: false
      }
    },
    computed: {
      userName() {
        return getUserInfo().name ? getUserInfo().name : ''
      },
      isLogined() {
        return getUserInfo().id ? getUserInfo().id : ''
      }
    },
    created() {
      this.loading = weui.loading('加载中')
      this.customer_id = getUserInfo().id
    },
    mounted() {
      setTimeout(() => {
        this.getContractList()
      }, 20)
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
      },
      getContractList() {
        $.ajax({
          type: 'POST',
          url: API.api + '/api/v1/contract/myContract',
          data: {
            customer_id: this.customer_id
          },
          dataType: 'json',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'secret_key': getMd5(),
            'time_stamp': getBJDate().getTime()
          },
          success: (res) => {
            if (!res.ret) {
              console.log(res.msg)
              weui.toast(res.msg, {
                duration: 1500
              })
              this.hasData = true
              setTimeout(() => {
                this.loading.hide()
              }, 20)
              return false
            }
            setTimeout(() => {
              this.loading.hide()
            }, 20)
            const list = res.rows
            this.contractList = list
            this.hasData = false
          },
          error: (err) => {
            console.log(err)
            weui.toast('网络超时', {
              duration: 1500
            })
          }
        })
      },
      toSign(url) {
        this.setSignUrl(url)
        this.$router.push({
          path: '/sign-contract'
        })
      },
      toView(url) {
        this.setViewUrl(url)
        this.$router.push({
          path: '/preview-contract'
        })
      },
      ...mapMutations({
        setViewUrl: 'SET_VIEW_URL',
        setSignUrl: 'SET_SIGN_URL'
      })
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .m-container {
    background: #f6f6f6;
  }
  .list{
    position: relative;
    width: 80%;
    max-width: 1280px;
    padding-top: 100px;
    padding-bottom: 10px;
    margin: 0 auto;
    overflow: auto;
  }
  .item-box {
    padding-bottom: 10px;
  }
  .item{
    position:relative;
    padding: 10px;
    box-sizing:border-box;
    background:#fff;
    transition:all .3s;
    border-radius:4px;
    box-shadow:0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)
  }
  .item:active{
    box-shadow: 0 1px 3px 0 rgba(244,67,54,.2), 0 1px 1px 0 rgba(244,67,54,.14), 0 2px 1px -1px rgba(244,67,54,.12);
  }
  .item_head{
    position: relative;
    line-height:30px;
    padding-bottom:10px;
  }
  .item_head i{
    color: #ff5251;
    font-size: 18px;
  }
  .item_head .title{
    padding-left: 10px;
    font-size: 18px;
    color: #212121;
  }
  .item_state{
    float: right;
    padding:0 10px;
    background:#fff;
    color:#ff5251;
  }
  .item_body{
    display: flex;
    line-height: 1.5;
  }
  .item__left,.item__right{
    flex: 1;
    color: #333;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .new_data,.all_data{
    font-size: 14px;
    color: #ff5251;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .item_foot{
    color: #333;
    line-height: 1.5;
    display: flex;
  }
  .item_action{
    position: relative;
    margin-top:10px;
    padding-top:10px;
    border-top:1px dashed #BDBDBD;
    display: flex;
  }
  .item_action .btn{
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ff5251;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
  }
  span {
    font-size: 14px;
  }
</style>
