import {mapGetters,mapActions} from 'vuex';
import {themeList,addCss,removeAllLink,TimeMinutes} from './fonSize';
import {saveLocation,getBookmark,getBookShelf,saveBookShelf} from './localStorage';
import {shelf} from '../api/store';
import {appendToShelf} from './store';

// 书架
export const shelfmixin={
    computed:{
        ...mapGetters(['offsetY','shelfList',
        'shelfSelected','shelfTitleVisible','isEditMode','shelfCategory','currentType'
    ])
    },
    methods:{
        ...mapActions(['setoffsetY','setShelfList','setshelfSelected',
        'setshelfTitleVisible','setisEditMode','setshelfCategory','setcurrentType']),
        // 电子书跳转详情页
        showBookDetail(book){
            // console.log('data');
            this.$router.push({
                path:'/store/detail',
                query:{
                    fileName:book.fileName,
                    category:book.categoryText
                }
            })
        },
        getshelfCategory(title){
            this.getShelfList().then(()=>{
                // 找出外面的title是等于route的title的
                const categorylist = this.shelfList.filter(book => book.type === 2 && book.title === title)[0];
                this.setshelfCategory(categorylist);
                // console.log(this.shelfList.filter(book => book.type === 2 && book.title === title));
            })
        },
        getShelfList() {
            let shelfList = getBookShelf();
            console.log(shelfList);
            if (!shelfList) {
              shelf().then(response => {
                if (response.status === 200 && response.data && response.data.bookList) {
                  shelfList = appendToShelf(response.data.bookList)
                  saveBookShelf(shelfList);
                //   return promise对象
                  return this.setShelfList(shelfList)
                }
              })
            } else {
              return this.setShelfList(shelfList)
            }
          },
    }
}


// 首页mixins
export const homemixin={
    computed:{
        ...mapGetters(['offsetY','hotsearchoffsety','flapcardVicible','shelfList'
        ])
    },
    methods:{
        ...mapActions(['setoffsetY','sethotsearchoffsety','setShelfList',
        'setflapcardVicible']),
        // 电子书跳转详情页
        showBookDetail(book){
            // console.log('data');
            this.$router.push({
                path:'/store/detail',
                query:{
                    fileName:book.fileName,
                    category:book.categoryText
                }
            })
        },
        getShelfList() {
            let shelfList = getBookShelf();
            // console.log(shelfList);
            if (!shelfList) {
              shelf().then(response => {
                if (response.status === 200 && response.data && response.data.bookList) {
                  shelfList = appendToShelf(response.data.bookList)
                  saveBookShelf(shelfList)
                  return this.setShelfList(shelfList)
                }
              })
            } else {
              return this.setShelfList(shelfList)
            }
          },
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
            break;
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
            console.log(1);
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
