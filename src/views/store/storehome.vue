<template>
  <div class="store-home">
     <searchbar></searchbar>
     <flapcard :data='random'></flapcard>
     <scroll :top="scrolltop"  @onScroll='onScroll' ref="scroll">
       <div class="banner-wrapper">
           <img class="img" :src="banner" alt="">
       </div>
       <guessyoulike :data="guessyoulike"></guessyoulike>
       <recommend :data="recommend" :class="recommend"></recommend>
       <fetured 
            :data="fetured" :class="fetured"
            :titleText="$t('home.featured')"
            :btnText="$t('home.seeAll')"
            ></fetured>
    <!-- 二维数组 -->
        <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
                <categorybook :data='item'></categorybook>
        </div>
        <category class="category" :data="categories"></category>
     </scroll>

  </div>
</template>

<script>
import searchbar from '../../components/storehome/searchbar';
import scroll from '../../components/common/scroll';
import flapcard from '../../components/storehome/flapCard';
import guessyoulike from '../../components/storehome/GuessYouLike';
import recommend from '../../components/storehome/Recommend';
import fetured from '../../components/storehome/Featured';
import categorybook from '../../components/storehome/CategoryBook';
import category from '../../components/storehome/Category';
// 存储offsetY偏移 给searchbar
import {homemixin} from '../../utils/mixins';
import {home} from '../../api/store';

export default {
    name:'storehome',
    data(){
        return{
            scrolltop:94,
            random:null,
            banner:null,//图片
            guessyoulike:null,//猜你喜欢
            recommend:null,//热门
            fetured:null,//随机
            categoryList:null,//所有分类,
            categories:null,
        }
    },
    mixins:[homemixin],
    components:{
        searchbar,
        scroll,
        flapcard,
        guessyoulike,
        recommend,
        fetured,
        categorybook,
        category
    },
    methods:{
        // 存储offsetY偏移 给searchbar
        onScroll(offsetY){
          this.setoffsetY(offsetY);
        //   因为标题栏消失，滚动区域的top要重新计算
          if(offsetY >0){
              this.scrolltop = 52
          }else{
              this.scrolltop = 94
          }
          this.$refs.scroll.refresh()
        }
    },
    mounted(){
        // AXIOS请求回来的数据都是异步
        home().then(response=>{
            
            if(response&&response.status===200){
                const data = response.data;
                // console.log(data);
                // 随机抽取一个
                const randomIndex = Math.floor(Math.random() * data.random.length);
                this.random = data.random[randomIndex];
                this.banner = data.banner;
                this.guessyoulike = data.guessYouLike;
                this.recommend = data.recommend;
                this.fetured = data.featured;
                
                this.categoryList = data.categoryList;
               
                this.categories = data.categories;
                 console.log(  this.recommend);
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.store-home{
    width: 100%;
    height: 100%;
    .banner-wrapper{
        padding:px2rem(10) ;
        box-sizing: border-box;
        .img{
            width: 100%;
            height: px2rem(140);
        }
    }
    .recommend{
        margin-top: px2rem(20);
    }
    .fetured{
        margin-top: px2rem(20);
    }
    .category-list-wrapper{
        margin-top: px2rem(20);
    }
    .category{
         margin-top: px2rem(20);
    }
}
</style>