<template>
<transition name="fade">
  <div class="shelf-title" v-show="shelfTitleVisible" :class="{showshadow:ifshow}">
      <div class="shelf-title-text-wrapper">
          <span class="shelf-title-text">{{title}}</span>
          <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
     
      <div class="shelf-title-btn-wrapper shelf-title-left" @click="clear()" v-if="!ifshowback">
          <span class="shelf-title-btn-text ">{{$t('shelf.clearCache')}}</span>
           
      </div>
      <div class="shelf-title-btn-wrapper shelf-icon" @click="back()" v-if="ifshowback">
          <span class="icon-back "></span>
           
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right" @click="onEdit()">
          <span class="shelf-title-btn-text">{{isEditMode ? $t('shelf.cancel') :$t('shelf.edit')}}</span>
      </div>
  </div>
  </transition>
</template>

<script>
import {shelfmixin} from '../../utils/mixins';
import {clearLocalStoage} from '../../utils/localStorage';
import {clearLocalForage} from '../../utils/localForage';
export default {
    name:'shelftitle',
    mixins:[shelfmixin],
    props:{
        ifshowback:{
            type:Boolean,
            default:false
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            ifshow:false
        }
    },
    watch:{
        offsetY(v){
           if(v>0){
               this.ifshow=true
           }else{
                this.ifshow=false
           }
        }
    },
    computed:{
        selectedText(){
            // 根据是否选中书籍 更改文字
            const selectNumber = this.shelfSelected?this.shelfSelected.length:0;//防止出现null
            return selectNumber <= 0? this.$t('shelf.selectBook'):(selectNumber === 1? this.$t('shelf.haveSelectedBook').replace(
                    '$1',selectNumber ):this.$t('shelf.haveSelectedBooks').replace('$1',selectNumber))
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
            this.setisEditMode(false)
        },
        onEdit(){
            if(!this.isEditMode){
                // 点击取消时，把shelflist清空，不选择
                this.setshelfSelected([]);
                this.shelfList.forEach(item =>{
                    item.selected = false;
                    // console.log(item);
                    // 关闭编辑模式 不选择
                    if(item.itemList){
                        item.itemList.forEach(subitem =>{
                            subitem.selected = false    
                        })
                    }
                })
            }
            // 每次点击取反，原本是false，取反true
            this.setisEditMode(!this.isEditMode);
        },
        clear(){
           clearLocalForage();
           clearLocalStoage();
           this.setshelfSelected([]);
           this.setShelfList([]);
           this.getShelfList();
           this.simpleToast(this.$t('shelf.clearCacheSuccess'))
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-title{
    position: relative;
    width: 100%;
    height: px2rem(42);
    background-color: #fff;
    z-index: 130;
    &.showshadow{
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,0.1);
    }
    .shelf-title-text-wrapper{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(42);
        
        .shelf-title-text{
            font-size: px2rem(16);
            line-height: px2rem(10);
            font-weight: bold;
            color: #333;
            margin-bottom: px2rem(5);
        }
        .shelf-title-sub-text{
            font-size: px2rem(10);
            color: #333;
        }
    }
    
    .shelf-title-btn-wrapper{
        position: absolute;
        top: 0;
        height: 100%;
        box-sizing: border-box;
       &.shelf-icon{
           @include center;
           font-size: px2rem(20);
       }
    
        .shelf-title-btn-text{
            font-size: px2rem(14);
            color: #666;
        }
        &.shelf-title-left{
            left: 0;
            padding-left: px2rem(15);
        }
        &.shelf-title-right{
            right: 0;
            padding-right: px2rem(15);
        }
    }
}
</style>