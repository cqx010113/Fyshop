module.exports = {
    //处理map文件
    productionSourceMap:false,
    //关闭eslint
    lintOnSave:false,
    devServer:{
        proxy:{
            '/api':{
                target:'http://gmall-h5-api.atguigu.cn',
                ws: true,//用于支持websocket
                changeOrigin: true//用于控制请求头中的host值
            }
        }
    }
    
}