<template>
    <div class="ycf-dialog__wrapper" v-show="visible">
        <div class="ycf-dialog" :class="[{'ycf-dialog--center': center }, customclass]">
            <div class="ycf-dialog__header">
                <slot name="title">
                    <div class="ycf-dialog__title" v-if="title">{{title}}</div>
                </slot>
            </div>
            <div class="ycf-dialog__body">
                <slot></slot>
            </div>
            <div class="ycf-dialog__footer">
                <span class="sp-line-top"></span>
                <slot name="footer">
                    <div class="ycf-dialog__footer-tips" v-if="type=='tips'" @click.stop="hideDialog">
                        好的，我知道了
                    </div>
                    <div class="ycf-dialog__footer-confirm" v-if="type=='confirm'">
                        <div class="ycf-dialog__footer-item ycf-dialog__footer-btn-cancel" @click.stop="cancel">取消</div>
                        <div class="ycf-dialog__footer-item ycf-dialog__footer-btn-confirm" @click.stop="confirm">确定</div>
                        <slot name="footer-item"></slot>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
    export default {
        name: 'ycf-dialog',
        props: {
            title: {
                type: String,
                // required: true
            },
            type: {
                type: String,
                default: "tips"
            },
            visible: {
                type: Boolean,
                default: false
            },
            customclass: {
                type: String,
                default: ""
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
            }
        },
        methods: {
            hideDialog: function() {
                this.$emit("update:visible", false);
            },
            cancel: function() {
                console.log("clicked btn-cancel");
                this.$emit('onCancel');
            },
            confirm: function() {
                console.log("clicked btn-confirm");
                this.$emit('onConfirm');
            }
        },
        mounted () {
            console.log(this.$slots);
            console.log(this.type);
            console.log(this.customclass);
        },
        watch: {
            visible: function(val) {
                if (val) {
                    this.$emit('onShow');
                } else {
                    this.$emit('onHide');
                }
            }
        },
        inheritAttrs: false
    }
</script>
<style lang="scss">
@import '@/assets/style/page_base.scss';
.ycf-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;
}

.ycf-dialog--center.ycf-dialog {
    text-align: center;

    .ycf-dialog__footer{
        text-align: center;
    }
}

.ycf-dialog {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    @include prefix(transform, translate(-50%, -50%));
    border-radius: pxToRem(12);
    width: pxToRem(670);
}

.ycf-dialog__header {
    font-size: pxToRem(30);
    font-weight: bold;
    color: #333;
    padding-top: pxToRem(20);
}

.ycf-dialog__title{
    padding: pxToRem(50) pxToRem(30);
    padding-top: pxToRem(20);
    @include ellipsis(1);
    padding-bottom: 0;
}

.ycf-dialog__body {
    padding: pxToRem(30);
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(40);
    color: #585858;
}

.ycf-dialog__footer {
    position: relative;
    text-align: center;
    font-size: pxToRem(30);
    color: #d4a85d;
    text-align: right;
    overflow: hidden;
    .sp-line-top {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        @include prefix(transform, scaleY(0.5));
        background-color: #e4e6e7;
    }
}

.ycf-dialog__footer-tips{
    padding: 0 pxToRem(30);
    padding: pxToRem(28) 0;
    line-height: pxToRem(40);
}

.ycf-dialog__footer-confirm{
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    line-height: pxToRem(96);

    .ycf-dialog__footer-item{
        @include prefix(flex, 1);
        text-align: center;
        position: relative;

        &:first-child{
            &:after{
                display: none;
            }
        }

        &:after{
            position:absolute;
            content: "";
            height: 100%;
            width: 1px;
            background-color: #e4e6e7;
            left: 0;
            top: 0;
            @include prefix(transform, scaleX(0.5));
        }
    }
}

.ycf-dialog__footer-btn-cancel{
    color: #333;
}

.text-align-left {
    text-align: left;
}

.text-align-center {
    text-align: center;
}

.text-align-right {
    text-align: right;
}

/*begin 卡帕斯皮肤样式*/
.kapasi,
.kapasi.page {
    .ycf-dialog__footer {
        color: $baseColorKapasi;
    }
}
/*endof 卡帕斯皮肤样式*/

</style>