const home = {
    state:{
       hotsearchoffsety:0,//热门搜索滑动
        flapcardVicible:true,//
    },
    mutations:{
        sethotsearchoffsety(state,hotsearchoffsety){
            state.hotsearchoffsety = hotsearchoffsety
        },
        flapcardVicible(state,flapcardVicible){
            state.flapcardVicible -flapcardVicible
        }
    }
}

export default home