<template>
    <div class="ebook-read">
        <div id="read" class="read"></div>
        <div class="ebook-reader-mask"
            @click="maskClick"
            @touchmove="move"
            @touchend="moveEnd"
            @mousemove.left="onMouseMouve"
            @mousedown.left="onMouseaeEnter"
            @mouseup.left='onMouseEnd'
        ></div>
    </div>
</template>
<script>

import{vuexmin} from '../../utils/mixins';
import {getFontFamily,saveFontFaminly,
getFontSize,saveFontSize,
getTheme,saveTheme, getLocation,
display
} from '../../utils/localStorage';
import {addCss,flatten} from '../../utils/fonSize'
import Epub from 'epubjs';
global.ePub = Epub;

export default {
    name:'reader',
    data(){
        return{
            // book:'',
            // rendition:''
            
        }
    },
   mixins:[vuexmin],
   components:{
      
   },
    methods:{
        // 鼠标
        // 1.鼠标进入
        onMouseaeEnter(e){
            // 操作时间
            this.mousestarttime = e.timeStamp;
            // console.log('en');
            this.mousestate = 1;
            e.preventDefault();
            e.stopPropagation();
        },
        // 2.鼠标进入后移动
        // 因为mousemove 只要有鼠标移动就出发，所以，要判断是不是点击后的移动
        onMouseMouve(e){
            if( this.mousestate === 1){
                this.mousestate = 2;
            }else if(this.mousestate ===2){
                // 2.1设置offsetY移动屏幕
                 let offsetY =0 ;
                if (this.firstOffsetY) {
                offsetY =e.clientY - this.firstOffsetY
                 // 更新vuex
                this.setoffsetY(offsetY)
                } else {
                    // 第一次点击的位置
                this.firstOffsetY = e.clientY
        }
            }
             e.preventDefault();
            e.stopPropagation();
        },
        // 3.鼠标从移动 松手
        onMouseEnd(e){
             if(this.mousestate ==2){
                 this.setoffsetY(0);
                this.firstOffsetY = 0;
                this.mousestate =3;
                e.preventDefault();
                e.stopPropagation();
             }else{
                //  没有移动，即时显示菜单栏
                 this.mousestate =4;
             }
            //  时间小于200，认为是点击菜单栏
             const time = e.timeStamp - this.mousestarttime;
             if(time<200){
                 this.mousestate = 4
             }
            //  console.log(time);
        },
        // 手势
        move(e){
            
            let offsetY =0 ;
            
            if (this.firstOffsetY) {
                offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                 // 更新vuex
                this.setoffsetY(offsetY)
        } else {
             // 第一次点击的位置
          this.firstOffsetY = e.changedTouches[0].clientY
        }
            e.preventDefault();
            e.stopPropagation();
        },
        moveEnd(e){
            
            this.setoffsetY(0);
            this.firstOffsetY = 0;
        },
        maskClick(e){
            if(this.mousestate && (this.mousestate ===3 ||this.mousestate ===2)){
                // 鼠标点击后松开、点击后移动，不进行翻页、菜单栏操作
                return 
            }
            // console.log(e.offsetX);
            const offsetX  = e.offsetX;
            const width = window.innerWidth;
            if(offsetX > 0 && offsetX < width*0.3){
                this.prevPage()
            }else if(offsetX >0 && offsetX>width*0.7){
                this.nextPage()
            }else{
                // 点击30~70之间，切换菜单
                this.toggleTitle()
            }
        },
        // 前后翻页
        prevPage(){
            if(this.rendition){
                this.rendition.prev().then(()=>{
                    this.refresh()
                });
                this.hideTitle();
            }
        },
        nextPage(){
            if(this.rendition){
                this.rendition.next().then(()=>[
                    this.refresh()
                ]);
                this.hideTitle();
            }
        },
        toggleTitle(){
            if(this.defaultFontSize){
                this.setsetting(-1)
            }
            this.setMenu(!this.menuVisible);
           this.setingFontVisible(false)
            
        },
        
        // 手势
        // initGesture(){
        //       // 手指滑动 开始与结束
        // this.rendition.on('touchstart',(e)=>{
            
        //   this.startX = e.changedTouches[0].clientX;
        //    this.touchStratTime = e.timeStamp;
        // });
        // this.rendition.on('touchend',(e)=>{
        //     //  e.preventDefault();
        //     e.stopPropagation();
        //     const offsetX = e.changedTouches[0].clientX - this.startX;
        //     const time = e.timeStamp - this.touchStratTime;
        //     // console.log(offsetX ,time);
        //     if(time<500 && offsetX >40){
        //         this.prevPage();
        //     }else if(time <500 && offsetX < -40){
        //         this.nextPage();
        //     }else{
        //         this.toggleTitle()
        //     };
        // });
        // },
         // 字体
           initFontsize(){
            let fontsize = getFontSize(this.fileName);
                        if(!fontsize){
                            saveFontSize(this.fileName,this.defaultFontSize)
                        }else{
                        this.currentbook.rendition.themes.fontSize(fontsize+'px');
                            this.defauleSize(fontsize)
                        };
           },
        //    得到电子书封面
            parseBook(){    
                this.book.loaded.cover.then(cover=>{
                    // 把cover变成链接
                    this.book.archive.createUrl(cover).then(url=>{
                        this.settingcover(url);
                        // console.log(url);
                    });
                    // 作者信息
                    this.book.loaded.metadata.then(metadata =>{
                        this.setmetadata(metadata)
                    });
                    this.book.loaded.navigation.then(nav => {
                        const navItem = flatten(nav.toc)

                        function find(item, level = 0) {
                            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
                        }

                        navItem.forEach(item => {
                            item.level = find(item)
                        })
                        this.setnavigation(navItem)
                        })
                   
                  
                })
            },

        // 1.
        initEpub(){
            const url=process.env.VUE_APP_RES_URL+'/epujs/' + this.fileName + '.epub';
        //    console.log(url);
        //    初始化book对象
          this.book = new Epub(url);
                //  console.log(this.book);
            this.setBook(this.book);
            
            this.parseBook();
               this.rendition= this.book.renderTo('read',{
                    width:window.innerWidth,
                    height:window.innerHeight,
                    // method:'default'
                })
        // 渲染电子书
        // 电子书的位置
        const location  = getLocation(this.fileName); 

        this.display(location,()=>{
            // 查询localstorage的字体
            let font = getFontFamily(this.fileName);
            if(!font){
                saveFontFaminly(this.fileName,this.dedauleFamily)
            }else{
                // 下次刷新。获取上次的设置字体
                this.rendition.themes.font(font)
                this.settingFamily(font)
            };
           this.initFontsize();    
            // this.inittheme();
              // 主题
            let defaultTheme = getTheme(this.fileName);
            if(!defaultTheme){
                defaultTheme  =this.themeList[0].name;
                // 缓存
                saveTheme(this.fileName,defaultTheme)
                
           };
           this.settingTheme(defaultTheme);
            // 全局样式
            this.initGlobal();
            this.refresh();
            this.themeList.forEach(theme=>{
                // 注册
                // console.log(1);
                this.currentbook.rendition.themes.register(theme.name, theme.style)
             });
            // 选择
            // console.log(defaultTheme);
             this.rendition.themes.select(defaultTheme)
        });
        
        
    //    手势
    // this.initGesture();
        // epup增加字体样式，在nignx服务器中，并且在showpopo中控制选择的字体
        this.rendition.hooks.content.register(contents=>{
            Promise.all([
                // 返回promise对象
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
            ]).then(()=>{})
        });

    // 进度条 分页
        this.book.ready.then(()=>{
            // 初始化完了之后才能调用滑动条
            return this.book.locations.generate(750*(window.innerWidth/375)*(getFontSize(this.fileName)/16))
        }).then(locations=>{
            // 分页完成后才能拉动进度条
            this.setbookAvailable(true);
            //分页后 跟新progress
            this.refresh()})

    },   

    },
    mounted(){
        // 得到链接
        
         const fileName = this.$route.params.fileName.split('|').join('/');
        //  console.log(fileName);
        this.$store.dispatch('vuefile',fileName).then((res)=>{
            this.initEpub();
           
            
           
        });
       
    

        
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-read{
     width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 150;
        width: 100%;
        height: 100%;
        background: transparent;
    }

}
</style>