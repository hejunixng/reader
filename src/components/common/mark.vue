<template>
    <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
import {px2rem} from  '../../utils/utils';
export default {
    name:'bomark',
    props:{
        width:Number,
        height:Number,
        color:String
    },
    computed:{
        style(){
            if(this.color){
                // console.log(1);
                return {
                    borderColor :`${this.color} ${this.color} transparent ${this.color}`
            }
            }else{
                return {}
            }
        }
    },
    methods:{
        // 要减去下方三角形
        refresh(){
            // console.log(this.height ,this.width);
            if(this.height &&this.width ){
                this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem 
                ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem `
            }
        }
    },
    mounted(){
        // console.log(this.color);
        this.refresh()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.bookmark{
             width: 0;
            height: 0;
            border-width: px2rem(50) px2rem(10) px2rem(10)  px2rem(10);
            border-style: solid;
            border-color: white white transparent white;
}
</style>