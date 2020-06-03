<template>
  <div class="videoPage" v-if="videoVisible">
      <div class="videoCont">
          <video
            id="myVideo"
            :wx:if="videoSrc"
            :src="videoSrc"
            enable-danmu
            controls
            show-center-play-btn
            show-play-btn="false"
            autoplay="false"
            enable-play-gesture='true'
            binderror="videoErrorCallback"
            :auto-pause-if-navigate="false"
            ></video>
      </div>
      <div class="close" @click="closeMask">
          <img src="/static/img/closeIcon.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: [
      'videoVisible',
      'videoSrc'
  ],
  onHide() {
    console.log(1111)
    this.audioCtx = null
    // this.videoContext.pause()
  },
  data() {
    return {
      // videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      inputValue: '',
      poster:''//视频封面
    };
  },
  watch: {},
  computed: {
  },
  methods: {
      closeMask(){
          this.$emit('close')
          this.audioCtx = null
          // this.videoContext.pause()
      },
    //   视频播放错误
      videoErrorCallback(){
          wx.showToast({
            title: '视频播放错误',
            icon: 'none',
            duration: 2000
         })
      },
      getRandomColor() {
        const rgb = []
        for (let i = 0; i < 3; ++i) {
            let color = Math.floor(Math.random() * 256).toString(16)
            color = color.length == 1 ? '0' + color : color
            rgb.push(color)
        }
        return '#' + rgb.join('')
     },
  },
  created() {},
  mounted() {
      this.audioCtx = wx.createAudioContext('myAudio')
  }
};
</script>
<style lang="less" scoped>
.videoPage{
    height: 100%;
    width:100%; 
    position: fixed;
    left: 0;
    top:0;
    background: rgba(0,0,0,0.9);
    z-index: 222;
    display: flex;
    justify-content: center;
    .videoCont{
        width: 100%;
        display: flex;
        align-items: center;
        video {
            width: 100%;
            height: 435rpx;
            display: inline-block;
            line-height: 0;
            overflow: hidden;
            position: relative;
            z-index: 0;
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