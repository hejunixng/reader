<template>
    <div class="ebook-slide-bookmark">
        <div class="slide-bookmark-title">{{$t('book.bookmark')}} - {{bookmark?bookmark.length:0}} </div>
        <scroll
            class="slide-bookmark-list" :top="48" :bottom="48"
            
        >
        <div class="slide-bookmark-item" v-for="(item,index) in bookmark" :key="index"
            @click="displaymark(item.cfi)"
        >
            <div class="slide-bookmark-item-icon">
                <div class="icon-bookmark"></div>
            </div>
            <div class="slide-bookmark-item-text">{{item.text}}</div>
        </div>
        
        </scroll>
    </div>
</template>

<script>
import scroll from '../common/scroll';
import {vuexmin} from '../../utils/mixins';
import {getBookmark} from '../../utils/localStorage';
export default {
    name:'slidemark',
    mixins:[vuexmin],
    data(){
        return{
            bookmark : null
        }
    },
    components:{
        scroll
    },
    methods:{
        scll(){
            console.log(1);
        },
        displaymark(tar){
            this.display(tar,()=>{
                this.hideTitle();
                console.log(tar);
            })
        }
    },
    mounted(){
        this.bookmark = getBookmark(this.fileName)
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-slide-bookmark{
    // width: 100%;
    .slide-bookmark-title{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: px2rem(48);
        font-size: px2rem(14);
        font-weight: bold;
        padding: 0 px2rem(15);
        box-sizing: border-box;
    }
    .slide-bookmark-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;
       
   
    .slide-bookmark-item{
        display: flex;
        padding: px2rem(15) 0;
        box-sizing: border-box;
        
        .slide-bookmark-item-icon{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex: 0 0 px2rem(29);

            .icon-bookmark{
                width: px2rem(20);
                height: px2rem(20);
                font-size: px2rem(12);
                background: #bbb;
                @include center;
            }
        }
        .slide-bookmark-item-text{
            font-size: px2rem(14);
            line-height: px2rem(15);
            max-height: px2rem(45);
            @include ellipsis2(3)
        }
    }
     }
}
</style>