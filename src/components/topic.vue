<template>
    <div class="topic">
      <mheader theme="主题"></mheader>
      <div class="pt56 demo-loadmore-content" >
        <div class="topic" v-if="success">
          <!--标题-->
          <h2 class="topic-title padding" v-text="topic.title"></h2>
          <!--收藏-->
          <div class="collect" v-if="userId">
            <mu-button color="primary" small @click="collection">{{collected ? '取消收藏':'收藏'}}</mu-button>
          </div>
          <!--  -->
          <mu-container class="demo-container is-stripe">
            <mu-row >
              <mu-col span="2" class="align-left">
                <router-link :to="{name:'user',params:{loginname: topic.author.loginname}}">
                  <mu-avatar size="40" >
                    <img :src="topic.author.avatar_url">
                  </mu-avatar>
                </router-link>
              </mu-col>
              <mu-col span="5" class="align-left">
                <div class="grid-cell">{{topic.author.loginname}}</div>
                <div class="grid-cell">
                  发布于 {{changeDate(topic.create_at)}}
              </div>
              </mu-col>
              <mu-col span="5" class="align-right">
                <div class="grid-cell">
                  <div class="title" :title="tabsInfo(topic.tab,topic.good,topic.top)"></div>
                </div>
                <div class="grid-cell">{{topic.visit_count}}次浏览</div>
              </mu-col>
            </mu-row>
          </mu-container>
          <!--内容-->
          <section v-html="topic.content" class="content"></section>
          <mu-divider></mu-divider>
          <!--回复-->
          <section class="content margin">
            共 <span class="blue">{{topic.reply_count}}</span>人回复
        </section>
          <mu-divider></mu-divider>
          <!--回复内容-->
          <section class="reply">
            <div v-for="(reply,index) in topic.replies" :key="index">
              <mu-row  class="row-content" align-items="center">
                <mu-col span="2" class="align-left ">
                  <router-link :to="{name:'user',params:{loginname: reply.author.loginname}}">
                    <mu-avatar size="40" >
                      <img :src="reply.author.avatar_url">
                    </mu-avatar>
                  </router-link>
                </mu-col>
                <mu-col span="6" class="align-left">
                  {{reply.author.loginname}} 发布于 {{changeDate(topic.create_at)}}
              </mu-col>
                <mu-col span="4" class="align-right align-item">
                  <span class="right5"><mu-icon slot="left" value="thumb_up" size="20" @click="thumbUp(reply)" :class="{'uped':isUped(reply.ups)}"/></span>
                  <span class="right5">{{reply.ups.length}}</span>
                  <span class="right5"><mu-icon slot="left" value="reply" size="20" @click="replyTo(reply)"/></span>
                </mu-col>
              </mu-row>
              <div class="padding align-left info" v-html="reply.content"></div>
              <section v-show="userId && replyId == reply.id">
                <mu-text-field v-model="replyTextTo" placeholder="" multi-line :rows="6" :maxLength="500" full-width></mu-text-field>
                <mu-button color="purple600"  full-width @click="replyCon">确认</mu-button>
              </section>

            </div>
          </section>

          <!--回复-->
          <section class="padding" v-if="userId">
            <mu-text-field v-model="replyText" placeholder="回复内容" multi-line :rows="6" :maxLength="500" full-width></mu-text-field>
            <mu-button color="purple600"  full-width @click="replyCon">确认</mu-button>
          </section>
        </div>

        <!--没数据-->
        <div class="error" v-if="!success">
          <img src="../assets/loading.gif" alt="">
        </div>
      </div>
      <!--回到顶部-->
      <totop ></totop>

      <!--显示提示信息-->
      <mu-snackbar :position="normal.position" :open.sync="normal.open">
        {{normal.message}}
      </mu-snackbar>
    </div>
