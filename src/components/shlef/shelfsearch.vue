<template>
  <div class="shelf-search-wrapper" :class="{'search-fixed':ifshowsearch,showshadow:ifshow}">
      <div class="shelf-search" :class="{'search-top':ifshowsearch}">
        <div class="search-wrapper">
            <!-- 搜索框 -->
            <div class="icon-search-wrapper">
                <span class="icon-search icon"></span>
            </div>
            <div class="search-input-wrapper">
                <input type="text" class="search-input"
                    :placeholder="$t('shelf.search')"
                    @click="showsearch()"
                    v-model="searchtext"
                >
            </div>
            <div class="icon-clear-wrapper" @click="cleartext()">
                <span class="icon-close-circle-fill"></span>
            </div>
        </div>
        <!-- 中英文切换 -->
      <div class="icon-locale-wrapper" v-if="!ifshowsearch" @click="switchicon()">
          <span class="icon-cn icon" v-if="lang === 'cn'"></span>
          <span class="icon-en icon" v-if="lang === 'en'"></span>
      </div>
      <div class="cancel-btn-wrapper" v-else @click="searchcancel()">
          <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
        </div>
        <transition name="hot-search-move">
            <div class="shelf-search-tab-wrapper" v-show="ifshowsearch">
                <div class="shelf-search-tab-item" v-for="item in tabs" :key="item.id" @click="tabClick(item.id)">
                <span class="shelf-search-tab-text" :class="{'is-selected':selectTab === item.id}">{{item.text}}</span>
            </div>
       
        </div>
         </transition>
  </div>
</template>

<script>
import {setLocalStorage} from '../../utils/localStorage';
import {shelfmixin} from '../../utils/mixins';
export default {
    name:'shelfsearch',
    mixins:[shelfmixin],
    data(){
        return {
            ifshowsearch:false,
            searchtext:'',
            selectTab:1,
            ifshow:false
        }
    },
    watch:{
       offsetY(v){
           if(v>0 && this.ifshowsearch){
               this.ifshow=true
           }else{
                this.ifshow=false
           }
        }
    },
    methods:{
        tabClick(id){
            this.selectTab = id
        },
        // 清空
        cleartext(){
            this.searchtext = ""
        },
        showsearch(){
            this.ifshowsearch = true;
            this.setshelfTitleVisible(false)
        },
        searchcancel(){
            this.ifshowsearch = false;
             this.setshelfTitleVisible(true)
        },
        // 切换语言按钮
        switchicon(){
            if(this.lang === 'cn'){
                this.$i18n.locale = 'en'
            }else{
                this.$i18n.locale = 'cn'
            }
            setLocalStorage('locale',this.$i18n.locale)
        }
    },
    computed:{
        lang(){
            // console.log(this.$i18n.locale);
           return this.$i18n.locale;
        },
        tabs(){
            return [
                {
                    id:1,
                    text:this.$t('shelf.default')
                },
                {
                    id:2,
                    text:this.$t('shelf.progress')
                },
                {
                    id:3,
                    text:this.$t('shelf.purchase')
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-search-wrapper{
    position: relative;
    height: px2rem(94);
    // 上面42下面52
    width: 100%;
    font-size: px2rem(16);
    background-color: #fff;
    z-index: 105;
    &.search-fixed{
        position: fixed;
        top: 0;
        left: 0;
    }
    &.showshadow{
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,0.1);
    }
    .shelf-search{
        position: absolute;
        display: flex;
        top: px2rem(42);
        width: 100%;
        height: px2reM(52);
        z-index: 105;
        transition: all 0.25s linear ;
        &.search-top{
            top: 0;
        }
        .search-wrapper{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: px2rem(8) 0 px2rem(8) px2rem(10);
            padding: px2rem(5) 0;
            border-radius: px2rem(3);
            border: px2rem(1) solid #ccc;
            .icon-search-wrapper{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                flex: 0 0 px2rem(22);
                .icon-search{
                    font-size: px2rem(12);
                }
            }
            .search-input-wrapper{
                flex: 1;
                padding: 0 px2rem(10);
                box-sizing: border-box;
                @include center;
                .search-input{
                    width: 100%;
                    font-size: px2rem(14);
                    border: none;
                    color: #333;
                &:focus{
                    outline: none;
                }
                &::-webkit-input-placeholder{
                    font-size: px2rem(12);
                    color: #ccc;
                }
                }
            }
            .icon-clear-wrapper{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex: 0 0 px2rem(24);
                .icon-close-circle-fill{
                    font-size: px2rem(14);
                    color: #ccc;
                }
            }
        }
        .icon-locale-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 px2rem(55);
            .icon-cn .icon-en{
                font-size: px2rem(22);
                color: #666;
            }
        }
        .cancel-btn-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 px2rem(55);
            .cancel-text{
                font-size: px2rem(14);
                color: #0000ff82;
            }
        }
    }
    .shelf-search-tab-wrapper{
        position: absolute;
        display: flex;
        top: px2rem(52);
        left: 0;
        height: px2rem(42);
        width: 100%;
        z-index: 105;
        .shelf-search-tab-item{
            flex: 1;
            text-align: center;
            line-height: px2rem(42);
            .shelf-search-tab-text{
                font-size: px2rem(12);
                color: #999;
               &.is-selected{
                   color: #0000ff82;
               } 
            }
        }

    }
}
</style>