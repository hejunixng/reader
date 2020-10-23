<template>
    <div class="ebook-slide-contents">
        <div class="slide-contents-search-wrapper">
            <div class="slide-contents-search-input-wrapper">
                <div class="slide-contens-search-icon">
                    <span class="icon-search"></span>
                </div>
                <input type="text" class="slide-contens-search-input"
                    :placeholder="$t('book.searchHint')"
                    @click="showdel()"
                    v-model="searchText"
                    @keyup.enter.exact="search()"
                >
               
            </div>
             <div class="slide-contens-search-cancel" 
                v-if="showcancel"
                @click="hidecandel()"
             >{{$t('book.cancel')}}</div>
        </div>
        <!-- 图书讯息 -->
        <div class="slide-contens-book-wrapper" v-show="!showcancel">
            <div class="slide-contens-book-img-wrapper">
                <img :src="cover" alt="" class="slide-contens-book-img">
            </div>
            <div class="slide-contens-book-info-wrapper">
                <div class="slide-contents-book-title">
                    <span class="slide-contents-book-title">{{metadata.title}}</span>
                </div>
                <div class="slide-contents-book-author">{{metadata.creator}}</div>
            </div>
            <div class="slide-contents-book-progress-wrapper">
                <div class="slide-contents-book-progress">
                    <span class="progress">{{progress + '%'}}</span>
                    <span class="progress-text">{{$t('book.haveRead2')}}</span>
                </div>
                <div class="slide-contents-bookt-time">
                    {{readTime()}}
                </div>
            </div>
        </div>
    <!-- 书签内容 -->
    <Scroll 
        class="slide-contents-list"
        :top="156"
        :bottom="48"
        ref="scroll"
        v-show="!showcancel"
    >
    <div class="slide-contens-item" v-for="(item,index) in navigation" :key="index">
        <span class="slide-contens-item-label" 
        :class="{'selected':section == index}" 
        :style="contentItem(item)"
        @click="displayNav(item.href)"
        >{{item.label}}</span>
        <span class="slide-contens-item-page" ></span>
    </div>
    </Scroll>

    <!-- 搜索框结果 -->
    <Scroll 
        class="slide-search-list"
        :top='66'
        :bottom='48'
        v-show="showcancel"
    >
        <div class="slide-search-item" v-for="(item,index) in searchList" :key="index" 
        v-html="item.excerpt"
         @click="displayNav(item.cfi,true)"
        >
           
        </div>
    </Scroll>
    </div>
</template>

<script>
import {vuexmin} from '../../utils/mixins';
import Scroll from '../common/scroll';
import {px2rem} from '../../utils/utils';
export default {
    name:'slidecontent',
    components:{
        Scroll
    },
    data(){
        return{
            showcancel:false,
            searchList:[],//全文搜索结果
            searchText:'',//搜索文本
        }
    },
    mixins:[vuexmin],
    methods:{
        // 搜索框
        search(){
            //搜索
            if(this.searchText && this.searchText.length>0){
                // console.log(this.searchText);
                this.doSearch(this.searchText).then(result=>{
                // 赋值
                this.searchList = result;
                this.searchList.map(item => {
                    // 选中的文字加个标签
              item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
              return item
            })
                 })
            }
        },
        // 点击目录跳转
        displayNav(tar,highlight=false){
            this.display(tar,()=>{
                this.hideTitle();
                if(highlight){
                    // console.log(tar);
                    // 书籍内容高亮
                    this.currentbook.rendition.annotations.highlight(tar)
                }
            })
        },
        // 二级目录缩进
        contentItem(item){
           return {
               marginLeft:`${px2rem(item.level * 15)}rem`
           }
        },
        showdel(){
            this.showcancel = true
        },
        hidecandel(){
            this.showcancel = false;
            this.searchList = [];
            this.searchText =''
        },
        // 全文搜索算法
        doSearch(q) {
        return Promise.all(
            // 查询所有书籍内容
          this.currentbook.spine.spineItems.map(
            section => section.load(this.currentbook.load.bind(this.currentbook))
              .then(section.find.bind(section, q))
              .finally(section.unload.bind(section)))
            //   二维数组变一维数组 [].concat.apply([], results)
        ).then(results => Promise.resolve([].concat.apply([], results)))
      },
    },

    
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-slide-contents{
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(36);
        padding: 0 px2rem(15);
        margin: px2rem(20) 0 px2rem(10) 0;
        box-sizing: border-box;
        .slide-contents-search-input-wrapper{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .slide-contens-search-icon{
                 display: flex;
                align-items: center;
                justify-content: center;
               flex: 0 0 px2rem(28);
               font-size: px2rem(12);
              

            }
            .slide-contens-search-input{
                flex: 1;
                height: px2rem(32);
                 font-size: px2rem(14);
               background: transparent;
               border: none;
               outline: none;
            }
            
        }
        .slide-contens-search-cancel{
            flex: 0 0 px2rem(50);
            font-size: px2rem(14);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            
        }

        }
     
     // 
    .slide-contens-book-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(90);
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        // background-color: pink;
        .slide-contens-book-img-wrapper{
            flex: 0 0 px2rem(45);
            .slide-contens-book-img{
                width: px2rem(45);
                height: px2rem(60);
            }
        }
        .slide-contens-book-info-wrapper{
            flex: 1;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            .slide-contents-book-title{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                // width: px2rem(153.75);
                font-size: px2rem(14);
                margin-bottom: px2rem(8);
                line-height: px2rem(16);
               
                   .slide-contents-book-title{
            // 2行文字省略
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                white-space: normal;
                  text-overflow: ellipsis;
                  overflow: hidden;
                   word-break: keep-all;
                   }
            }
            .slide-contents-book-author{
                // 文字省略要制定宽度
                
                width: px2rem(153.75);
                font-size: px2rem(12);
               
                
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
               

            }
        }
        .slide-contents-book-progress-wrapper{
            flex: 0 0 px2rem(70);
            .slide-contents-book-progress{
                .progress{
                    font-size: px2rem(14);
                }
                .progress-text{
                    font-size: px2rem(12);
                }
            }
            .slide-contents-bookt-time{
                font-size: px2rem(12);
            }
        }
    }
    .slide-contents-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contens-item{
            display: flex;
            padding: px2rem(15);
            box-sizing: border-box;
            border-bottom: px2rem(1) solid rgba(0, 0, 0, 0.1);
            .slide-contens-item-label{
                flex: 1;
                // 增加行高，让英文完全显示
                line-height: px2rem(16);
                font-size: px2rem(14);
                @include ellipsis;
                &.selected{
                    font-weight: bold;
                }
            }
            
        }
    }
    .slide-search-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-search-item{
            font-size: px2rem(14);
            padding: px2rem(15) 0;
            box-sizing: border-box;
            line-height: px2rem(16);
        }
    }
}
</style>