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
    }
}
export default actions;