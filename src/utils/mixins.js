import {mapGetters,mapActions} from 'vuex';
import {themeList,addCss,removeAllLink} from './fonSize';
import {saveLocation} from './localStorage';
export const vuexmin={
    computed:{
        ...mapGetters(['fileName',
        'menuVisible','settingVisible','defaultFontSize','currentbook','dedauleFamily',
        'fontFamilyVisible','defaultTheme','bookAvailable','progress','section'
        ]),
        themeList(){
            return themeList(this)
        }

    },
    methods:{
        ...mapActions(['setMenu','vuefile','setsetting',
        'defauleSize','setBook','settingFamily',
        'setingFontVisible','settingTheme','setbookAvailable','setProgress','setsection'
    
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
        // 换成百分比
        const progress  = this.currentbook.locations.percentageFromCfi(startCfi);
        // 更改progress
        this.setProgress(Math.floor(progress*100));
        this.setsection(currentLocation.start.index)
        // 存储到localstorage
        saveLocation(this.fileName,startCfi)
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
    }


    }
}