const actions={
    
        vuefile({commit},fileName){
           return commit('vuefile',fileName);
       },
       setMenu({commit},menuVisible){
           return commit('setMenu',menuVisible)
       },
       
       setsetting({commit},settingVisible){
        return commit('setsetting',settingVisible)
    },
    defauleSize({commit},defaultFontSize){
        return commit('defauleSize',defaultFontSize)
    },
    setBook({commit},currentbook){
        return commit('setBook',currentbook)
    },
    settingFamily({commit},dedauleFamily){
        return commit('settingFamily',dedauleFamily)
    },
    setingFontVisible({commit},fontFamilyVisible){
        return commit('setingFontVisible',fontFamilyVisible)
    },
    settingTheme({commit},defaultTheme){
        return commit('settingTheme',defaultTheme)
    },
    setbookAvailable({commit},bookAvailable){
        return commit('setbookAvailable',bookAvailable)
    },
    setProgress({commit},progress){
        return commit('setProgress',progress)
    },
    setsection({commit},section){
        return commit('setsection',section)
    },
    settingcover({commit},cover){
        return commit('settingcover',cover)
    },
    setmetadata({commit},metadata){
        return commit('setmetadata',metadata)
    },
    setnavigation({commit},navigation){
        return commit('setnavigation',navigation)
    },
    setoffsetY({commit},offsetY){
        return commit('setoffsetY',offsetY)
    },
    setisBookmark({commit},isBookmark){
        return commit('setisBookmark',isBookmark)
    },
    sethotsearchoffsety({commit},hotsearchoffsety){
        return commit('sethotsearchoffsety',hotsearchoffsety)
    },
    setflapcardVicible({commit},flapcardVicible){
        return commit('setflapcardVicible',flapcardVicible)
    },
    setShelfList({ commit }, list) {
        return commit('setShelfList', list)
      },
      setshelfSelected({commit},shelfSelected){
        return commit('setshelfSelected',shelfSelected)
    },
    setshelfTitleVisible({ commit },shelfTitleVisible){
        return commit('setshelfTitleVisible',shelfTitleVisible)
    },
    setisEditMode({commit},isEditMode){
        return commit('setisEditMode',isEditMode)
    },
    setshelfCategory({commit},shelfCategory){
        return commit('setshelfCategory',shelfCategory)
    },
    setcurrentType({commit},currentType){
       return commit('setcurrentType',currentType)
    }
}
export default actions;