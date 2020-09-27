<template>
  <div class="shelf-item" 
        :class="{'shelf-item-shahow':data.type === 1|| data.type === 2}"
        @click="itemclick()"
        >
      <!-- 动态组件 -->
      <component :is="item" :data="data"
            class="shelf-item-comp"
            :class="{'is-edite':isEditMode && data.type === 2}"
      >
          
      </component>
      <div class="icon-selected" 
            :class="{'is-selected':data.selected}"
        v-show="isEditMode && data.type === 1"></div>
  </div>
</template>

<script>
import shelfbook from './shelfimage';
import category from './shelfcategory';
import shelfadd from './shelfitemAdd';
import {shelfmixin} from '../../utils/mixins';
import {gostorehome} from '../../utils/store';
export default {
    name:'shelfitem',
    mixins:[shelfmixin],
    props:{
        data:Object
    },
    data(){
        return{
            book:shelfbook,
            category:category,
            additem:shelfadd
        }
    },
    computed:{
        item(){
            return this.data.type === 1 ? this.book :(this.data.type === 2 ? this.category : this.additem )
        }
    },
    methods:{
        itemclick(){
           if(this.isEditMode){
            //    编辑状态 显示是否选中
                this.data.selected = !this.data.selected;
                if(this.data.selected){
                    // 选中状态，加入到vuex
                    this.shelfSelected.pushduplicate(this.data);
                    // console.log(this.shelfSelected);
                }else{
                    // 移除 保留当前点击的id和数组里的id不同的项目，剔除当前的id
                    this.setshelfSelected(this.shelfSelected.filter(item=>item.id !== this.data.id));
                }

           }else{
            //    单纯跳转
                if(this.data.type === 1){
                        this.showBookDetail(this.data)
                    }else if(this.data.type === 2){
                        this.$router.push({
                            path:'/store/category',
                            query:{
                                title:this.data.title
                            }
                        })
                    }else{
                        gostorehome(this)
                    }
           }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-item{
    position: relative;
    width: 100%;
    height: 100%;
    // background-color: pink;
    &.shelf-item-shahow{
        box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(3) rgba(200, 200,200,0.3);
    }
    .shelf-item-comp{
        opacity: 1;
        &.is-edite{
            opacity: 0.5;
        }

        
    }
    .icon-selected{
        position: absolute;
        bottom: px2rem(2);
        right:px2rem(2);
        font-size: px2rem(18);
        color: rgba(0, 0,0,0.6);
        &.is-selected{
            color:rgb(74, 171, 255)
        }
    }
}
</style>