<template>
  <transition name="slide">
    <div class="m-container">
      <navbar title="合同管理" :showClose="showClose" @back="back"></navbar>
      <div class="list">
        <scroll ref="scroll" class="scroll_list"
                v-if="contractList.length > 0"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown">
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
                  <a class="btn" :href="item.sign_url">签合同</a>
                </div>
              </div>
              <div class="item_action" v-else>
                <div style="flex: 1;margin-right:10px;">
                  <a class="btn" :href="item.download_url">下载</a>
                </div>
                <div style="flex: 1;">
                  <a class="btn" :href="item.viewpdf_url">预览</a>
                </div>
              </div>
            </div>
          </li>
        </scroll>
        <div v-if="hasData">
          <div class="no_data">
            <i class="iconfont icon-nodata"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import $ from 'jquery'
  import Scroll from 'base/scroll/scroll'
  import Navbar from 'base/navbar/navbar'
  import {rendererZhMoneyWan, _normalizeDate} from 'common/js/tool'
  import * as API from 'common/js/http'
  import {getUserInfo, setProduct} from 'common/js/storage'
  import 'weui'
  import weui from 'weui.js'

  export default {
    data() {
      return {
        showClose: false,
        loading: null,
        contractList: [],
        customer_id: '',
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 60,
        startY: 0,
        hasData: false
      }
    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
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
      back() {
        this.$router.back()
      },
      getContractList() {
        $.ajax({
          type: "POST",
          url: API.api + '/api/v1/contract/myContract',
          data: {
            customer_id: this.customer_id
          },
          dataType: "jsonp",
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            if (!res.ret) {
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
            let list = res.rows
            this.contractList = list
            this.hasData = false
            setTimeout(() => {
              this.$refs.scroll.forceUpdate()
            }, 20)
          },
          error: (err) => {
            console.log(err)
            weui.toast('网络异常', {
              duration: 1500
            })
          }
        })
      },
      onPullingDown() {
        // 更新数据
        this.getContractList()
      }
    },
    components: {
      Scroll,
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .m-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #f6f6f6;
  }
  .list{
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
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
    font-size: 16px;
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