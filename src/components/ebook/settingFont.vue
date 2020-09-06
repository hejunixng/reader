<template>
    <transition name="slide-up" >
      <!-- 菜单栏显示 并且 点击了 字体设置 -->
    <div class="setting-wrapper" v-show="menuVisible && settingVisible ==0">
      <div class="setting-font-size">
        <div class="preview" ref="left" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">
          <span  ref="leftText" >A</span>
        </div>
        <div class="select">
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
          @click="setFontSize(item.fontSize)"
                ref="item">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize" >
                <div class="small-point" ></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" ref="right">
          <span  ref="rightText">A</span>
        </div>
      </div>
      <div class="seting-font-family" @click="fontVisible()">
          <div class="text-wrapper">
              <span class="text">
                  {{dedauleFamily}}
              </span>
          </div>
          <div class="text-icon">
              <span class="icon-forward"></span>
          </div>
      </div>
    
      </div>
    </transition>
</template>

<script>

import {FontSize} from '../../utils/fonSize';
import {vuexmin} from '../../utils/mixins';
import {saveFontSize} from '../../utils/localStorage';
export default {
    name:'setFont',
    data(){
        return{
          fontSizeList:FontSize,
           
        }
    },
    components:{
         
    },
    mixins:[vuexmin],
    methods:{
      setFontSize(fontSize){
        //   修改默认defaultFonstsize 就可以改变圆圈
        this.defauleSize(fontSize);
      saveFontSize(this.fileName,fontSize)
        // 改变字体大小
        this.currentbook.rendition.themes.fontSize(fontSize+'px');
      },
    //  弹出修改字体框
        fontVisible(){
           this.setingFontVisible(true)
        }
    },
   mounted(){
        
   }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';

 .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-font-size {
      display: flex;
      flex: 2;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    // 字体
   .seting-font-family{
       flex: 1;
       font-size: px2rem(14);
       display: flex;
       justify-content: center;
       align-items: center;
       .text{
           padding-right: px2rem(5);
       }
   }
  }
</style>