</template>
<script>
    import axios from 'axios'
    import mheader from '../common/mHeader.vue'
    import totop from '../common/toTop.vue'
    import {tabInfo, timeDiff} from '../util/index'
    import {collects, cancelCollect, getTopicDetail,getThumb,replies} from '../api/index'
    export default{
        data(){
            return {
                topicId: '',  //存放当前信息的id
                topic: {},    //存放当前主题信息
                success: false,    //是否加载完数据
                collected: false,  //显示收藏/取消收藏
                token: '',     //当前用户的token
                userId: '',   //当前用户id
                replyText: '',  //回复内容
                replyTextTo: '', //回复给XX
                eitXX: '',      //@xx
                replyId: '',    //评论的id
                //提示信息
                normal: {
                  position: 'bottom',
                  message: '',
                  open: false,
                  timeout: 1000
                }
            }
        },
        created(){  //创建后
          this.topicId = this.$route.params.id;  //获取传过来的参数id
          if(this.$store.getters.getUsers){
            this.token = this.$store.getters.getUsers.token;
            this.userId = this.$store.getters.getUsers.userId;
          }
          this.getTopics(); //获取页面数据
        },
        mounted(){

        },
        methods: {
            getTopics(){  //获取页面数据
              getTopicDetail(this.topicId).then(res =>{
                  this.topic = res.data.data; //将请求的数据存放到topic中
                  this.success = true;
               });
            },
            tabsInfo(tab,good,top) {  //获取标题的标签值
              return tabInfo(tab,good,top);
            },
            changeDate(date){ //改变时间
              return timeDiff(date);
            },
            //收藏
            collection(){
              if(this.collected){   //取消收藏
                  cancelCollect(this.token,this.topicId).then(res=>{
                      if(res){
                          this.collected = !this.collected;
                      }
                  })
              }else{
                  // 收藏
                  collects(this.token,this.topicId).then(res=>{
                      if(res){
                        this.collected = !this.collected;
                      }
                  })
              }
            },
            //回复给XX
            replyTo(reply){
              if(!this.userId){   //如果没有登录，跳转登录，否则获取回复的id和姓名
                  this.$router.push('/login');
              }else{
                  this.replyId = reply.id;
                  this.eitXX = `@${reply.author.loginname}`;
              }
            },
            //点赞
            // 如果为up在reply.ups添加（push）userid,如果为down则删除
            thumbUp(reply){
              if(!this.userId){   //如果没有登录，跳转登录，否则获取回复的id和姓名
                this.$router.push('/login');
              }else{
                getThumb(reply.id,this.token).then( res =>{
                  if(res.data.success){
                    if(res.data.action === 'down'){
                      let index = this.arrIndex(this.userId,reply.ups);
                      reply.ups.splice(index, 1);
                    }else{
                      reply.ups.push(this.userId);
                    }
                  }
                }).catch(err =>{
                  console.log(err);
                })
              }
            },
            //回复
            replyCon(){
              let content;
              if(this.replyId){   //判断是回复给指定的某条评论还是当前主题的评论
                  content = this.replyText;
              }else{
                  content = this.eitXX + '    ' + this.replyTextTo ;
              }
              replies(this.topicId,this.token,content,this.replyId).then(res=>{
                this.normal.message = '回复成功，即将跳转';
                this.openSnackBar(); //弹出提示信息
                // 刷新页面
                setTimeout(()=>{
                  this.$router.go(0);
                },2000);
              }).catch(err=>{
                console.log(err);
              })
            },
          //是否点赞  (判断当前reply.ups是否有userId) ,有则返回true
            isUped(ups){
                 return this.arrIndex(this.userId,ups) >= 0;
            },
            //查找索引
            arrIndex(value,arr){
                for (let i in arr){
                  if(value == arr[i]){
                    return i;
                  }
                  if(i == arr.length-1){
                    return  -1;
                  }
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
        },
        components:{
          mheader,
          totop
        }
    }
</script>
<style lang="less" >
  .topic{
    padding-bottom: 0.1rem;
    .topic-title{
      font-size: 0.18rem;
      text-align: left;
    }
    .padding{
      padding: 0 0.08rem;
    }
    .title{
      padding: 0;
      text-align: right;
      margin-bottom: 0.03rem;
    }
    .content{
      text-align: left;
      overflow: hidden;
      padding: .08rem;
      display: block;
    }
    .blue{
      color: #03A9F4;
      font-weight: 900
    }
    .margin{
      margin: 0.08rem 0;
    }
    .row-content{
      padding: 0.08rem;
    }
    .right5{
      margin-right: .08rem;
    }
    .align-item{
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    img{
      width: 100% !important;
    }
    .demo-loadmore-content {
      flex: 1;
      overflow: auto;
      height:100vh;
      -webkit-overflow-scrolling: touch;
    }
  }
  .collect{
    text-align: right;
    margin-right: 0.08rem;
    margin-bottom: 0.1rem;
    button{
      min-width: 60px;
    }
  }
  .topic .uped {
    color: #03A9F4;
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
