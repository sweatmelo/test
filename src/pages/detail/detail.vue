<template>
  <div class="detailPage">
    <!-- <div class="backIcon" @click="clickBack">
      <img :src="backPath" alt="">
    </div> -->
    <ul class="detailConts" v-if="flage">
      <li v-for="(item, index) in detailList" :key="index">
        <div class="detailPic">
          <img :src="item.imgPath" @click="previewImage(index,1,item)" alt="">
        </div>
          <!-- 文字 -->
        <div class="detailFont" v-html="item.text">
          
        </div>
      </li>
    </ul>

    <ul class="detailConts" v-else>
      <li v-for="(item, index) in detailMoreList" :key="index">
        <div class="detailPic">
          <img :src="item.imgPath"  @click="previewImage(index,2,item)" alt="">
        </div>
          <!-- 文字 -->
        <div class="detailFonts" v-html="item.text">
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  onLoad(options) {
    this.param = JSON.parse(options.param)
    this.getDatas()
  },
  data() {
    return {
      backPath: require('../../../static/img/back.png'),
      detailList:[],
      detailMoreList:[],
      param:'',
      flage: true,
      imgSrc:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
    previewImage(index,id,item){
      console.log(index)
      let _this = this
      if(id === 1){
        wx.previewImage({
          current: item.imgPath, // 当前显示图片的http链接  
          urls: _this.param.imgSrc // 需要预览的图片http链接列表  
        })
      }else{
        let moreList = this.param.data
        let moreImg = []
        console.log(typeof moreImg)
        for (var i = 0; i < moreList.length; i++){
          for(var e = 0; e < moreList[i].image.length; e++){
            moreImg.push(moreList[i].image[e])
          }
        }
        wx.previewImage({
          current: item.imgPath, // 当前显示图片的http链接  
          urls: moreImg // 需要预览的图片http链接列表  
        })
      }
    },
    // 数据结构
    getDatas(){
      this.detailList = []
      this.detailMoreList = [],
      console.log(this.detailList)
      let imgs = this.param.imgSrc
      if(this.param.flag === 1){
        this.flage = true
        console.log(this.param)
        let list = this.param.textDesc.split('</img>')
        for (var i = 0; i <list.length; i++){
          let newObj = {}
          for (var e = 0; e < imgs.length; e++){
            if(i === e){
              newObj.text = list[i],
              newObj.imgPath = imgs[e]
              this.detailList.push(newObj)
            }
          }
        }
      }else{
        this.flage = false
        let moreList = this.param.data
        console.log(this.param)
        console.log(moreList)
        for (var i = 0; i < moreList.length; i++){
          let newObj = {}
          console.log(111)
          for(var e = 0; e < moreList[i].image.length; e++){
            newObj.imgPath = moreList[i].image[e]
          }
          newObj.text = moreList[i].sentences
          this.detailMoreList.push(newObj)
          console.log(newObj)
        }
        console.log(this.detailMoreList)

      }
    },
    clickBack(){
      wx.navigateTo({delta:1})
    }
  },
  created() {},
  mounted() {

  }
};
</script>
<style lang="less" scoped>
.detailPage{
  width: 100%;
  height: 100vh;
  .backIcon{
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    left: 10rpx;
    top: 0rpx;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .detailConts{
    margin: 4% 7%;
    overflow-y: auto;
    li{
      display: flex;
      margin-bottom: 50rpx;
      .detailPic{
        width: 45%;
        height: 75vh;
        margin-right: 7%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .detailFont{
        flex: 1;
        font-family:PingFangSC-Light,PingFang SC;
        font-weight:300;
        color:rgba(51,51,51,1);
        line-height:34rpx;
        height: 75vh;
        overflow-y: auto;
      }
      .detailFonts{
        font-family:PingFangSC-Light,PingFang SC;
        font-weight:300;
        color:rgba(51,51,51,1);
        line-height:34rpx;
        height: 75vh;
        flex: 1;
        overflow-y: auto;
      }
    }
  }
}
</style>