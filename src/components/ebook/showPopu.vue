<template>
<!-- 字体设置 -->
<transition name='popup-slide-up'>
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
        <div class="ebook-popup-title" @click="hide">
            <div class="ebook-popup-title-icon">
                <span class="icon-down2"></span>
            </div>
            <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
        </div>
        <div class="ebook-popup-list-wrapper">
            <div class="ebook-popup-item" v-for="(item,index) in family" :key=index 
                @click="setfamily(item.font)"
            >
                <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
                <div class="ebook-popup-item-check">
                    <span class="icon-check" v-show="isSelected(item)"></span>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import {vuexmin} from '@/utils/mixins';
import {fontFamily} from '@/utils/fonSize';
import {saveFontFaminly} from '@/utils/localStorage';
import {setLocalStorage,getLocalStroage,removelocalStorage,clearLocalStoage} from '@/utils/localStorage';
export default {
    name:'showpopu',
    mixins:[vuexmin],
    data(){
        return{
            family:fontFamily
        }
    },
    methods:{
        // 字体是否选中
        isSelected(item){
            // console.log(this.dedauleFamily);
            return this.dedauleFamily === item.font
        },
        // 设置选中字体,并更换
        setfamily(font){
            this.settingFamily(font);
            // 缓存字体
            saveFontFaminly(this.fileName,font)
            if(font == 'Default'){
                this.currentbook.rendition.themes.font('Times New Roman')
            }else{
                this.currentbook.rendition.themes.font(font)
            }
            

        },
        // 选择框影藏
        hide(){
            this.setingFontVisible(false)
        }
    },
    mounted(){
 
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';

  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
    .ebook-popup-title {
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8b9bb;
      text-align: center;
      @include center;
      .ebook-popup-title-icon {
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(16);
        font-weight: bold;
        @include center;
      }
      .ebook-popup-title-text {
        font-size: px2rem(14);
        font-weight: bold;
      }
    }
    .ebook-popup-list-wrapper {
      .ebook-popup-item {
        display: flex;
        padding: px2rem(15);
        .ebook-popup-item-text {
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popup-item-check {
          flex: 1;
          text-align: right;
          font-size: px2rem(14);
          font-weight: bold;
          color: #346cb9;
        }
      }
    }
  }
</style>