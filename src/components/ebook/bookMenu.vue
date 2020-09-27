<template>
<!-- 菜单 -->
    <div>
        <transition name="slide-up">
        <div class="menu-wrapper" v-if="menuVisible" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}">
            <div class="icon-wrapper">
                <span class="icon-menu" @click="showSetting(3)"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-progress" @click="showSetting(2)"></span>
            </div>
            <div class="icon-wrapper">
                <span class="icon-bright" @click="showSetting(1)"></span>
            </div>
            <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
        </div>
       </transition> 
       <setfont></setfont>
       <!-- 字体选择 -->
      <showpopu></showpopu>
      <!-- 主题选择 -->
      <setthemes></setthemes>
      <!-- 进度条 -->
      <setprogress></setprogress>
      <!-- 目录 -->
      <slidepage></slidepage>
    </div>
</template>

<script>
import setfont from './settingFont';
import showpopu from './showPopu';
import setthemes from './settingthemes';
import setprogress from './settingProgress';
import slidepage from './bookSlide';
import {vuexmin} from '../../utils/mixins';
import {mapActions} from 'vuex';
export default {
    name:'ebookmenu',
    data(){
        return{

        }
    },
    mixins:[vuexmin],
    components:{
        setfont,
       showpopu,
       setthemes,
       setprogress,
       slidepage
    },
    methods:{
        showSetting(key){
            this.setsetting(key);
          console.log(this.settingVisible);
        },
        // ...mapActions['FontVisible']
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
</style>