import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const actions = {
    //获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        //服务器没有数据返回，不用三连环
        //代表服务器加入购物车成功
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
}
const getters = {
    //路径导航
    categoryView(state){
        return state.goodInfo.categoryView ||{};
    },
    //产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo ||{};
    },
    //售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList ||[];
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}