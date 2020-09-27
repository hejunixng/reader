const book={
    fileName(state){
       return state.book.fileName
    },
    menuVisible:state=>state.book.menuVisible,
 
    settingVisible(state){
        return state.book.settingVisible
    },
    defaultFontSize(state){
        return state.book.defaultFontSize
    },
    currentbook(state){
        return state.book.currentbook
    },
    dedauleFamily(state){
        return state.book.dedauleFamily
    },
    fontFamilyVisible(state){
        return state.book.fontFamilyVisible
    },
    defaultTheme(state){
        return state.book.defaultTheme
    },
    bookAvailable(state){
        return state.book.bookAvailable
    },
    progress(state){
        return state.book.progress
    },
    section(state){
        return state.book.section
    },
    cover(state){
        return state.book.cover
    },
    metadata(state){
        return state.book.metadata
    },
    navigation(state){
        return state.book.navigation
    },
    offsetY(state){
        return state.book.offsetY
    },
    isBookmark(state){
        return state.book.isBookmark
    },
    hotsearchoffsety(state){
        return state.home.hotsearchoffsety
    },
    flapcardVicible(state){
        return state.home.flapcardVicible
    },
    shelfList(state){
        return state.home.shelfList
    },
    shelfSelected(state){
       return  state.home.shelfSelected
    },
    shelfTitleVisible(state){
       return state.home.shelfTitleVisible
    },
    isEditMode(state){
        return state.home.isEditMode
    },
    shelfCategory(state){
        return state.home.shelfCategory
    },
    currentType(state){
        return state.home.currentType
    }
    

}
export default book;