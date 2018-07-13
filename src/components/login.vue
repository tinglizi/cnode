<template>
    <div>
      <mu-appbar style="width: 100%;" color="purple600" >登录</mu-appbar>
      <div class="form">
        <mu-text-field label="Access Token" v-model="username" label-float></mu-text-field>
        <mu-button  color="purple600" ripple @click="login">登录</mu-button>
      </div>
     <!--显示提示信息-->
      <mu-snackbar :position="normal.position" :open.sync="normal.open">
        {{normal.message}}
      </mu-snackbar>
    </div>
</template>
<script>
    import { getlogin, getMessage} from '../api/index'
    import { setLocal } from '../util/index'
    import store from '../store/index'
    export default{
        data(){
            return {
              username: '',
              normal: {
                position: 'bottom',
                message: '',
                open: false,
                timeout: 1000
              }
            }
        },
        methods: {
            // 登录
            login(){
              if(this.username == '' ){
                  this.normal.message = '用户名不能为空！';
                  this.openSnackBar();
              }else{
                this.$store.dispatch('showLoader');  //显示加载动画
                getlogin(this.username).then(res =>{
                  this.$store.dispatch('hideLoader');  //隐藏加载动画
                  if(res.status == '200'){
                    let userInfo = {   //获取用户信息
                        username : res.data.loginname,
                        avatar_url : res.data.avatar_url,
                        token : this.username,
                        userId : res.data.id
                    }
                    //获取已读和未读消息
                    let messageCount = 0;  //未读消息
                    getMessage(this.username).then(res =>{
                      messageCount = res.data.data.hasnot_read_messages.length; //未读
                      //将用户信息,未读信息存储到本地
                      setLocal('User',JSON.stringify(userInfo));
                      setLocal('NoRead',messageCount);
                      this.$store.dispatch('setUserInfo',userInfo);
                      this.$store.dispatch('setNoRead',messageCount);
                      //弹出信息
                      this.normal.message = '登陆成功，即将跳转';
                      this.openSnackBar();
                      // 跳转到首页
                      setTimeout(()=>{
                        this.$router.push('/');
                      },1000);
                    })
                  }
                }).catch(err=>{
                  this.$store.dispatch('hideLoader');  //隐藏加载动画
                  this.normal.message = 'accesstoken 不正确';
                  this.openSnackBar(); //弹出信息
                })
              }
            },
            //弹出提示信息
            openSnackBar(){
                if(this.normal.timer) clearTimeout(this.normal.timer);  //删除timer
                this.normal.open = true;  //设置提示信息显示
                this.normal.timer = setTimeout(() => {  // 设置 2秒后提示信息隐藏
                    this.normal.open = false;
                },this.normal.timeout);
            }
        }
    }
</script>

<style lang="less" scoped>
  .form{
    margin-top: 0.3rem;
  }
  .mu-button{
    vertical-align: middle;
    width: 90%;
    margin: auto;
    margin-top: 0.3rem;
  }
  .mu-snackbar{
    width: 80%;
    margin: auto;
    text-align: center;
    position: absolute;
    left: 0;
    bottom:3%;
  }
</style>
