<template>
<!-- 主页搜索 -->
<div>
  <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow': !shadowVisible}">
      <transition name='title-move'>
            <div class="search-bar-title-wrapper" v-show="titleVisible">
                
                <div class="title-text-wrapper">
                    <span class="title-text title">{{$t('home.title')}}</span>
                </div>
                <!-- 摇一摇 -->
                <div class="title-icon-shake-wrapper">
                    <span class="icon-shake icon"></span>
                </div>
            </div>
            
        </transition>
        <!-- 返回按钮 -->
                <div class="title-icon-back-wrapper" 
                :class="{'hide-title': !titleVisible}"
                    @click="back"
                >
                    <span class="icon-back icon"></span>
                </div>
      <!-- 搜索框 -->
    <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title':!titleVisible}"></div>
        <div class="search-bar-input">
            <span class="icon-search icon"></span>
            <input type="text" class="input"
                :placeholder="$t('home.hint')"
                v-model="searchtext"
                @click="showsearch"
            >
        </div>
    </div>
  </div>
  <searchlist v-show="searchVisible" ref="searchlist"></searchlist>
  </div>
</template>

<script>
// 接受offsety变偏移
import {homemixin} from '../../utils/mixins';
import searchlist from './searchList';
export default {
    name:'searchbar',
    mixins:[homemixin],
    data(){
        return{
            searchtext:'',
            titleVisible:true,
            shadowVisible:false,
            searchVisible:false,//热门搜索
        }
    },
    components:{
        searchlist
    },
    watch:{
        // 页面滚动 隐藏标题栏
        offsetY(offsetY){
            // console.log(offsetY);
            if(offsetY>0){
                // 隐藏标题栏
                this.hidtitle();
                this.showshadowVisible()
            }else{
                this.showtitle();
                this.hideshadowVisible()
            }
        },
        hotsearchoffsety(offsety){
            if(offsety >0){
                this.showshadowVisible()
            }else{
                this.hideshadowVisible()
            }
        }

    },
    methods:{
        back(){
            // 返回按钮
            if(this.offsetY >0){
                 this.showshadowVisible()
            }else{
                this.hideshadowVisible()
            }

            this.hidesearch();
           
        },
        // 点击搜索框，显示热门搜索
        showsearch(){
            this.hidtitle();
            this.searchVisible = true;
            this.hideshadowVisible();
           this.$nextTick(()=>{
                // 返回顶部
            this.$refs.searchlist.reset()
           })
        },
        hidesearch(){
            this.searchVisible = false;
            if(this.offsetY >0){
                // 点击返回按钮，如果是有滑动，标题栏不显示
                this.hidtitle();
                this.showshadowVisible()
            }else{
                this.showtitle();
                this.hideshadowVisible()
            }
        },
        // 菜单栏显示隐藏
        hidtitle(){
            this.titleVisible = false
        },
        showtitle(){
            this.titleVisible = true
        },
        showshadowVisible(){
            this.shadowVisible = true
        },
        hideshadowVisible(){
            this.shadowVisible = false
        }
    }

}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';

  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    height: px2rem(94);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-title {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center;
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
    }
    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      z-index: 200;
      height: px2rem(42);
      transition: height 0.2s linear;
      @include center;
      &.hide-title {
          //增加高度
        height: px2rem(52);
      }
    }
    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: px2rem(42);
      display: flex;
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top 0.2s linear;
      &.hide-title {
        top: 0;
      }
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all  0.2s linear;
        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }
      .search-bar-input {
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: px2rem(20);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>