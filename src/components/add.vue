<template>
    <div class="add">
      <mheader theme="主题"></mheader>
      <div class="content pt56">
        <mu-select label="选择分类" v-model="classfiy" full-width label-float @input="check">
          <mu-option v-for="option in options" :key="option" :label="option" :value="option"></mu-option>
        </mu-select>
        <mu-text-field v-model="title" label="标题，字数10字以上" prefix="" label-float full-width :errorText="errorTxt" @input="check(1)"></mu-text-field>
        <mu-text-field v-model="reply" multi-line :rows="8" full-width label="回复支持Markdown语法,请注意标记代码" label-float max-length="500" @input="check"></mu-text-field>
        <mu-button :disabled="disabled"  class="button" full-width color="primary" @click="submit">确认</mu-button>
      </div>
      <!--显示提示信息-->
      <mu-snackbar :position="normal.position" :open.sync="normal.open">
        {{normal.message}}
      </mu-snackbar>
    </div>
</template>
<script>
    import mheader from '../common/mHeader.vue'
    import {addTopic} from '../api'
    export default{
        data(){
            return {
              options: ['分享', '问答', '招聘'],
              classfiy: '',   //分类
              title: '',    //标题
              reply: '',     //回复
              disabled: true,   //按钮状态
              errorTxt: '',    //错误信息
              accessToken: '',  //当前用户的tocken
              normal: {        //提示框信息
                position: 'bottom',
                message: '',
                open: false,
                timeout: 1000
              }
            }
        },
        mounted(){
          this.accessToken = this.$store.getters.getUsers.token; //获取当前用户的token
        },
        methods: {
            //检测输入的文本
            check(param){
              if(this.title.length >= 10 && this.classfiy && this.reply){
                  this.errorTxt = '';
                  this.disabled = false;
              }
              if(this.title.length < 10 && param == 1){
                  this.errorTxt = "标题的字数在10字以上!";
              }else{
                this.errorTxt="";
              }
            },
            submit(){  //提交
              addTopic(this.accessToken,this.classfiy,this.title,this.reply).then((res)=>{
                if(res.success){
                    this.normal.message = '回复成功，即将跳转';
                    this.openSnackBar();
                    // 跳转到首页
                    setTimeout(()=>{
                      this.$router.push('/');
                    },1000);
                }
              }).catch(err=>{
                this.normal.message = err.error_msg;
                this.openSnackBar(); //弹出信息
                setTimeout(()=>{
                  history.go(0);
                },1000);
              })
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
        components: {
            mheader
        }
    }
</script>
<style lang="less" scoped>
  .list{
    margin-top: 0.2rem;
  }
  .content{
    padding:0 0.08rem;
    padding-top: 0.8rem;
    padding-bottom: 0.1rem;
  }
  .button{
    margin-top: 0.1rem;
  }

</style>
