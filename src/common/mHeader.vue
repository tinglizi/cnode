<template>
    <div class="header">
      <mu-appbar style="width: 100%;" color="purple600">
        <mu-button icon slot="left" @click="open=!open">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <span >{{theme ? theme : title }}</span>
       <mu-button icon slot="right" @click="goAdd">
            <mu-icon value="add" ></mu-icon>
        </mu-button>
      </mu-appbar>
      <!--抽屉导航-->
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
        <mu-list>
          <router-link to="/login" v-if="!userInfo">
            <mu-list-item button >
              <mu-list-item-action>
                <mu-icon value="person_outline"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title >登录</mu-list-item-title>
            </mu-list-item>
          </router-link>
          <!--登录后显示的用户信息-->
          <div v-else>
            <router-link :to="{name:'user',params:{loginname: userInfo.username}}" @click.native="open = false">
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="person"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title >{{userInfo.username}}</mu-list-item-title>
              </mu-list-item>
            </router-link>
            <router-link :to="{name:'message'}" @click.native="open = false">
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="report_problem"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title >消息</mu-list-item-title>
                <mu-badge :content="noRead" :primary="noRead>0" circle ></mu-badge>
              </mu-list-item>
            </router-link>
            <router-link :to="{name:'collection'}" @click.native="open = false">
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="grade"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title >收藏</mu-list-item-title>
              </mu-list-item>
            </router-link>
            <mu-list-item button  @click="loginOut">
              <mu-list-item-action>
                <mu-icon value="undo"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title >退出</mu-list-item-title>
            </mu-list-item>
          </div>

          <!--分割线-->
          <mu-divider></mu-divider>
          <div >
            <router-link  v-for="(item,index) in drawerData" :key="index" :to="{name:'index',query:{tab: item.tab}}" @click.native="open = false">
              <mu-list-item button  @click="changeTitle(item.title)">
                <mu-list-item-action>
                  <mu-icon :value="item.icon"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>{{item.title}}</mu-list-item-title>
              </mu-list-item>
            </router-link>
          </div>
        </mu-list>
      </mu-drawer>
    </div>
</template>
<script>
  import {delLocal,getLocal,setLocal} from '../util/index'
    export default{
        data(){
            return {
                open: false,
                docked: false,
                position: 'left',
                title: '全部',
                drawerData: [
                  {
                    title: '全部',
                    icon: 'list',
                    tab: 'all'
                  },
                  {
                    title: '精华',
                    icon: 'thumb_up',
                    tab: 'good'
                  },
                  {
                    title: '分享',
                    icon: 'share',
                    tab: 'share'
                  },
                  {
                    title: '问答',
                    icon: 'live_help',
                    tab: 'ask'
                  },
                  {
                    title: '招聘',
                    icon: 'local_mall',
                    tab: 'job'
                  }
                ]
            }
        },
        props:['theme'],
        computed:{
          userInfo(){  //用户信息
              return this.$store.getters.getUsers;
          },
          noRead(){  //未读消息
            return this.$store.getters.getNoRead;
          }
        },
        beforeMount(){  //挂载之前对title 进行赋值（本地存储的数据title）, 完成了el和data的初始化
            this.title = getLocal('title') || '全部';
        },
        methods:{
          loginOut(){  //退出
            delLocal('User'); //删除存在本地的用户信息
            delLocal('NoRead');
            window.location.reload(); //刷新当前页面
          },
          changeTitle(param){  //更换title
            setLocal('title',param); //将title存储到本地
            this.title = param;
          },
          goAdd(){
            this.$router.push('/add');
          }
        }
    }
</script>
<style lang="less">
  .header {
    .mu-appbar {
      text-align: center;
      position: fixed;
    }
  }
/*  .add{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 555;
  }*/
</style>
