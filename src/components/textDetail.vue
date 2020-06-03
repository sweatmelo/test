<template>
  <div class="textDetail" v-if="visible">
    <div class="lognIcon">
      <img src="/static/img/maskIcon.png" alt="">
    </div>
    <div class="detailCont" v-if="refText">
      <div class="textCont" v-if="answer">
        <text v-text="textDetail.textDesc"></text>
      </div>
      <ul class="textCont" v-else>
        <li v-for="(item, index) in moreText" :key="index">
          <text v-text="item.sentences"></text>
        </li>
      </ul>
      <!-- <div class="close" @click="closeMask">
        <img src="/static/img/closeIcon.png" alt="">
      </div> -->
    </div>
    <div class="imgCont" v-else>
      <div class="imagePath">
        <img :src="detailImg" alt="">
      </div>
    </div>
    <div class="close" @click="closeMask">
      <img src="/static/img/closeIcon.png" alt="">
    </div>
  </div>
</template>

<script>
   import imgPath from "../../static/img/closeIcon.png"
    export default {
      name: "text-detail",
      props:[
        'visible',
        'textDetail',
        'refText',//true是文本  false是图片
        'detailImg', // 图片路径
      ],
      data(){
        return{
          detailImg: imgPath,
          answer:true,
          moreText:[]
        }
      },
      watch:{
        visible:'watchVisited'
      },
      
      methods:{
        watchVisited(newVal,oldVal){
          if(newVal === true){
            if(this.textDetail.flag === 2){
              this.answer = false
              this.moreText = this.textDetail.data
            }else{
              this.answer = true
            }
            console.log(this.textDetail)
          }
        },
        closeMask(){
          this.$emit('close')
        }
      },
      mounted(){
        console.log(this.textDetail)
      }
    }
</script>

<style lang="less" scoped>
@import url("../../static/css/base.css");
 .textDetail{
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.59);
    z-index: 222;
    display: flex;
    justify-content: center;
    .lognIcon{
      width: 128rpx;
      height: 110rpx;
      position: absolute;
      z-index: 888;
      left: 338rpx;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .detailCont{
      width:582rpx;
      height:840rpx;
      // height:70vh;
      background:rgba(255,255,255,1);
      box-shadow:0px 4rpx 26rpx 0px rgba(20,100,255,0.17);
      border-radius:8rpx;
      overflow-y: scroll;
      position: absolute;
      left: 84rpx;
      top: 68rpx;
      .textCont{
        padding: 76rpx 32rpx;
        height: 668rpx;
        li{
          margin-bottom:20rpx;
        }
        text{
          font-size:24rpx;
          font-family:PingFangSC-Regular,PingFang SC;
          color:rgba(51,51,51,1);
          line-height:34rpx;
        }
      }
    }
    .imgCont{
        width:100%; 
        position: absolute;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.9);
        z-index: 222;
        display: flex;
        justify-content: center;
        height: inherit;
        align-items: center;
        .imagePath{
          width: 100%;
          height: 422rpx;
          img{
            width: 100%;
            height: 100%;
          }
        }
    }
    .close{
      position: fixed;
      top:964rpx;
      color: #fff;
      width: 40rpx;
      height: 40rpx;
        img{
            width: 100%;
            height: 100%;
          }  
      }
}
</style>
