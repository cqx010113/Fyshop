import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";

//home模块的小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code ==200){
            commit("GATEGORYLIST",result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code ==200){
            commit("GATBANNERLIST",result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code ==200){
            commit("GATFLOORLIST",result.data)
        }
    }
};
const mutations = {
    GATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GATBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GATFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}