<template>
    <div class="user">
      <mheader :theme="loginname"></mheader>
      <div class="pt56" v-if="success">
        <div class="gridlist-demo-container">
          <mu-grid-list class="gridlist-demo" :cols="1" :cellHeight="200" :padding="0" >
            <mu-grid-tile titlePosition="bottom" actionPosition="left" :cols="1" :rows="1" >
              <img :src="user.avatar_url" >
              <span slot="title" class="left title1">创建于 {{create_time(user.create_at)}}</span>
              <span slot="subTitle" class="left subtitle">积分 <b>{{user.score}}</b></span>
              <mu-button slot="action" icon>
                <mu-icon value="person"></mu-icon>
              </mu-button>
            </mu-grid-tile>
          </mu-grid-list>
        </div>
        <mu-tabs :value.sync="active" full-width indicator-color="#03A9F4" >
          <mu-tab>最近回复</mu-tab>
          <mu-tab>最新发布</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active === 0">
          <mu-list textline="two-line" v-if="user.recent_replies.length > 0">
            <router-link v-for="(item,index) in user.recent_replies" :key="index" :to="{name:'topic',params:{id:item.id}}">
              <mu-list-item >
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="item.author.avatar_url">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{item.title}}</mu-list-item-title>
                  <mu-list-item-sub-title>
                    <span>{{item.author.loginname}}</span>
                    <span  class="time">{{difftime(item.last_reply_at)}}</span>
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
            </router-link>
          </mu-list>
          <div class="noInfo" v-if="user.recent_replies.length == 0">暂无</div>
        </div>
        <div class="demo-text" v-if="active === 1">
          <mu-list textline="two-line" v-if="user.recent_topics.length > 0">
            <router-link v-for="(item,index) in user.recent_topics" :key="index" :to="{name:'topic',params:{id:item.id}}">
              <mu-list-item >
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="item.author.avatar_url">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{item.title}}</mu-list-item-title>
                  <mu-list-item-sub-title>
                    <span>{{item.author.loginname}}</span>
                    <span  class="time">{{difftime(item.last_reply_at)}}</span>
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
            </router-link>
          </mu-list>
          <div class="noInfo" v-if="user.recent_replies.length == 0">暂无</div>
        </div>
      </div>

      <!--没数据-->
      <div class="error" v-if="!success">
        <img src="../assets/loading.gif" alt="">
      </div>
    </div>
</template>
<script>
    import mheader from '../common/mHeader.vue'
    import {timeDiff} from '../util/index'
    import {getUserInfo} from '../api/index'
    export default{
        data(){
            return {
                loginname: '',
                success: false,
                user: {},
                active: 0
            }
        },
        computed:{
        },
        created(){
          this.loginname = this.$route.params.loginname;  //设置标题为用户名
          this.getUser();
        },
        methods:{
          getUser(){  //获取用户信息
              getUserInfo(this.loginname).then(res =>{
                this.user = res.data.data;
                this.success = true;
              })
          },
          create_time(time){  //获取创建时间
            let date = new Date(time);
            return date.toLocaleString().replace(/[上午 | 下午]/g,' ').replace(/\//g,'-');
          },
          difftime(time){  //时间差
              return timeDiff(time);
          }
        },
        components:{
            mheader
        }
    }
</script>
<style lang="less" scoped>
  .gridlist-demo {
    width: 100%;
    background: url('../assets/avatar.jpeg') 0 40% no-repeat;
    background-size: cover;
  }
  .user .mu-grid-tile > img{
    width: 80px;
    border-radius: 50%;
    height: 40%;
    margin-top: 20px;
    border: 2px solid #fff;
    position: absolute;
  }
  .left{
    display: inline-block;
    text-align: left;
    width: 100%;
  }
  .title1{
    font-size: 0.16rem;
  }
  .subtitle{
    font-size: 0.14rem;
  }
  .mu-circle-ripple, .mu-ripple-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .mu-tabs{
    background-color: #eee;
    color: #999;
  }
  .mu-tab-active {
    color: #03A9F4;
  }
  .time{
    float: right;
    color: #03A9F4;
  }
  .noInfo{
    text-align: center;
    line-height: 50px
  }
</style>
