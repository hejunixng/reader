const home = {
    state:{
       hotsearchoffsety:0,//热门搜索滑动
        flapcardVicible:false,//
        isEditMode:false,//编辑模式
        shelfList: [],//书架图书列表
        shelfSelected:[],//书架是否选中
        shelfTitleVisible:true,//书架是否显示
        shelfCategory:[],//书架分类数据 
        currentType:1,//书架列表为1，书架分类为2
    },
    mutations:{
        sethotsearchoffsety(state,hotsearchoffsety){
            state.hotsearchoffsety = hotsearchoffsety
        },
        setflapcardVicible(state,flapcardVicible){
            state.flapcardVicible=flapcardVicible
        },
        setShelfList(state, list) {
            state.shelfList = list
          },
          setshelfSelected(state,shelfSelected){
              state.shelfSelected =shelfSelected
          },
          setshelfTitleVisible(state,shelfTitleVisible){
              state.shelfTitleVisible = shelfTitleVisible
          },
          setisEditMode(state,isEditMode){
              state.isEditMode = isEditMode;
          },
          setshelfCategory(state,shelfCategory){
            state.shelfCategory = shelfCategory
          },
          setcurrentType(state,currentType){
              state.currentType = currentType
          }

          
    }
}

export default home