<template>
    <div class="toTop">
      <mu-button  fab color="purple" small v-show="show" @click="toTop">
        <mu-icon value="publish"></mu-icon>
      </mu-button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                target: null,
                show: false
            }
        },
        props: ['dom'],
        mounted(){
          this.target='.demo-loadmore-content';  //类名为demo-loadmore-content的div不能添加v-if,不然document获取不到
          document.querySelector(this.target).addEventListener('scroll',this.scroll);
        },
        methods:{
         scroll(){  //滚动
            if(document.querySelector(this.target).scrollTop > 200){  //判断当前的div的scrollTop是否大于200，如果大于则显示
              this.show = true;
            }else{
              this.show = false;
            }
          },
          toTop(){ //回到顶部
            document.querySelector(this.target).scrollTop = 0;
            this.show = false;
          }
        }

    }
</script>
<style lang="less" scoped>
  .toTop{
    position: fixed;
    bottom: 40px;
    right: 30px;
    z-index: 5555;
    transition: all 0.3s;
    .mu-icon{
      font-size: 25px;
    }
  }
</style>
