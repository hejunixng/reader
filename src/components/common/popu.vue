<template>
  <div class="popup" v-if="popupVisible">
  <transition name="fade">
    <div class="popup-bg" @click.stop.prevent="hide" v-show="popupVisible"></div>
  </transition>
  <transition name="popup-slide-up">
    <div class="popup-wrapper" v-show="visible">
      <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
      <div class="popup-btn"
           :class="{'danger' :item.type==='danger'}"
           v-for="(item, index) in btn"
           :key="index"
           @click="item.click">{{item.text}}
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
    name:'popup',
    props:{
        title:String,
        btn:Array
    },
    data(){
        return {
             popupVisible: false,
        visible: false
        }
    },
    methods:{
        show() {
            // 要有前后顺序，（可能是因为有两个transition
        this.popupVisible = true
        setTimeout(() => {
          this.visible = true
        })
      },
      hide() {
        this.visible = false
        setTimeout(() => {
          this.popupVisible = false
        }, 200)
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.popup{
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    
    @keyframes anim {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes hide {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .popup-bg{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
     &.howAni{
        animation: anim 0.2s ease-in ;
    }
    
    &.hideAni{
        animation: hide 0.2s ease-in ;
    }
    }
    .popup-wrapper{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        z-index: 2000;
        .popup-title{
            @include center;
            width: 100%;
            height: px2rem(44);
            font-size: px2rem(12);
            padding: px2rem(15);
            color: #999;
            box-sizing: border-box;
            border-bottom: px2rem(1) solid #eee;
        }
        .popup-btn{
            width: 100%;
            height: px2rem(60);
            font-size: px2rem(16);
            color: #666;
            font-weight: bold;
            line-height: px2rem(60);
            text-align: center;
            border-bottom: px2rem(1) solid #eee;
            &.danger{
                color: deeppink;
            }
        }
    }
}
</style>