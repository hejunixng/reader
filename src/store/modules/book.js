const book ={
    state:{
        fileName:'',
        menuVisible:false,//控制菜单栏显示
        settingVisible:-1,//子豪设置显示
        defaultFontSize:16,
        currentbook:null,//book对象
        dedauleFamily:'Default',//默认字体
        fontFamilyVisible:false,//是否显示字体设置
        defaultTheme:'Default',//默认主题
        progress:0,//进度条
        bookAvailable:false,//
        section:0,//章节
        navigation: null,
        cover: null,//目录图书封面
        metadata: null,//作者
        paginate: '',
        pagelist: null,
        offsetY: 0,
        isBookmark: null,
        
    },
    mutations:{
        vuefile(state,fileName){
            state.fileName = fileName;
            // console.log(state);
        },
        // 菜单栏
        setMenu(state,menuVisible){
            state.menuVisible = menuVisible
            // console.log(state.menuVisible);
        },
    //    字体设置
        setsetting(state,settingVisible){
            state.settingVisible = settingVisible;
            // console.log(state.settingVisible);
        },

        defauleSize(state,defaultFontSize){
            state.defaultFontSize = defaultFontSize
        },
        // book对象
        setBook(state,currentbook){
            state.currentbook = currentbook
        },
        // 设置字体
        settingFamily(state,dedauleFamily){
          state.dedauleFamily = dedauleFamily  
        },
        //显示字体
        setingFontVisible(state,fontFamilyVisible){
            state.fontFamilyVisible = fontFamilyVisible
        },
        settingTheme(state,defaultTheme){
            state.defaultTheme = defaultTheme
        },
        // 进度条是否能滑动
        setbookAvailable(state,bookAvailable){
            state.bookAvailable = bookAvailable
        }, 
        setProgress(state,progress){
            state.progress = progress
        },
        // 章节
        setsection(state,section){
            state.section = section
        },
        settingcover(state,cover){
            state.cover = cover
        },
        setmetadata(state,metadata){
            state.metadata = metadata
        },
        // 
        setnavigation(state,navigation){
            state.navigation = navigation
        },
        setoffsetY(state,offsetY){
            state.offsetY =offsetY
        },
        setisBookmark(state,isBookmark){
            state.isBookmark = isBookmark
        }

    },
    
}

export default book