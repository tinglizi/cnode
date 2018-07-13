import {SHOWLOADING, HIDELOADING, USERINFO, NOREAD} from './type'

const state = {
  showLoading: false,  //设置是否显示loading
  userInfo: null,   //存放当前用户信息
  noReade: null    //未读信息
}

const mutations = {
  [SHOWLOADING](state){
    state.showLoading = true; //显示加载动画
  },
  [HIDELOADING](state){
    state.showLoading = false; //隐藏加载动画
  },
  //设置当前用户信息
  [USERINFO](state,params){
    state.userInfo = params;
  },
  //设置未读信息
  [NOREAD](state, params){
    state.noReade = params;
  }
}
// state ,存放数据
//mutations,里面装着一些改变数据方法的集合
//getters，可以理解为getters是store的计算属性
//actions, 可以异步处理数据方法（异步操作数据）
const getters = {
  showLoading(state){  //显示动画
    return state.showLoading;
  },
  getUsers(state){   //获取users
    return state.userInfo;
  },
  getNoRead(state){
    return state.noReade;  //未读
  }
};

const actions = {
  showLoader: ({commit}) => {    //显示loading
    commit(SHOWLOADING);
  },
  hideLoader: ({commit}) =>{    //隐藏loading
    commit(HIDELOADING);
  },
  setUserInfo: ({commit},info) =>{  //设置用户信息
    commit(USERINFO, info)
  },
  setNoRead: ({commit},info) =>{   //设置未读信息
    commit(NOREAD, info)
  }
};

export default {
  state,mutations,getters,actions
}
