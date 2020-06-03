<template>
    <div class="head">
        <img src="/static/img/skill.png" @click="tomap">
        <div class="title">飞鱼语音助理</div>
    </div>
</template>
<script>
import { formatNavigateTo } from "@/utils/index"
import { answerTextz } from "@/utils/wxRequest.js"
import { request } from "@/utils/wxRequest.js"
export default {
    methods: {
        tomap (){
          
                formatNavigateTo(
					"/pages/map/main" 
				)
           
        }
    },
    created() { 
     //console.log('before') 
    //request('/api','get').then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    //request('http://localhost:8009','get').then(res=>{console.log(res)})
     //request('api','get').then(res=>{console.log(res)})
       //answerTextz('我想去之心城').then((res) => {
           // let a = JSON.parse(res.data.data[1].content)
             //let a = res.data.data
           // console.log(a)
            //console.log(a.intent.moreResults[1].data.result)          
       // })

    }
}

</script>


<style lang="less" scoped>
.head{
    width: 100%;
    height: 8vh;
    position: relative;
    display: flex;
    justify-content: left;
    border: 1px solid rgba(4, 4, 20, 0.356);

    img{
        position:absolute;
         margin: 20rpx 20rpx;
        width: 60rpx;
        height: 60rpx;
    }

    .title{
        position:absolute;
        margin: 20rpx 150rpx;
    }
}
</style>


