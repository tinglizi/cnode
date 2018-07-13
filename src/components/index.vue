<template>
  <div class="node app demo-infinite-container" ref="con1">
      <mheader ></mheader>
      <div class="list">
        <mu-container ref="container" class="demo-loadmore-content pt56 ">
          <div v-if="success">
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
              <mu-list textline="two-line" dense>
                <div class="data-list" v-for="(item,index) in datalist" :key="index" >
                  <router-link :to="{name:'topic',params:{id: item.id}}">
                    <!--<mu-ripple class="mu-ripple-demo demo-1">-->
                    <div class="title" v-html="item.title" :title="tabsInfo(item.tab,item.good,item.top)"></div>
                    <!-- </mu-ripple>-->
                    <mu-list-item   >
                      <mu-list-item-action>
                        <mu-avatar>
                          <img :src="item.author.avatar_url" alt="">
                        </mu-avatar>
                      </mu-list-item-action>
                      <mu-list-item-content>
                        <mu-list-item-title>{{item.author.loginname}}</mu-list-item-title>
                        <mu-list-item-sub-title>{{changeDate(item.create_at)}}</mu-list-item-sub-title>
                      </mu-list-item-content>
                      <mu-list-item-action>
                        <mu-list-item-content >
                          <mu-list-item-title class="text-right"><span class="blue">{{item.reply_count}}</span>/<span class="grey">{{item.visit_count}}</span></mu-list-item-title>
                          <mu-list-item-sub-title class="text-right">{{changeDate(item.last_reply_at)}}</mu-list-item-sub-title>
                        </mu-list-item-content>
                      </mu-list-item-action>
                    </mu-list-item>
                    <mu-divider></mu-divider>
                  </router-link>
                </div>
              </mu-list>
            </mu-load-more>
          </div>

          <!--没数据-->
          <div class="error" v-if="!success">
            <img src="../assets/loading.gif" alt="">
          </div>

        </mu-container >
      </div>
      <!--回到顶部-->
      <totop ></totop>
  </div>

</template>

<script>
  import mheader from '../common/mHeader.vue'
  import totop from '../common/toTop.vue'
  import {getList} from '../api/index'
  import {timeDiff,getLocal,tabInfo} from '../util/index'
  export default {
    data () {
      return {
        success: false,
        datalist: [],  //存放请求过来的数据
        searchKey: {  //请求条件
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true
        },
        refreshing: false,  //下拉刷新
        loading: false   //上拉加载
      }
    },
    created(){
      this.searchKey.tab = this.$route.query.tab || 'all';  //在创建后获取当前url中的tab
      this.getLists();  //获取页面数据
    },
    watch:{
      '$route'(to, from){  //监听路由的变化
        this.searchKey.tab = to.query.tab || 'all'; //设置标签值为跳转界面的url的tab，如果没有则为all
        this.getLists();  //调用页面数据列表
      }
    },
    components:{
        mheader,
        totop
    },
    methods: {
        async getLists(){  //获取数据列表
          let {data} = await getList(this.searchKey);
          this.datalist = data.data;
          this.success=true;
        },
        changeDate(date){ //改变时间
          return  timeDiff(date);
        },
        refresh(){  //下拉刷新
          this.refreshing = true;
          this.$refs.container.scrollTop = 0;
          setTimeout(() => {
            this.getLists();
            this.refreshing = false;
          }, 2000)
        },
        load () {  //上拉加载
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.searchKey.limit += 20;
            this.getLists();
          }, 2000)
        },
        tabsInfo(tab,good,top) {  //获取标题的标签值
          return tabInfo(tab,good,top);
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
  .blue{
    color: #03A9F4;
    font-weight: 900
  }
  .app .mu-item{
    padding: 0.08rem 0.16rem;
  }

  .demo-loadmore-wrap {
    width: 100%;
    max-width: 360px;
    height: 420px;
    display: flex;
    flex-direction: column;
    .mu-appbar {
      width: 100%;
    }
  }
  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    height:100vh;
    -webkit-overflow-scrolling: touch;
  }

  .text-right{
    text-align: right;
  }

  .container {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
  .data-list{
    padding-top: 0.1rem;
  }

</style>
