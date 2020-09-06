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
    }
    

}
export default book;