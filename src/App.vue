<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
  import loading from './common/loading.vue'
  import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
      return {
       /* showLoading: false*/
      }
  },
  computed:{
    ...mapGetters(['showLoading'])
  },
  components:{
      loading
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}
.pt56{
  padding-top: 0.56rem;
}
.title{
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 0.2rem;
  font-weight: 900;
  font-size: 0.14rem;
  text-align: left;
  padding: 0 .2rem;
  color: #333;
  &:before{
     content: attr(title);
     margin-right: 0.1rem;
     margin-top: -0.03rem;
     padding: 0.04rem 0.06rem;
     color: #fff;
     font-size: 0.1rem;
     font-weight: 400;
     border-radius: 0.04rem;
     background-color: #e7e7e7;
     text-align: center;
     vertical-align: middle;
  }
}
[title='top']:before{
  background: #E74C3C;
  content: '置顶';
}
[title='ask']:before{
  background: #159951;
  content: '问答';
}
[title='share']:before{
  background: #03A9F4;
  content: '分享';
}
[title='job']:before{
  background: #C898DE;
  content: '招聘';
}
[title='good']:before{
  background: #EFBD05;
  content: '精华';
}
[title='default']:before{
  display: none;
}

.error{
  width: 100vw;
  height: 100vh;
  line-height: 140vh;
  font-size: 24px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.error img{
  width: 400px;
  height: 300px;
}
.align-left{
  text-align: left;
}
.align-right{
  text-align: right;
}
</style>
