// 页面JS逻辑文件
/* eslint-disable */
import banner from './components/banner.vue'
import hello from './components/hello.vue'
import hot_hong from '@/assets/images/hot_hong.png'
let page = {
  name: 'vueDemo',
  data () {
    return {
      msg: 'msg3aaa3',
      hot_hong:hot_hong,
      dialogShowed: false
    }
  },
  components: {
    banner,
    hello
  },
  mounted () {
  },
  methods: {
  	clickBanner () {
  		alert(4)
  	},
  	clickImg () {
  		alert('img')
  	},
    onDialogShow: function(b) {
      YCF_Plugin.toast("onShow");
    },
    onDialogHide: function() {
      YCF_Plugin.toast("onHide");
    },
    alert: function(val) {
      if (val == 'cancel') {
          this.dialogShowed = false;
      }
      YCF_Plugin.toast(val || "");
    }
  }
}
export default page