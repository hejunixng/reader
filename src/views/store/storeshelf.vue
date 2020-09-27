<template>
  <div class="store-shelf">
      <shelftitle :title="$t('shelf.title')"></shelftitle>
      <scroll class="store-shelf-scroll-wrapper" 
                :top="0" 
                :bottom="scrollBottom"
                @onScroll="onScroll"
                ref="scroll"
                >
            <shelfsearch></shelfsearch>
            <shelflist :data="shelfList"></shelflist>
      </scroll>
      <shelffooter></shelffooter>
  </div>
</template>

<script>
import shelftitle from '../../components/shlef/shelftitle';
import scroll from '../../components/common/scroll';
import shelfsearch from '../../components/shlef/shelfsearch';
import shelflist from '../../components/shlef/shelfList';
import shelffooter from '../../components/shlef/shelffooter';
import {shelfmixin} from '../../utils/mixins';
import {shelf} from '../../api/store';
import{appendToShelf} from '../../utils/store';
import {getBookShelf, saveBookShelf} from '../../utils/localStorage';
export default {
    name:'storeshelf',
     mixins:[shelfmixin],
     data(){
         return{
             scrollBottom:0
         }
     },
    components:{
        shelftitle,
        scroll,
        shelfsearch,
        shelflist,
        shelffooter
    },
    methods:{
        onScroll(offsety){
            this.setoffsetY(offsety)
        },
        // getStoreList(){
        //     let shelfList = getBookShelf()
        //     if(!shelfList){
        //     // 获取书架信息
        //         shelf().then((response)=>{
        //             // console.log(response);
        //             if(response.status=== 200 && response.data.bookList){
        //             //    去重
        //                shelfList = appendToShelf(response.data.bookList)
        //                saveBookShelf(shelfList);
        //                this.setShelfList(shelfList)
        //             }
        //     })
        //     }else{
        //         this.setShelfList(shelfList)
        //     }

           
        // }
    },
    mounted(){
        this.getShelfList();
        this.setshelfCategory([]);
        this.setcurrentType(1)

    },
    watch:{
        // 监听是否为编辑模式，显示底部组件
        isEditMode(isEditMode){
            // console.log(11);
            this.scrollBottom =isEditMode? 48 :0 ;
            this.$nextTick(()=>{
                this.$refs.scroll.refresh()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.store-shelf{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 100;
    .store-shelf-scroll-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
    }
}
</style>