<template>
    <div class="ycf-avatar-v2__wrapper" style="" v-if="isPopularizer!=-1 && options.length>0" @click="hideOptions" v-show="!isApp">
        <div class="ycf-avatar-v2__layer" v-show="optionShowed"></div>
        <div class="ycf-avatar-v2">
            <div class="ycf-avatar-v2__avatarImg" :class="{'avatarImg-show':avatarShowed}" @click="showOptions">
                <img :src="avatarUrl || defAvatarUrl" class="ycf-avatar-v2__img">
                <div class="ycf-avatar-v2__img-border-cover">
                </div>
                <template v-if="isPopularizer==1">
                    <ycf-image src="/srcv2/images/avatar-bg.png" class="ycf-avatar-v2__bgImg"></ycf-image>
                    <span class="ycf-avatar-v2__tag">推广员</span>
                </template>
            </div>
            <div class="ycf-avatar-v2__options" v-show="optionShowed">
                <div class="ycf-avatar-v2__option-item ycf-avatar-v2__option-animate ycf-avatar-v2__option-close" @click="hideOptions">
                    <ycf-image src="/srcv2/images/avatar-close.png" class="ycf-avatar-v2__option-img"></ycf-image>
                </div>
                <div  v-for="(item) in options" :key="item._class" class="ycf-avatar-v2__option-item ycf-avatar-v2__option-animate" :class="item._class" @click.stop="clickOption(item)">
                    <ycf-image :src="item._iconUrl" class="ycf-avatar-v2__option-img"></ycf-image>
                    <template v-if="item._desc">
                        <span class="ycf-avatar-v2__option-desc" v-if="item.type == 'link' && isHideMoneyText == 1">推广</span>
                        <span class="ycf-avatar-v2__option-desc" v-else>{{item._desc}}</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
    typeof window.componentCenter == 'object' || (window.componentCenter = {});
    export default{
        name: 'ycf-avatar-v2',
        props: {
            //pagetype: 页面类型参数
            //  list: 列表页类型，不需展示options_base的选项
            //  detail: 详情页，需要展示options_base的选项 
            pagetype: {
                type: String,
                default: 'detail',
            },
            // '推广赚钱'是否需要隐藏'赚钱'文案
            // 设置了双向绑定
            ishidemoneytext: {
                default: '0'
            }
        },
        data () {
            return {
                weChatId: "",
                weChatType: 0, //公众号类型（1：直销直采，2：微商城）
                optionShowed: false,
                avatarShowed: true,
                animating: false,
                defAvatarUrl: "http://qiniu-cdn7.jinxidao.com/dvb/front/images/promotersAvatar.png",
                isPopularizer: -1, //是否推广员
                avatarUrl: "", //推广员用户头像
                userName: "", //推广员名称
                options: [], //最终展示出来的选项
                options_base: [{
                    _class: 'ycf-avatar-v2__option-home',
                    _desc: '首页',
                    _iconUrl: '/srcv2/images/avatar-home.png',
                    type: 'home',
                }, {
                    _class: 'ycf-avatar-v2__option-order',
                    _desc: '订单中心',
                    _iconUrl: '/srcv2/images/avatar-order.png',
                    type: 'orderCenter',
                }],
                options_promoter: [{
                    _class: 'ycf-avatar-v2__option-promoterCenter',
                    _desc: '推广员中心',
                    _iconUrl: '/srcv2/images/avatar-promoterCenter.png',
                    type: 'promoterCenter',
                }, {
                    _class: 'ycf-avatar-v2__option-link',
                    _desc: '推广赚钱',
                    _iconUrl: '/srcv2/images/avatar-link.png',
                    type: 'link',
                }],
                mobileEnv: window.mobileEnv || 'wx',
                isApp: window.mobileEnv == "app",
                isHideMoneyText: 0,
            }
        },
        methods: {
            //判断当前用户是否推广员，并获取相关信息
            ajaxGetUserInfo: function(fn_complete) {
                var that = this,
                    ajaxResult = {};
                function isPopularizer(ajaxResult) {
                    //是推广员
                    console.log(ajaxResult);
                    that.isPopularizer = 1;
                    if (that.pagetype == 'list') {
                    }
                };
                function isNotPopularizer(ajaxResult) {
                    // 不是推广员
                    that.isPopularizer = 0;
                };
                // 废除旧判定方法，
                // databus.verifyPopularizer(isPopularizer, isNotPopularizer);
                databus.verifyIfPopularizer().done(function(_ajaxResult) {
                    ajaxResult = _ajaxResult;
                    isPopularizer(_ajaxResult);
                }).fail(function(_ajaxResult) {
                    ajaxResult = _ajaxResult;
                    isNotPopularizer(_ajaxResult);
                }).always(function() {
                    var content = ajaxResult && ajaxResult.content || {};
                    that.avatarUrl = content.userPic || '';
                    that.userName = content.realName || '';
                    if (that.pagetype != 'list') {
                        that.options = that.options.concat(that.options_base);
                    }
                    if (that.isPopularizer == 1) {
                        that.options = that.options.concat(that.options_promoter);
                    } else if (that.isPopularizer == 0) {
                    }
                    that.$nextTick(function() {
                        //若有选项按钮，才展示头像
                        if (that.options.length > 0) {
                            //避免滚动出界，出现头部和底部的黑底
                            document.querySelector('.ycf-avatar-v2__layer').addEventListener('touchmove', function(ev) {
                                ev.preventDefault();
                            });
                            //设置选项的相关定位样式
                            that.initOptionsStyle();
                        }
                    });
                    typeof fn_complete == 'function' && fn_complete.call(this, ajaxResult);
                });
            },
            clickOption: function(item) {
                var type = item.type;
                console.log(type);
                if (type == 'home') {
                    this.toPageHome();
                }
                if (type == 'orderCenter') {
                    this.toPageMyOrders();
                }
                if (type == 'promoterCenter') {
                    this.toPagePromoterCenter();
                }
                if (type == 'link') {
                    this.showShareCover();
                }
            },
            //初始化设置选项样式
            initOptionsStyle: function() {
                var options = this.options || [],
                    itemClass,
                    itemClassArr,
                    $item;
                for (var i = 0; i < options.length; i++) {
                    itemClass = options[i]['_class'] || '';
                    itemClassArr = itemClass.split(' ');
                    $item = $('.' + itemClassArr.join('.'))
                    if ($item && $item.length > 0) {
                        $item.css({
                            // top: ((i + 1) * -100) + '%'
                        })
                    }
                }
            },
            showOptions: function() {
                var that = this;
                if (that.animating) {
                    return;
                }
                that.animating = true;
                this.optionShowed = true;
                this.avatarShowed = false;
                setTimeout(function() {
                    var $optionEls = $(".ycf-avatar-v2 .ycf-avatar-v2__option-animate"),
                        $optionItem;
                    for (var i = 0; i < $optionEls.length; i++) {
                        $optionItem = $optionEls.eq(i);
                        $optionItem.css({
                            'transform': 'translateY(' + (-100 * (i)) + '%)',
                            'opacity': 1
                        });
                    }
                }, 100);
                $(".ycf-avatar-v2__layer").removeClass('layer-hide').addClass('layer-show');
                setTimeout(function() {
                    that.animating = false;
                }, 500);
            },
            hideOptions: function() {
                var that = this;
                if (that.animating) {
                    return;
                }
                that.animating = true;
                this.optionShowed = true;
                var $optionEls = $(".ycf-avatar-v2 .ycf-avatar-v2__option-animate"),
                    $optionItem;
                for (var i = 0; i < $optionEls.length; i++) {
                    $optionItem = $optionEls.eq(i);
                    $optionItem.css({
                        'transform': 'translateY(0%)',
                        'opacity': 0
                    })
                }
                setTimeout(function() {
                    // $(".ycf-avatar-v2__layer").removeClass('layer-show');
                    $(".ycf-avatar-v2__layer").removeClass('layer-show').addClass('layer-hide');
                    that.avatarShowed = true;
                    setTimeout(function() {
                        that.optionShowed = false;
                        that.animating = false;
                    }, 500);
                }, 0);
            },
            // 推广链接
            showShareCover: function() {
                databus.getUserPromotion().done(function(promotion, ajaxResult) {
                    if (promotion == "") {
                        console.log("非推广员");
                    }
                    YCF_Plugin.setWeiXinShare(window.defShareObj, promotion);
                    YCF_Plugin.showShareCover();
                })
            },
            //跳转到推广员中心
            toPagePromoterCenter: function() {
                var param = {
                    'weChatId': 1,
                    'fromWeChatId': this.weChatId
                };
                // 旧推广员中心连接
                // window.location.href = "/front/userCenter/promoters?" + YCF_Plugin.toQueryString(param);
                window.location.href = "/front/promoter/promoterCenter?" + YCF_Plugin.toQueryString(param);
            },
            //跳转到首页
            toPageHome: function() {
                var param = {
                    weChatId: this.weChatId
                };
                //微商城
                if (this.weChatType == 2) {
                    window.location.href = '/front/platform/index?' + YCF_Plugin.toQueryString(param);
                } else {
                    //直销直采
                    window.location.href = '/front/index/indexNew?' + YCF_Plugin.toQueryString(param);
                }
            },
            toPageMyOrders: function() {
                console.log("跳转到我的订单页面")
                var param = {
                    'weChatId': this.weChatId
                };
                window.location.href = "/front/userCenter/orderlist?" + YCF_Plugin.toQueryString(param);
            }
        },
        mounted () {
            // app打开则不初始化
            if (this.isApp) {
                return false;
            }
            console.log("ycf组件初始化：avatar");
            window.componentCenter.ycfAvatar = this;
            this.weChatType = window.comm && (window.comm.weChatType || 0);
            this.isHideMoneyText = this.ishidemoneytext;
            if (window.enterPageObj) {
                this.enterMode = window.enterPageObj.enterMode;
                this.weChatId = window.weChatId || window.enterPageObj.weChatId;
                this.hotelId = window.enterPageObj.hotelId;
            }
            this.ajaxGetUserInfo();
            var that = this;
        },
        watch: {
            isHideMoneyText: function(val) {
                this.$emit("update:ishidemoneytext", val);
            },
            ishidemoneytext:function(val){
                this.isHideMoneyText = val;
            }
        },
        inheritAttrs: false
    }
