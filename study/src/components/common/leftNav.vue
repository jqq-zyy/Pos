<template>
  <div class="left-nav">
    <ul>
      <li v-for="item in navList" @click="changePath(item.path)"><i class="icon iconfont" :class="item.icon"></i>{{item.name
        }}</li>
      <!--<li><i class="icon iconfont icon-dianpu"></i>店铺管理</li>-->
      <!--<li><i class="icon iconfont icon-shangpin"></i>商品</li>-->
      <!--<li><i class="icon iconfont icon-huiyuan"></i>会员</li>-->
      <!--<li><i class="icon iconfont icon-tongji"></i>统计</li>-->
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import NavData from'@/data/nav'
//  import API from 'api/api_common'
export default{
  data(){
    return{
      navList:NavData,
    }
  },
  methods:{
    changePath($path){
      this.$router.push({path: $path})
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .left-nav {
    color: #ffffff;
    font-size: 10px;
    float: left;
    background: #1d8ce0;
    width: 8%;
    height: 100%;
    /*min-width: 90px;*/
  }

  .iconfont {
    font-size: 24px;
  }

  .left-nav ul {
    li {
      text-align: center;
      line-height: 48px;
      border-bottom: 1px solid #cccccc;
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
