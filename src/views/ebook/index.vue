<template>

    <div class="ebook" ref="ebook">
        <!-- 页眉 -->
        <ebookheader></ebookheader>
        <!-- 定都组件 -->
       <ebooktitle></ebooktitle>
        <!-- <ebook></ebook> -->
        <router-view></router-view>
        <ebookmenu/>
        <ebook-bookmark/>
        <!-- 页脚 -->
        <bookfooter></bookfooter>
    </div>
</template>

<script>
// import ebook from '@/components/ebook/bookreader';
import ebooktitle from '@/components/ebook/bookTitle';
import ebookmenu from '@/components/ebook/bookMenu';
// import ebookBookmark from '@/components/ebook/bookmark';
import EbookBookmark from '../../components/ebook/bookmark';
import ebookheader from '../../components/ebook/bookheader';
import bookfooter from '../../components/ebook/bookfooter';
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
        ebookmenu,
        EbookBookmark,
        ebookheader,
        bookfooter
    },
    // 监听offsetY的变化，移动index。vue
    watch:{
        offsetY:function(v){
           if(!this.menuVisible && this.bookAvailable){
                if(v >0){
                            this.move(v)
                        }else if(v === 0){
                            this.stor();
                        }
           }
          
        }
    },
    methods:{
        stor(){
            this.$refs.ebook.style.top = 0;
            // 每次放手归0，都有一个transition
            this.$refs.ebook.style.transition = 'all 0.2s linear';
            setTimeout(() => {
                this.$refs.ebook.style.transition=''
            }, 200);
        },
        move(v){
              this.$refs.ebook.style.top = v + 'px';
        },
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
.ebook{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>