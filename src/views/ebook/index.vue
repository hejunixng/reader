<template>

    <div class="ibook">
       <ebooktitle></ebooktitle>
        <!-- <ebook></ebook> -->
        <router-view></router-view>
        <ebookmenu/>
    </div>
</template>

<script>
// import ebook from '@/components/ebook/bookreader';
import ebooktitle from '@/components/ebook/bookTitle';
import ebookmenu from '@/components/ebook/bookMenu';
import {saveReadTime,getReadTime} from '../../utils/localStorage';
import {vuexmin} from '../../utils/mixins';
export default {
    name:'index',
    mixins:[vuexmin],
    data(){
        return{

        }
    },
    components:{
        // ebook,
        ebooktitle,
        ebookmenu
    },
    methods:{
        startTime(){
            let readTime = getReadTime(this.fileName);
            if(!readTime){
                readTime = 0;
            }
            this.task = setInterval(() => {
                readTime++;
               if(readTime %30 ===0){
                //   没半分钟计算一次
                    saveReadTime(this.fileName,readTime) 
               }
            }, 1000);
        }
    },
    mounted(){
        this.startTime();
    },
    // 销毁计时器
    beforeDestroy(){
        if(this.task){
            clearInterval(this.task)
        }
    }
    
}
</script>

<style lang='scss' scoped>

</style>