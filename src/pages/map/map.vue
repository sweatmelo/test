<template>
  <div class="audioPage" >
      <div class="audioCont">

         <button @click="guide">测试导航</button>
      </div>

      
  </div>

  

</template>

<script>


export default {

  data() {
    return {
     audioSrc:'',
     audioSinger:'',
     audiopic:'',
     show: false,
      key :'6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD',
    };
  },
 
  methods: {
   

// 事件触发，调用接口
      guide() {
     let plugin = requirePlugin('routePlan')
     let map= JSON.parse(this.$root.$mp.query.map)
     console.log(map)  
 //使用在腾讯位置服务申请的key
    let referer = 'fly-fish-voice';   //调用插件的app的名称
     let endPoint = JSON.stringify({  //终点
    'name': map.address,
    'latitude': parseFloat(map.latitude),
    'longitude': parseFloat(map.longitude)
  });
  //let Key = 6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD&location=39.89631551, 116.323459711
  //let SIG = md5("plugin://routePlan/index?key=6LEBZ-N2BRK-SJTJH-AJZ6E-VVMIK-FEBXD&location=39.89631551, 116.323459711SWvT26ypwq5Nwb5RvS8cLi6NSoH8HlJX")
  //PXbfnyRLd6dimBHkcL3Mz3NfmtTvoKj
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + this.key+ '&referer=' + referer + '&endPoint=' + endPoint +'&navigation=1'
      
    });
      },
      
  },
  created() {
  },

 }



</script>
<style lang="less" scoped>
.audioPage{
    height: 100%;
    width:100%; 
    position: relative;
    left:0;
    top:0;
    
    z-index: 222;
    display: flex;
    justify-content: center;
    .audioCont{
        width: 100%;
        display: flex;
        align-items: center;
        top:200rpx;
        audio {
            width: 100%;
            height: 435rpx;
            display: inline-block;
            line-height: 0;
            overflow: hidden;
            position: relative;
            z-index: 0;
         }
    }
}

</style>