</script>
<style lang="scss">
@import '@/assets/style/page_base.scss';
.ycf-avatar-v2__wrapper {}

.ycf-avatar-v2 {
    position: fixed;
    z-index: 1999;
    right: 0;
    bottom: pxToRem(150);
    width: pxToRem(128);
    height: pxToRem(128);
    &__layer {
        position: fixed;
        height: 100%;
        width: 100%;
        /*background-color: rgba(255, 255, 255, 0);*/
        
        left: 0;
        top: 0;
        z-index: 1999;
        /*transition: all 0.5s;*/
        
        &.layer-show {
            background-color: rgba(255, 255, 255, 0);
            animation: ycfAvatarLayerShow 0.5s forwards;
        }
        &.layer-hide {
            background-color: rgba(255, 255, 255, 0.9);
            animation: ycfAvatarLayerHide 0.5s forwards;
        }
    }
    &__avatarImg {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.5s;
        opacity: 0;
        &.avatarImg-show {
            transform: scale(1);
            opacity: 1;
        }
    }
    &__img-border-cover {
        width: pxToRem(90);
        height: pxToRem(90);
        position: absolute;
        top: 50%;
        left: 50%;
        @include prefix(transform, translate(-50%, -50%));
        border-radius: 50%;
        border: pxToRem(4) solid #fff;
        box-shadow: 0px 0px pxToRem(13) 0px rgba(138, 138, 138, 0.24);
        overflow: hidden;
    }
    &__img {
        width: pxToRem(90);
        height: pxToRem(90);
        position: absolute;
        top: 50%;
        left: 50%;
        @include prefix(transform, translate(-50%, -50%));
        border-radius: 50%;
        border: pxToRem(2) solid #fff;
        /*box-shadow:  0px 0px pxToRem(13) 0px rgba(138, 138, 138, 0.24);*/
        
        overflow: hidden;
    }
    &__bgImg {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    &__tag {
        position: absolute;
        bottom: pxToRem(8);
        left: 50%;
        line-height: pxToRem(30);
        font-size: pxToRem(16);
        /*background-color: #E8B657;*/
        
        color: #fff;
        text-align: center;
        display: inline-block;
        border-radius: pxToRem(30);
        width: pxToRem(75);
        @include prefix(transform, translateX(-50%));
        box-shadow: 0px pxToRem(2) pxToRem(6) 0px rgba(243, 191, 95, 0.4);
        /*background: -webkit-gradient(linear,left top,right bottom,from(rgba(230,178,84,0.4)),to(rgba(242,190,96,1)));*/
        
        background-image: -webkit-linear-gradient(143deg, rgb(230, 178, 84) 0%, rgb(242, 190, 96) 100%);
        background-image: -moz-linear-gradient(143deg, rgb(230, 178, 84) 0%, rgb(242, 190, 96) 100%);
        background-image: -o-linear-gradient(143deg, rgb(230, 178, 84) 0%, rgb(242, 190, 96) 100%);
        background-image: linear-gradient(143deg, rgb(230, 178, 84) 0%, rgb(242, 190, 96) 100%);
    }
    &__options {
        height: 100%;
        width: 100%;
        position: relative;
        z-index: 1;
    }
    &__option-item {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        opacity: 0;
        transition: all 0.5s;
    }
    &__option-close {
        z-index: 1;
        &__option-img {
            width: 100%;
            height: 100%;
        }
    }
    &__option-img {
        width: pxToRem(110);
        height: pxToRem(110);
        position: absolute;
        top: 50%;
        left: 50%;
        @include prefix(transform, translate(-50%, -50%));
    }
    &__option-desc {
        position: absolute;
        top: 50%;
        left: 0;
        @include prefix(transform, translate(-100%, -50%));
        white-space: nowrap;
        color: #555;
        font-size: pxToRem(28);
    }
}

@keyframes ycfAvatarLayerShow {
    0 {
        background-color: rgba(255, 255, 255, 0);
    }
    100% {
        background-color: rgba(255, 255, 255, .9);
    }
}

@keyframes ycfAvatarLayerHide {
    0 {
        background-color: rgba(255, 255, 255, 0.9);
    }
    100% {
        background-color: rgba(255, 255, 255, 0);
    }
}

</style>