<template>
    <div class="circle">
      <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        }
    }
</script>
<style>
  .circle{
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    bottom:0;
    margin-top: -36px;
    z-index: 9999;
  }
</style>
