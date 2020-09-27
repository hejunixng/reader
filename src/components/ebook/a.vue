<template>
    <div class="ebook-bookmark" ref="bookmark">
        <div class="ebook-bookmark-text-wrapper">
            <!-- 标签 -->
            <div class="ebook-bookmark-down-wrapper" ref="iconDown">
                <span class="icon-down"></span>
            </div>
            <div class="ebook-bookmark-text">{{text}}</div>
        </div>
        <!-- :style 一窜样式 -->
        <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? Fixedstyle: {} ">
            
                <!-- <bookmark/> -->
            <bomark :color="color"
                :height="35"
                :width="15"
            ></bomark>
        </div>
    </div>
</template>

<script>
// import Bookmark from '../common/bookmark';
import bomark from '../common/mark';
import {realPx} from '../../utils/utils';
import {vuexmin} from '../../utils/mixins';
import {savebookMark,getbookMark} from '../../utils/localStorage';
const blue = '#346cbc';
const white = '#fff';
export default {
    name:'bookmark',
    data(){
        return{
            text:'',
            color:white,
            isFixed:false,
        }
    },
    mixins:[vuexmin],
    components:{
        // Bookmark,
        bomark
    },
    // 因为数据要经过处理 再返回，在computed
    computed:{
        height(){
            return realPx(35)
        },
        // 临界值
        threshold(){
            return realPx(55)
        },
        Fixedstyle(){
            return {
                position:'fixed',
                top:0,
                right:`${(window.innerWidth - this.$refs.bookmark.clientWidth)/2}px`
            }
        }
    },
    // 监听offset的变化，操作标签
    watch:{
        offsetY(v,oldval){
            if(!this.bookAvailable || this.settingVisible>=0 || this.menuVisible){
                return}
            // if(oldval){
                if(v>= this.height && v<this.threshold){
                    this. beforth(v)
                // console.log(v);
            }else if(v>= this.threshold){
               this.afterth(v);
            }else if(v>0 && v<this.height){
                this.beforeHeight()
            }else if(v === 0){
                // 松手归位
                this.back()
            
        }
        }
            // }
           
    },
    methods:{
        removebookmark(){
            
        },
        // 存储书签
        addBookmark(){
            this.mark = getbookMark(this.fileName);
            if(!this.mark){
                this.mark = []
            }

              const currentLocation = this.currentbook.rendition.currentLocation();
            // console.log(currentLocation);
            // ！前面,把currenbook对象的cfi，start，end拼接在一起
            const cfibase = currentLocation.start.cfi.replace(/!.*/,'');
            const cfistart = currentLocation.start.cfi.replace(/.*!/,'').replace(/\)$/,'');
            // console.log(cfibase,cfistart);
            const cfiend =  currentLocation.end.cfi.replace(/.*!/,'').replace(/\)$/,'');
           const cfirange = `${cfibase}!,${cfistart},${cfiend}`;
        //   得到电子书内容
          this.currentbook.getRange(cfirange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')
          this.mark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
        },
    
        // 4
        back(){
            setTimeout(() => {
                // 回到index。vue上方
            this.$refs.bookmark.style.top = `${-this.height}px`;
            this.$refs.iconDown.style.transform = `rotate(0deg)`
            }, 200);
            if(this.isFixed){
                // 固定标签
                this.setisBookmark(true);
                this.addBookmark()
             

            }else{
                this.setisBookmark(false);
                // this.removebookmark()
            }
        },
        // 1、没超过35
       beforeHeight(){
           if(this.isBookmark){
                    this.text = this.$t('book.pulldownDeleteMark');
                    this.color = blue;
                    this.isFixed=true
                }else{
                    this.text = this.$t('book.pulldownAddMark');
                this.color = white;
                // console.log(1);
                this.isFixed = false
                } 
            


       },
    //    2、
       beforth(v){
           // 没到临界值
            //判断是否为标签页
                if(this.isBookmark){
                    this.text = this.$t('book.pulldownDeleteMark');
                    this.color = blue;
                }else{
                    this.text = this.$t('book.pulldownAddMark');
                this.color = white;
                } 

                // 做相对运动，屏幕下拉多少，标签相反方向移动，相对静止
                this.$refs.bookmark.style.top = `${-v}px`;
                
                const icon = this.$refs.iconDown;
                if(icon.style.transform === 'rotate(180deg)'){
                    icon.style.transform = 'rotate(0deg)'
                }
       },
    //    3、
       afterth(v){
        //    console.log(this.isBookmark);
             // 到达临界值
               this.$refs.bookmark.style.top = `${-v}px`;
                // 
                if(this.isBookmark){
                    this.text = this.$t('book.releaseDeleteMark');
                    this.color = blue;
                    this.isFixed = false;
                    // console.log(this.isFixed);
                }else{
        //    改变图标字体
                this.text = this.$t('book.releaseAddMark');
                this.color = blue;
                 this.isFixed = true
                }
                const icon = this.$refs.iconDown;
                if(icon.style.transform === '' || icon.style.transform === 'rotate(0deg)'){
                    icon.style.transform = 'rotate(180deg)'
                }
       }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-bookmark{
    position: absolute;
    top: px2rem(-35);
    left: 0;
    height: px2rem(35);
    width: 100%;
    z-index: 200;
    // background-color: #3333338a;
    .ebook-bookmark-text-wrapper{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        display: flex;
        .ebook-bookmark-down-wrapper{
            font-size: px2rem(14);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s linear;
            .icon-down{

            }
        }
        .ebook-bookmark-text{
            font-size: px2rem(14);
            color: white;
        }
    }
    .ebook-bookmark-icon-wrapper{
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: px2rem(15);
        
    }
}
</style>