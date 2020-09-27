<template>
  <div class="shelf-item-category">
      <div class="shelf-item-category-list">
          <div class="shelf-item-category-item" v-for="(item,index) in data.itemList" :key="index">
              <img :src="item.cover" alt="" class="shelf-item-category-img">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'shelfcategory',
    props:{
        data:Object
    },
    mounted(){
        // console.log(this.data);
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-item-category{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shelf-item-category-list{
        display: flex;
        flex-wrap: wrap;
         width: 100%;
           height: 100%;
        .shelf-item-category-item{
            flex: 0 0 33.33%;
            height: 33.3%;
            box-sizing: border-box;
            padding: px2rem(3) px2rem(3);
            .shelf-item-category-img{
                width: 100%;
                height: 100%;
                // box-shadow: px2rem(2) px2rem(1) px2rem(1) px2rem(2) rgba(0,0,0,0.2);
            }
        }
    }
}
</style>