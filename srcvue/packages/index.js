// 全局组件库,可用于全局引入组件
/* eslint-disable */
import WButton from './button/index.js';
import YcfImage from './image/index.js';
import YcfDialog from './dialog/index.js';
import YcfAvatarV2 from './avatar_v2/index.js';

const components = [
    WButton,
    YcfImage,
    YcfDialog,
    YcfAvatarV2,
]

const install = function(Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
        // MetaInfo.install(Vue)
        // Vue.prototype.$loading = WLoadingBar
}

// 打包出的js文件，加载后自动执行vue.use
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    // WButton,
    // YcfImage,
}
