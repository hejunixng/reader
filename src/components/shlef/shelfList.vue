<template>
<!-- 书架 -->
<div class="shelf-list" :style="{'shel-top':sheltop}">
<transition-group name="list" tag="div" id="shelf-list">
  <!-- 为下面循环的每一个item都有过度动画 tag 以div的形式存在 -->
  
     <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelfitem :data="item" :style="{height:itemHeight}"></shelfitem>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
     </div>
  
  </transition-group>
  </div>
</template>

<script>
import shelfitem from './shelfitem';
import {shelfmixin} from '../../utils/mixins'; 
import {px2rem, realPx} from '../../utils/utils';
export default {
  name:'shelflist',
  mixins:[shelfmixin],
  props:{
    top:{
      type:Number,
      default:94
    },
    data:{
      type:Array
    }
  },
  components:{
    shelfitem
  },
  computed:{
    sheltop(){
      return px2rem(this.top) + 'rem'
    },
    itemHeight(){
      // 图片宽高比列
      // w / 250 = h / 350  w/h = 350/250
      // h = w/250*350
      return ((window.innerWidth - realPx(120) ) / 3) /250*350 + 'px'
    }
  },
 

}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-list{
    position: absolute;
    // top: px2rem(94);
    left: 0;
    width: 100%;

    z-index: 100;
    
    #shelf-list{
      display: flex;
      width: 100%;
          flex-wrap:wrap;
          padding: 0 px2rem(15);
          box-sizing: border-box;
    }
    .shelf-list-item-wrapper{
      flex: 0 0 33.33%;
      padding: px2rem(15);
      box-sizing: border-box;
      // 每一个item
      &.list-leave-active{
      // 要先设置为隐藏
        display: none;
      }
      &.list-move{
        transition:  transform 0.5s;
      }
      .shelf-list-title-wrapper{
        margin-top: px2rem(7) ;
      }
    }
}
</style>