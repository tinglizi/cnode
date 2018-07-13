import axios from 'axios'
import store from '../store/index'
axios.defaults.baseURL='https://cnodejs.org/api/v1'; //设置默认地址*/
axios.defaults.timeout = 5000; //超时时间*/

//http请求拦截
axios.interceptors.request.use(config =>{
  console.log("请求中");
  // store.dispatch('showLoader');
  return config;
},error => {
  return Promise.reject(error);
})

//http 响应拦截
axios.interceptors.response.use(config =>{
  console.log("返回了。。。");
/*  setTimeout(function () {
    store.dispatch('hideLoader');
  },500);*/
  return config;
},error => {
  return Promise.reject(error);
})

//登录
export const getlogin = (username)=>{
  return axios.post('/accesstoken',{'accesstoken' : username});
}

//获取数据列表(index)
export const getList = (params)=>{
  return axios.get(`/topics?page=${params.page}&limit=${params.limit}&tab=${params.tab}&mdrender=true`);
}

//获取已读和未读消息
export const getMessage = (params) =>{
  return axios.get(`/messages?accesstoken=${params}`);
}

//获取收藏信息
export const getCollect = (params) =>{
  return axios.get(`/topic_collect/${params}`);
}

// 收藏
export const collects = (token,topicid) =>{
  return axios.post("/topic_collect/collect",{'accesstoken': token,'topic_id': topicid});
}
// 取消收藏
export const cancelCollect = (token,topicid) =>{
  return axios.post("/topic_collect/de_collect",{'accesstoken': token,'topic_id': topicid});
}

//获取列表数据详情（topic）
export const getTopicDetail = (topicId) =>{
  return axios.get(`/topic/${topicId}`);
}

//获取用户信息
export const getUserInfo = (loginname)  =>{
  return axios.get(`/user/${loginname}`);
}

//点赞
export const getThumb = (replyId,token) =>{
  return axios.post(`/reply/${replyId}/ups`,{'accesstoken': token});
}

// 回复
export const replies = (topicId,token,content,replyId) =>{
  return axios.post(`/topic/${topicId}/replies`,{'accesstoken':token,'content':content,'reply_id':replyId});
}

//添加
export const addTopic = (token, classfiy, title, reply)=>{
  return axios.post('/topics',{accesstoken: token, title: title, tab: classfiy, content: reply});
}
