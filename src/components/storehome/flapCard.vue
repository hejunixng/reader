<template>
    <div class="flap-card-wrapper " v-show="flapcardVicible">
        <div class="flap-card-bg" :class="{'animation': runFlapCardAnimation}" v-show="runFlapCardAnimation">
            <!-- 图片 -->
            <div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex : item.zIndex}">
                <div class="flap-card-circle">
                    <div class="flap-card-semi-circle flap-card-semi-circle-left"
                        :style="semicirclestyle(item,'left')" ref="left"></div>
                    <div class="flap-card-semi-circle flap-card-semi-circle-right"
                        :style="semicirclestyle(item,'right')"   ref="right"
                    ></div>
                </div>
            </div>
           
        </div>
        <!-- 图书推荐 -->
        <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data ? data.cover : ''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
        <div class="close-btn-wrapper" @click="close">
            <span class="icon-close"></span>
        </div>
    </div>
</template>

<script>
import {homemixin} from '../../utils/mixins';
import {flapCardList,categoryText} from '../../utils/store';

export default {
    name:'flapcard',
    mixins:[homemixin],
    props:{
        data:Object
    },
    data(){
        return{
            flapCardList,
            front:0,
            back:1,
            pointList:null,
            runFlapCardAnimation:false,
            runBookCardAnimation:false,//图书推荐
        }
    },
    watch:{
        flapcardVicible(v){
            if(v){
                // console.log(v);
            //   动画开始
                this.runAnimation();
            }
        }
    },
    methods:{
        // 关闭
        close(){
            
            this.stopAnamimation();
            this.setflapcardVicible(false)
        },
        // 
        semicirclestyle(item,dir){
            return{
                backgroundColor:`rgba(${item.r},${item.g},${item.b})`,
                backgroundSize:item.backgroundSize,
                backgroundImage: dir === 'left' ? item.imgLeft :item.imgRight
            }
        },
        // 翻转
        rotate(index, type) {
            const item = this.flapCardList[index]
            let dom
            // 判断左右
            if (type === 'front') {
            dom = this.$refs.right[index]
            } else {
            dom = this.$refs.left[index]
            }
            // 翻转
            dom.style.transform = `rotateY(${item.rotateDegree}deg)`
            dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
        cardrotate(){
            
                // 不断修改角度和颜色
              const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree += 10
        frontFlapCard._g -= 5
        backFlapCard.rotateDegree -= 10
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
        },
         next() {
            //  复位，下一张图片
                const frontFlapCard = this.flapCardList[this.front]
                const backFlapCard = this.flapCardList[this.back]
                frontFlapCard.rotateDegree = 0
                backFlapCard.rotateDegree = 0
                frontFlapCard._g = frontFlapCard.g
                backFlapCard._g = backFlapCard.g
                this.rotate(this.front, 'front')
                this.rotate(this.back, 'back')
                this.front++
                this.back++
                const len = this.flapCardList.length
                if (this.front >= len) {
                this.front = 0
                }
                if (this.back >= len) {
                this.back = 0
        }
        // 动态设置zIndex
        // 100 -> 96
        // 99 -> 100
        // 98 -> 99
        // 97 -> 98
        // 96 -> 97
        // (0 - 1 + 5) % 5 = 4
        // (1 - 1 + 5) % 5 = 0
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        this.prepare()
      },
    //   把背面的图片旋转到 和前面的贴在一起
        prepare() {
        const backFlapCard = this.flapCardList[this.back]
        // console.log(backFlapCard);
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 9
        this.rotate(this.back, 'back')
      },
    //   
      reset() {
        //   回到最开始位置
        this.front = 0
        this.back = 1
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index
          item._g = item.g
          item.rotateDegree = 0
          this.rotate(index, 'front')
          this.rotate(index, 'back')
        })
        this.runFlapCardAnimation = false;
        // console.log( this.runFlapCardAnimation);
        this.runBookCardAnimation = false;
        
      },
      stopAnamimation(){
      
          if(this.task){
              clearInterval(this.task); 
          };
          if(this.timeout){
              clearTimeout(this.timeout)
          }
          if(this.timeout2){
              clearTimeout(this.timeout2)
          }
        //   重置
          this.reset();
      },
        startAnimation(){
            // 第一张图片的背面翻转180
           this.prepare()
            // 图片翻转
           this.task=setInterval(() => {
                this.cardrotate()
            },15);
            // 数据请求完毕后，隐藏
            setTimeout(()=>{
                // 停止动画
              this.close()
            },2500)
        },

        runAnimation(){
            // 设置anmiantion动画
            this.runFlapCardAnimation  =true;
            this.timeout = setTimeout(() => {
                  // 开启动画
                this.startAnimation();
            }, 400);
            this.timeout2 = setTimeout(()=>{
                  //   停止动画
            this.runFlapCardAnimation = false;
                this.stopAnamimation()
                this.runBookCardAnimation = true;
                this.close()
            },2500)
        },
        // 图书推荐
        categoryText(){
            if(this.data){
                categoryText(this.data.category,this)
            }else{
              return ''
            }
            
        }
    },
    mounted(){
        // console.log(this.data);
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';

.flap-card-wrapper{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 1000;
background-color: rgba(0, 0,0,0.1);
@include center;
    .flap-card-bg{
        position: relative;
        width: px2rem(64);
        height: px2rem(64);
        border-radius: px2rem(5);
        background: white;
        transform: scale(0);
        opacity: 0;
        &.animation{
            // 使得动画停留在100%
            animation:card-move 0.4s ease-in both ;
        }
        @keyframes card-move{
            0%{
                transform: scale(0);
                opacity: 0;
            }
            50%{
                transform: scale(1.2);
                opacity: 1;
            }
            75%{
                 transform: scale(0.9);
                opacity: 1;
            }
            100%{
                transform: scale(1);
                opacity: 1;
            }
        }
        .flap-card{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: px2rem(48);
            height: px2rem(48);
            
            .flap-card-circle{
                display: flex;
                width: 100%;
                height: 100%;
                
                .flap-card-semi-circle {
                    flex: 0 0 50%;
                    background-repeat: no-repeat;
                    height: 100%;
                    // 转动到背面隐藏
                    backface-visibility: hidden;
                }
                .flap-card-semi-circle-left{
                    // 圆形
                    border-radius: px2rem(24) 0 0 px2rem(24);
                    // 位置
                    background-position: center right;
                    transform-origin: right ;
                }
                .flap-card-semi-circle-right{
                    border-radius: 0 px2rem(24) px2rem(24) 0;
                    background-position: center left;
                    transform-origin: left;
                }
            }
        }
       
    }
    .book-card{
         position: relative;
      width: 65%;
      max-width: px2rem(400);
      box-sizing: border-box;
      border-radius: px2rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: px2rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: px2rem(20);
          @include center;
          .img {
            width: px2rem(90);
            height: px2rem(130);
          }
        }
        .content-wrapper {
          padding: 0 px2rem(20);
          margin-top: px2rem(20);
          .content-title {
            color: #333;
            font-weight: bold;
            font-size: px2rem(18);
            line-height: px2rem(20);
            max-height: px2rem(40);
            text-align: center;
            @include ellipsis2(2)
          }
          .content-author {
            margin-top: px2rem(10);
            text-align: center;
          }
          .content-category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          box-sizing: border-box;
          border-radius: 0 0 px2rem(15) px2rem(15);
          padding: px2rem(10) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background: blue;
        }
      }
    }
    .close-btn-wrapper{
        position: absolute;
        left: 0;
        width: 100%;
        bottom: px2rem(30);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;  
        .icon-close{
            width: px2rem(45);
            height: px2rem(45);
            font-size: px2rem(25) ;
            border-radius: 50%;
            background: #333;
            color: white;
            @include center;
        } 
    }
}

</style>