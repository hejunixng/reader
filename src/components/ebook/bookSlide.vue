<template>
    <transition name="fade">
        
        <!-- 目录 -->
        <div class="slide-content-warpper" v-show="menuVisible && settingVisible == 3">
           <transition name="slide-right">
                <div class="content" v-if="settingVisible == 3">
                <!-- 左侧 动态组件 -->
                <div class="content-page-wrapper" v-if="bookAvailable">
                    <div class="content-page">
                        <component :is="currentTab == 1? content : bookmark"></component>
                    </div>
                    <!-- 下方菜单栏 -->
                    <div class="content-page-tab">
                        <div class="content-page-tab-item"
                            :class="{'selected':currentTab ==1 }"
                            @click="changeTab(1)"
                        >{{$t('book.navigation')}}</div>
                        <div class="content-page-tab-item"
                            :class="{'selected':currentTab == 2 }"
                             @click="changeTab(2)"
                        >{{$t('book.bookmark')}}</div>
                    </div>
                </div>
                <div class="content-empty" v-else>
                    <booloading></booloading>
                </div>
            </div>
            </transition>
            <div class="content-bg" @click="hideTitle()"></div>
           
        
    </div>
    </transition>
</template>

<script>
import slidebookmark from './bookSlidemark';
import slidecontent from './bookSlideContent';
import booloading from './bookloading';
import {vuexmin} from '../../utils/mixins';
export default {
    name:'slide',
    mixins:[vuexmin],
    data(){
        return{
            currentTab:1,
            content:slidecontent,
            bookmark:slidebookmark

        }
    },
    components:{
        booloading
    },
    methods:{
        changeTab(tab){
            this.currentTab = tab
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
  .fade-slide-right-enter, .fade-slide-right-leave-to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
.slide-content-warpper{
    position: absolute;
    left: 0;
    top: 0;
     display: flex;
    width: 100%;
    height: 100%;
    z-index: 300;
    .content{
       flex: 0 0 85%;
       width: 85%;
       height: 100%;
        .content-page-wrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .content-page{
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab{
                display: flex;
                flex: 0 0 px2rem(48);
                width: 100%;
                height: px2rem(48);
               .content-page-tab-item{
                   flex:1;
                   line-height: px2rem(48);
                   text-align: center;
                   font-size: px2rem(12);
               }
            }
        }
        .content-empty{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .content-bg{
        flex: 0 0 15%;
        width: 15%;
        height: 100%;
        background: rgba(0,0,0,0.1);
    }
}
</style>