<template>
    <img :src="validSrc" class="ycf-image" :class="[customclass]" v-bind="$attrs" v-show="validSrc" @click="handleClick">
</template>
<script>
/* eslint-disable */
    export default{
        name: 'ycf-image',
        props: {
            src: {
                type: String,
                default: ''
            },
            customclass: {
                type: String,
                default: ""
            }
        },
        data () {
            return {
                validSrc: '', //最终输出到img src的字段值
                env: comm.frontEnv || 'produciton',
                tempSrc: '', //复制源src，用以进行一系列操作
                imgName: '', //url图片名字
                suffix: '', //url后缀参数 '?xx....'
                //img对应名字的七牛url路径(需originSrc符合相关路径规则)
                imgQiniuSrc: '',
                //img对应名字的本地url路径(需originSrc符合相关路径规则)
                imgLocalSrc: '',
            }
        },
        methods: {
            //判断链接是否为完整的http链接
            isCompleteUrl: function(url) {
                url = url || '';
                var prefix = ['https://', 'http://', '//'];
                for (var i = 0; i < prefix.length; i++) {
                    if (url.indexOf(prefix[i]) == 0) {
                        return true;
                    }
                }
                return false;
            },
            handleClick: function(e) {
                // console.log(this.$listeners);
                //将event传递到父组件,供父组件.stop等使用，否则会报错
                this.$emit('click', e); 
            },
            setImageProterty: function() {
                console.log("原url : " + this.src);
                //对url进行小写处理，方便后续判断
                this.tempSrc = String(this.src || '').toLowerCase();
                var url = this.src,
                    urlArr = url.split("?"),
                    suffix = '',
                    pathArr = urlArr[0].split('/'),
                    imgName = '';
                url = urlArr[0];
                urlArr.splice(0, 1);
                if (pathArr.length > 0) {
                    this.imgName = pathArr[pathArr.length - 1]; //url图片名
                    this.suffix = "?" + urlArr.join("?"); //源url参数
                    //若源图片url 符合七牛路径规则或者本地路径规则
                    if (this.isQiniuSrc() || this.isLocalSrc()) {
                        // 设置可能存在七牛url路径
                        this.imgQiniuSrc = '//qiniu-cdn7.jinxidao.com/dvb/frontv2/images/' + this.imgName + this.suffix;
                        // 设置可能存在本地url路径
                        this.imgLocalSrc = '/srcv2/images/' + this.imgName + this.suffix;
                    }
                }
            },
            isQiniuSrc: function() {
                var url = this.tempSrc;
                if (url.indexOf('//qiniu-cdn7.jinxidao.com/dvb/frontv2/images/') != -1 || url.indexOf('//qiniu-cdn7.jinxidao.com/dvb/front/images/') != -1) {
                    return true;
                }
                return false;
            },
            isLocalSrc: function() {
                var url = this.tempSrc;
                if (url.indexOf('/src/images/') == 0 || url.indexOf('/srcv2/images/') == 0) {
                    return true;
                }
                return false;
            },
            initImage: function() {
                var that = this;
                //获取并设置组件图片相关属性
                that.setImageProterty();
                //若是线上环境，并且是符合七牛，本地项目图片规则的路径
                //优先读取七牛图片，若七牛图片不存在，则读取本地图片，
                //若本地图片不存在，则返回源文件
                if (that.env == 'produciton' && (that.imgQiniuSrc || that.imgLocalSrc)) {
                    that.loadImg(that.imgQiniuSrc).done(function() {
                        that.validSrc = that.imgQiniuSrc;
                    }).fail(function() {
                        that.loadImg(that.imgLocalSrc).done(function() {
                            that.validSrc = that.imgLocalSrc;
                        }).fail(function() {
                            that.validSrc = that.src;
                        });
                    })
                } else {
                    that.loadImg(that.src).done(function() {
                        that.validSrc = that.src;
                    }).fail(function() {
                        that.loadImg(that.imgQiniuSrc).done(function() {
                            that.validSrc = that.imgQiniuSrc;
                        }).fail(function() {
                            that.validSrc = that.src;
                        });
                    })
                }
            },
            loadImg: function(imgUrl) {
                    console.log(imgUrl)
                var dfd = $.Deferred();
                var img = new Image()
                img.src = imgUrl
                img.onerror = function(m){
                    dfd.reject(m);
                }
                img.onload = function(m){
                    dfd.resolve(m);
                }
                return dfd;
            }
        },
        mounted () {
            this.initImage();
        },
        watch: {
            src: function(val) {
                if (val) {
                    this.initImage();
                }
            }
        },
        inheritAttrs: false
    }
</script>
<style lang="scss">
	.ycf-image{
        max-width: 100%;
    }
</style>