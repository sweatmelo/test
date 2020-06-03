<template>
    <div v-if="audioListVisible" >
        <div class="audioList" v-for="(item,index) in audioList" :key="index">
             <audio :src="item.audioSrc" :author="item.audioSinger" :name="item.audioname" id="myAudio" :poster="item.audiopic" ></audio>
        </div>
            
    </div> 
</template>

<script>
export default {
    props:[
        'audioList'
    ]
    
}
</script>

<style lang="less">
    .audioList{
        position: absolute;
        margin-top: 65rpx;

    }
</style>