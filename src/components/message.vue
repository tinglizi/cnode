<template>
    <div class="info">
      <mheader theme="消息"></mheader>
      <div class="pt56" v-if="success">
        <mu-tabs :value.sync="active" full-width indicator-color="#03A9F4" >
          <mu-tab>已读消息</mu-tab>
          <mu-tab>未读消息</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active === 0">
          <mu-list textline="two-line" v-if="hasRead.length > 0">
            <router-link v-for="(item,index) in hasRead" :key="index" :to="{name:'topic',params:{id:item.topic.id}}">
              <mu-list-item >
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="item.author.avatar_url">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{item.topic.title}}</mu-list-item-title>
                  <mu-list-item-sub-title>
                    <span>{{item.author.loginname}}</span>
                    <span  class="time">{{difftime(item.create_at)}}</span>
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
            </router-link>
          </mu-list>
          <div class="noInfo" v-if="hasRead.length == 0">暂无</div>
        </div>
        <div class="demo-text" v-if="active === 1">
          <mu-list textline="two-line" v-if="hasNotRead.length > 0">
            <router-link v-for="(item,index) in hasNotRead" :key="index" :to="{name:'topic',params:{id:item.topic.id}}">
              <mu-list-item >
                <mu-list-item-action>
                  <mu-avatar>
                    <img :src="item.author.avatar_url">
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{item.topic.title}}</mu-list-item-title>
                  <mu-list-item-sub-title>
                    <span>{{item.author.loginname}}</span>
                    <span  class="time">{{difftime(item.create_at)}}</span>
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
            </router-link>
          </mu-list>
          <div class="noInfo" v-if="hasNotRead.length == 0">暂无</div>
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
    import {getMessage} from '../api'
    export default{
        data(){
            return {
                success: false,
                active: 0,
                hasRead: [],  //已读
                hasNotRead: [],  //未读
                token: this.$store.getters.getUsers.token  //当前用户token
            }
        },
        created(){
            this.messageInfo();
        },
        methods:{
            messageInfo(){  //获取已读未读信息
              getMessage(this.token).then(res=>{
                  if(res){
                    this.hasRead = res.data.data.has_read_messages; //已读
                    this.hasNotRead = res.data.data.hasnot_read_messages; //未读
                    this.success = true;
                  }
              })
            }
        },
        components:{
            mheader
        }
    }
</script>
<style lang="less" scoped>
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
  .info{
    background: #fff;
  }
</style>
