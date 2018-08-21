<!-- 页面html代码 -->
<template>
<div class="page" v-cloak>
  <banner @click.native='clickBanner'></banner>
  <div class='presale-list'>
    <div class='item'>
      <div class="hd clearfix">
      <div class="col-left">
        <div class="countdown color-black">
          <div class="countdown-text">
            <span class="hot-icon"></span>离活动开始还有：02分54秒
          </div>
        </div>
      </div>
      <div class="col-right">
        <span class="iconfont icon-all_fenxiang_icon1"></span> 分享返佣
      </div>
    </div>
    <div class="bd clearfix">
      <div class="product-pic">
        <img class="image" src="https://iusystem.bj.bcebos.com/e5ffc4fa7b88f7707957767ef5efbf33.jpg">
      </div>
      <div class="main">
        <div class="p-title">299买一送一买一送一买一送一买一买一送一买一送一买一送一买一送一买一送一</div>
        <div class="origin-value">门市价：￥1500.00</div>
        <div class="face-value">￥<span class="sp1">299.00</span>起</div>
        <div class="operation">
          <span class="btn">
            抢购中1
          </span>
        </div>
      </div>
    </div>
    </div>
  </div>
  <div class="msg">{{msg}}</div>
  <div @click='dialogShowed=true'>显示dialog</div>
  <hello></hello>
  <img :src="hot_hong" alt="">
  <ycf-image src="http://iusystem.bj.bcebos.com/7c2a6c7cd88c7304a7ecfba3ac7b0d4e.png" @click="clickImg"></ycf-image>
  <ycf-image src="/srcv2/images/hot_hong.png" @click="clickImg"></ycf-image>
  <div class="lazy-list">
    <img v-lazy="'http://iusystem.bj.bcebos.com/7c2a6c7cd88c7304a7ecfba3ac7b0d4e.png'">
    <img v-lazy="'http://iusystem.bj.bcebos.com/7c2a6c7cd88c7304a7ecfba3ac7b0d4e.png'">
    <img v-lazy="'http://iusystem.bj.bcebos.com/7c2a6c7cd88c7304a7ecfba3ac7b0d4e.png'">
    <img v-lazy="'http://iusystem.bj.bcebos.com/7c2a6c7cd88c7304a7ecfba3ac7b0d4e.png'">
  </div>
  <ycf-dialog title="标题标题" center type="tips" customClass="dialog-rule" @onCancel="alert('cancel')" @onConfirm="alert('onConfirm')" @onHide="onDialogHide" @onShow="onDialogShow" :visible.sync="dialogShowed" >
      <div>弹窗内容234</div>
      <!--  以下可替换设置整体footer内容 -->
      <!-- <div class="dialog-footer" slot="footer" @click="alert">好的，我知道了</div> -->
  </ycf-dialog>
  <ycf-avatar-v2></ycf-avatar-v2>
</div>
</template>

<script>
import conf from './page.js'
export default conf
</script>

<style lang='sass'>
  @import '@/assets/style/page_base.scss';
  @import './page.scss'; /*引入页面scss*/
</style>
