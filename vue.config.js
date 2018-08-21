const path = require('path')
const sourceRoot = 'srcvue'
const HTMLPlugin = require('html-webpack-plugin')
var glob = require('glob')
    // 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, `${sourceRoot}/pages`)

let pagesMap = {}

// 打包模式，
// 'default':全部打包，包括html页面生成
// 'noHtml':只按页面层级打包js，不生成html页面
let buildMode = 'noHtml'

function getPageConf(entryPath) {
    return {
        // page 的入口(注：此处不能用@，会导致读取文件失败)
        entry: `${sourceRoot}/pages/${entryPath}/index.js`,
        // 模板来源(注：此处不能用@，会导致读取文件失败)
        template: `${sourceRoot}/pages/${entryPath}/index.html`,
        // dev或build后访问的页面
        filename: `${entryPath}.html`,
        // 当使用 title 选项时
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: entryPath,
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk-vendors 和 chunk-common。
        chunks: ['chunk-vendors', 'chunk-common', 'common', entryPath],

        // 非pages配置项，供非default打包模式使用
        entryPathForRoot: `@/pages/${entryPath}/index.js`,

        // chunksSortMode: 'manual', // 无效设置，需要chainWebpack修改
    }
}

function getPagesMap() {
    // 获取多页面下文件路径
    var entryFiles = glob.sync(PAGE_PATH + '/*/*/index.js'),
        map = {}

    entryFiles.forEach(filePath => {
        console.log(filePath)
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.')),
            fArr = filePath.split('/'),
            actionName = fArr[fArr.length - 2] || '',
            controllerName = fArr[fArr.length - 3] || '',
            entryPath = `${controllerName}/${actionName}`;

        map[entryPath] = getPageConf(entryPath)
    })

    // console.log("%c " + text, "color:#f0f");
    console.log(map);
    return map
}

pagesMap = getPagesMap()

module.exports = {
    filenameHashing: false,

    baseUrl: process.env.NODE_ENV === 'production' ? '../' : '/',

    assetsDir: 'static',

    outputDir: 'dist',

    pages: (function() {
        let map = {};
        if (buildMode == 'default') {
            map = pagesMap;
        } else {
            map['demos/demo1'] = getPageConf('demos/demo1')
        }

        return map;
    })(),

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: true,

    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,

    devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        }, // 配置多个代理
        headers: {
            // 设置允许跨域
            'Access-Control-Allow-Origin': '*'
        }
    },

    configureWebpack: {
        entry: (function() {
            let map = {
                'common': '@/page_common.js',
            }
            if (buildMode != 'default') {
                for (let entryPath in pagesMap) {
                    map[entryPath] = pagesMap[entryPath]['entryPathForRoot']
                }
            }

            return map
        })(),
        plugins: (function() {
            if (process.env.NODE_ENV === 'production') {
                // 为生产环境修改配置...
                console.log("********************************************")
                console.log("生产环境")
                console.log("********************************************")
            } else {
                // 为开发环境修改配置...
                console.log("********************************************")
                console.log("开发环境")
                console.log("********************************************")
            }
            return []
        })(),
        resolve: {
            alias: {
                '@': path.resolve(__dirname, sourceRoot),
            }
        },
        // splitChunks: {
        //     cacheGroups: {
        //         vendors: {}
        //     }
        // }
    },
    chainWebpack: config => {

        // 页面html文件也需要打包才更改配置
        if (buildMode == 'default') {
            for (var entryPath in pagesMap) {
                // 设置html-webpack-plugin参数
                config.plugin(`html-${entryPath}`).tap(args => {
                    if (args[0]) {
                        args[0].chunksSortMode = 'manual'
                    }
                    return args
                })
            }
        }

    },

    runtimeCompiler: undefined,
    parallel: undefined,
    css: undefined,
}
