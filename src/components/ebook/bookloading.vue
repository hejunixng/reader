<template>
    <div class="ebook-loading">
        <div class="ebook-loading-wrapper">
            <!-- 分成左右两边 -->
            <div class="ebook-loading-item" v-for="(item,index) in data" :key="index">
                <div class="ebook-loading-line-wrapper" v-for="(subItem,subIndex) in item" :key="subIndex">
                    <div class="ebook-loading-line" ref="line"></div>
                    <div class="ebook-loading-mask" ref="mask"></div>
                </div>
            </div>
    <!-- 中间线 -->
            <div class="ebook-loading-center"></div>
        </div>
    </div>
</template>

<script>
import {px2rem} from '../../utils/utils';
export default {
    name:'bookloading',
    data(){
        return{
            data:[
                    // 用二位数组生成左右两边横条
                    [{},{},{}],
                    [{},{},{}]
                ],
                maskWidth:[
                    {value:0},
                    {value:0},
                    {value:0},
                    {value:0},
                    {value:0},
                    {value:0}
                ],
                lineWidth:[
                     {value:16},
                     {value:16},
                     {value:16},
                     {value:16},
                     {value:16},
                     {value:16}
                ],
                add:true,
                end:false

        }
        
        
    },
    mounted(){

            
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index]
          const line = this.$refs.line[index]
          let maskWidth = this.maskWidth[index]
          let lineWidth = this.lineWidth[index]
          if (index === 0) {
            //   第一个
            if (this.add && maskWidth.value < 16) {
              maskWidth.value++
              lineWidth.value--
            } else if (!this.add && lineWidth.value < 16) {
              maskWidth.value--
              lineWidth.value++
            }
          } else {
            //   其余
            if (this.add && maskWidth.value < 16) {
              let preMaskWidth = this.maskWidth[index - 1]
              if (preMaskWidth.value >= 8) {
                maskWidth.value++
                lineWidth.value--
              }
            } else if (!this.add && lineWidth.value < 16) {
              let preLineWidth = this.lineWidth[index - 1]
              if (preLineWidth.value >= 8) {
                maskWidth.value--
                lineWidth.value++
              }
            }
          }
         
          mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
          
          line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
        //   最后一条
          if (index === this.maskWidth.length - 1) {
            if (this.add) {
              if (maskWidth.value === 16) {
                this.end = true
              }
            } else {
              if (maskWidth.value === 0) {
                this.end = true
              }
            }
          }
        //   增加变减少，
          if (this.end) {
            this.add = !this.add
            this.end = false
          }
        })
      }, 20)
    }
    
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-loading{
    position: relative;
    z-index: 400;
    width: px2rem(63);
    height: px2rem(40);
    background:transparent;
    border: px2rem(1.5) solid #b4b2b2;
    border-radius: px2rem(3);
    .ebook-loading-wrapper{
        display: flex;
        width: 100%;
        height: 100%;
       
        .ebook-loading-item{
            // 左右
            flex: 1;
            display: flex;
            flex-direction: column;
                padding: px2rem(7) 0 ;
            box-sizing: border-box;
            // background-color: orange;
            
            .ebook-loading-line-wrapper{
               flex: 1;
               display: flex;
               align-items: center;
               justify-content: flex-start;
                padding:0 px2rem(7);
                box-sizing: border-box;
                
                .ebook-loading-line{
                    flex: 0 0 px2rem(16);
                    width: px2rem(16);
                    height: px2rem(2);
                     background-color: #b4b2b2;

                }
                // 改变mask宽度达到动画效果
                .ebook-loading-mask{
                    flex: 0 0 0;
                    width: 0;
                    height: ox2rm(2);
                }
            }
        }
        .ebook-loading-center{
            position: absolute;
            top: 0;
            left: 50%;
            width: px2rem(1.5);
            height: 100%;
            background-color: #b4b2b2;
        }
    }
}
</style>