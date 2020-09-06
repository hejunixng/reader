<template>
    <div class="ebook-read">
        <div id="read" class="read"></div>
        
    </div>
</template>
<script>

import{vuexmin} from '../../utils/mixins';
import {getFontFamily,saveFontFaminly,
getFontSize,saveFontSize,
getTheme,saveTheme, getLocation,
display
} from '../../utils/localStorage';
import {addCss} from '../../utils/fonSize'
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
        // 隐藏菜单栏
        hideTitle(){
            this.setMenu(false);
            this.setsetting(-1)
            // 字体设置栏
            this.setingFontVisible(false)
        },
        // 手势
        initGesture(){
              // 手指滑动 开始与结束
        this.rendition.on('touchstart',(e)=>{
            
          this.startX = e.changedTouches[0].clientX;
           this.touchStratTime = e.timeStamp;
        });
        this.rendition.on('touchend',(e)=>{
             e.preventDefault();
            e.stopPropagation();
            const offsetX = e.changedTouches[0].clientX - this.startX;
            const time = e.timeStamp - this.touchStratTime;
            // console.log(offsetX ,time);
            if(time<500 && offsetX >40){
                this.prevPage();
            }else if(time <500 && offsetX < -40){
                this.nextPage();
            }else{
                this.toggleTitle()
            };
        });
        },
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
        //    inittheme(){
        //        // 主题
        //     let defaultTheme = getTheme(this.fileName);
        //     if(!defaultTheme){
        //         defaultTheme  =this.themeList[0].name;
        //         // 缓存
        //         saveTheme(this.fileName,defaultTheme)
                
        //    };
        //    },
        // 1.
        initEpub(){
            const url=process.env.VUE_APP_RES_URL+'/epujs/' + this.fileName + '.epub';
        //    console.log(url);
        //    初始化book对象
          this.book = new Epub(url);
                //  console.log(this.book);
            this.setBook(this.book);
            
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
    this.initGesture();
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
            this.initEpub()
            
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
    .readn{
       touch-action: pan-left;
    }

}
</style>