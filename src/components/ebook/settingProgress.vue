<template>
    <transition name="slide-up">
        <div class="setting-wrapper" v-show="menuVisible && settingVisible == 2 ">
            <div class="setting-progress">
                <div class="read-time-wrapper">
                    <span class="read-time-text">{{readTime()}}</span>
                    <div class="icon-forward"></div>
                </div>
                <div class="progress-wrapper">
                    <div class="progress-icon-wrapper" @click="prevSection()">
                        <span class="icon-back" ></span>
                    </div>
                    <input class="progress" type="range"
                     max="100" min="0" step="1"
                     @change="onProgressChange($event.target.value)"
                     @input="onProgressInput($event.target.value)"
                     :value="progress"
                     :disabled='!bookAvailable'
                     ref='progress'
                     >
                    <div class="progress-icon-wrapper">
                        <span class="icon-forward" @click="nextSection()"></span>
                    </div>
                </div>
                
                <div class="text-wrapper">
                    <span class="progress-section-text">{{bookAvailable?getSectionName:''}}</span>
                    <span>{{bookAvailable? progress  : '加载中...'}}%</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {vuexmin} from '../../utils/mixins';
import {getReadTime} from '../../utils/localStorage';
export default {
    name:'settingProgress',
    mixins:[vuexmin],
    data(){
        return{
         
        }
    },
    computed:{
        // 电子书标题
        getSectionName(){
            // get只能获取以及目录
            // if(this.section){
            //     const sectionObj = this.currentbook.section(this.section);
            //     if(sectionObj && sectionObj.href && this.currentbook.navigation){
            //         return this.currentbook.navigation.get(sectionObj.href).label
            //     }
            // }
            // 直接用一维数组显示
            return this.section ? this.navigation[this.section].label :''
        }
    },
    methods:{
        // 点击之后
        onProgressChange(progress){
            // vuex 之后，再显示
            this.setProgress(progress).then(()=>{
                this.displayProgress();
                this.updateProgress();

            })
        },
        // 点击中
        onProgressInput(progress){
             this.setProgress(progress)
        }, 
        // 根据进度显示电子书内容
        displayProgress(){
            const cfi = this.currentbook.locations.cfiFromPercentage(this.progress/100)
            // console.log(cfi,this.progress);

            this.display(cfi)
        },
        updateProgress(){
            // console.log(this.progress);
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
        },
        // 上一章节
        prevSection(){
            // 判断章节是否大于0并且分页完成
            if(this.section >0 && this.bookAvailable){
                // vuex
                this.setsection(this.section - 1).then(()=>{
                    this.displaySection()
                })
            }
        },
        displaySection(){
            // 异步渲染电子书
                    const sectionObj = this.currentbook.section(this.section);
                    //  console.log(sectionObj);
                    if(sectionObj && sectionObj.href){
                       
                        this.display(sectionObj.href)
                    }
        },
        nextSection(){
            // 当前章节少于 总章节数
            if(this.section < this.currentbook.spine.length - 1 && this.bookAvailable){
                // vuex
                this.setsection(this.section + 1).then(()=>{
                   this.displaySection()
                })
            }
        },

    },
    updated(){
        // 刷新 初始化
        this.updateProgress()
    },
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);
        //  background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        padding: 0 px2rem(20);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }

</style>