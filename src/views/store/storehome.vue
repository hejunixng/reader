<template>
  <div class="store-home">
     <searchbar></searchbar>
     <flapcard></flapcard>
     <scroll :top="scrolltop"  @onScroll='onScroll' ref="scroll">
         <div>111111</div>
          <div>111111</div>
           <div>111111</div>
            <div>111111</div>
             <div>111111</div>
              <div>111111</div>
               <div>111111</div>

                <div>111111</div>
                 <div>111111</div>
                  <div>111111</div>

                   <div>111111</div>
                    <div>111111</div>
                     <div>111111</div>
                     <div>111111</div>
          <div>111111</div>
           <div>111111</div>
            <div>111111</div>
             <div>111111</div>
              <div>111111</div>
               <div>111111</div>

                <div>111111</div>
                 <div>111111</div>
                  <div>111111</div>

                   <div>111111</div>
                    <div>111111</div>
                     <div>111111</div>
     </scroll>

  </div>
</template>

<script>
import searchbar from '../../components/storehome/searchbar';
import scroll from '../../components/common/scroll';
import flapcard from '../../components/storehome/flapCard';
// 存储offsetY偏移 给searchbar
import {homemixin} from '../../utils/mixins';
export default {
    name:'storehome',
    data(){
        return{
            scrolltop:94
        }
    },
    mixins:[homemixin],
    components:{
        searchbar,
        scroll,
        flapcard
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
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.store-home{
    width: 100%;
    height: 100%;
}
</style>