<template>
    <div class="collection">
      <mheader theme="收藏"></mheader>

      <div class="pt56" v-if="success">
        <mu-list textline="two-line">
          <router-link :to="{name: 'topic',params:{id : collect.id} }" v-for="(collect,index) in collections" :key="index">
            <mu-list-item avatar button >
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="collect.author.avatar_url" alt="">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{collect.title}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <span>{{collect.author.loginname}}</span>
                  <span class="time">{{difftime(collect.last_reply_at)}}</span>
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </router-link>
        </mu-list>
      </div>
      <!--没数据-->
      <div v-if="!success" class="error">
        <img src="../assets/loading.gif" alt="">
      </div>
    </div>
</template>
<script>
    import mheader from '../common/mHeader.vue'
    import {getCollect} from '../api/index'
    import {timeDiff} from '../util/index'
    export default{
        data(){
            return {
                success: false,
                collections: []   //收藏信息
            }
        },
        computed :{
            loginname(){
                return this.$store.getters.getUsers;  //获取用户信息
            },
        },
        created(){
          this.collectInfo();
        },
        methods:{
          collectInfo(){   //获取收藏数据
            getCollect(this.loginname.username).then(res=>{
              if(res){
                this.collections = res.data.data;
                this.success = true;
              }
            })
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
.time{
  float: right;
  color: #03A9F4;
}
</style>
