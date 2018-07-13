import store from '../store/index'
//获取localStorage
export const getLocal = (params)=>{
  console.log(params);
  return window.localStorage.getItem(params);
};

//设置localStorage
export const setLocal = (params, content) =>{
  store.state.userInfo = content;
  window.localStorage.setItem(params,content)
};

//删除localStorage
export const delLocal = (params)=>{
  window.localStorage.removeItem(params);
};

// 将时间改为几天/月/周前
export const timeDiff = (dateStr) =>{  //计算时间  参数：时间
    let date = new Date(dateStr); //由于传过来的时间为UTC时间格式，需要用toLocaleString()转换，将上下午去掉
    let dataTimeStamp = Date.parse(date.toLocaleString().replace(/[下午 | 上午]/g,' '));
    let minute = 1000 * 60; //分
    let hour = minute * 60; //时
    let day = hour * 24;  //天
    let month = day * 30; //月
    let now = new Date().getTime();  //当前时间戳
    let diffValue = now - dataTimeStamp;  //当前时间戳-传过来的时间戳 = 时间差
    if(diffValue < 0){return ;}
    let monthC = diffValue/month;   //几个月
    let weekC = diffValue/(7*day);  //几个周
    let dayC = diffValue/day;    //几天
    let hourC = diffValue/hour;  //几个小时
    let minC = diffValue/minute;  //几分钟
    if(monthC >= 1){
      return ''+parseInt(monthC)+' 月前';
    }else if(weekC >=1){
      return ''+parseInt(weekC)+' 周前';
    }else if(dayC >=1){
      return ''+parseInt(dayC)+' 天前';
    }else if(hourC >=1){
      return ''+parseInt(hourC)+' 小时前';
    }else if(minC >=1){
      return ''+parseInt(minC)+' 分钟前';
    }else{
      return '刚刚';
    }
  };


//获取 tab标签

export const tabInfo = (tab,good,top)=> {
  let str = '';
  let className = '';
  if(top){
    str = '置顶';
    className = 'top';
  }else if(good){
    str = '精华';
    className = 'good';
  }else{
    switch (tab){
      case 'share':
        str = '分享';
        className = 'share';
        break;
      case 'ask':
        str = '问答';
        className = 'ask';
        break;
      case 'job':
        str = '招聘';
        className = 'job';
        break;
      default:
        str = '暂无';
        className = 'default';
        break;
    }
  }
  return className;
};
