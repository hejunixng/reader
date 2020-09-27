import {mapGetters,mapActions} from 'vuex';
import {themeList,addCss,removeAllLink,TimeMinutes} from './fonSize';
import {saveLocation,getBookmark} from './localStorage';

// 首页mixins
export const homemixin={
    computed:{
        ...mapGetters(['offsetY','hotsearchoffsety'])
    },
    methods:{
        ...mapActions(['setoffsetY','sethotsearchoffsety'])
    }
}

// 读书mixins
export const vuexmin={
    computed:{
        ...mapGetters(['fileName',
        'menuVisible','settingVisible','defaultFontSize','currentbook','dedauleFamily',
        'fontFamilyVisible','defaultTheme','bookAvailable','progress','section',
        'cover','metadata','navigation','offsetY','isBookmark'
        ]),
        themeList(){
            return themeList(this)
        },
         // 电子书标题
         getSectionName(){
            // if(this.section){
            //     const sectionObj = this.currentbook.section(this.section);
            //     if(sectionObj && sectionObj.href && this.currentbook.navigation){
            //         return this.currentbook.navigation.get(sectionObj.href).label
            //     }
            // }

            return this.section ? this.navigation[this.section].label :'';
        }

    },
    methods:{
        ...mapActions(['setMenu','vuefile','setsetting',
        'defauleSize','setBook','settingFamily',
        'setingFontVisible','settingTheme','setbookAvailable','setProgress','setsection',
        'settingcover','setmetadata','setnavigation','setoffsetY','setisBookmark'
    
    ]),
    // 全局样式
    initGlobal(){
        // 先清除样式
        removeAllLink();
        // console.log(this.defaultTheme);
       switch (this.defaultTheme) {
           case 'Default':
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
               break;
       case 'Eye':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
            breadk;
        case 'Gold':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
            break;
        case 'Night':
             addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
             break;
           default:
               addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
               break;
       }
    },
    //上下章节、拉动进度条  进度条跟随变化
    refresh(){
        // 获取当前进度
        const currentLocation = this.currentbook.rendition.currentLocation();
        const startCfi = currentLocation.start.cfi;
        if(currentLocation&& startCfi){
            // 换成百分比
            const progress  = this.currentbook.locations.percentageFromCfi(startCfi);
            // 更改progress
            this.setProgress(Math.floor(progress*100));
            this.setsection(currentLocation.start.index)
            // 存储到localstorage
            saveLocation(this.fileName,startCfi);
            // 书签
            const bookmark = getBookmark(this.fileName);
            if(bookmark){
                // 如果书签里面其中一个cfi 和当前的页面startcfi对比
                if(bookmark.some(item=> item.cfi === startCfi)){
                    this.setisBookmark(true)
                }else{
                    this.setisBookmark(false)
                }
            }else{
                this.setisBookmark(false)
            }
            // console.log(bookmark);
        }
        
    },
    display(target,cb){
        if(target){
            this.currentbook.rendition.display(target).then(()=>{
                this.refresh();
                if(cb) cb()
            })
        }else{
            return this.currentbook.rendition.display().then(()=>{
                this.refresh();
                if(cb) cb()
            })
        }
        
    },
    // 隐藏菜单栏
    hideTitle(){
        this.setMenu(false);
        this.setsetting(-1)
        // 字体设置栏
        this.setingFontVisible(false)
    },

 
    // 阅读时间
  readTime(){
    return this.$t('book.haveRead').replace('$1',TimeMinutes(this.fileName))
 },

 read(){
    console.log(1);
 }

    }
}
