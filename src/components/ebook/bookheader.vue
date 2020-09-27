<template>
    <div class="ebook-header">
        <span class="ebook-header-text">
            {{getSectionName}}
        </span>
    </div>
</template>

<script>
import {vuexmin} from '../../utils/mixins';
export default {
    name:'bookheader',
    components:{

    },
    mixins:[vuexmin],
    methods:{
     
    },
    mounted(){
       
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-header{
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    padding: 0 px2rem(15);
  
    z-index: 100;
    overflow: hidden;
    .ebook-header-text{
        font-size: px2rem(12);
        color: #6d7178;
    }
}
</style>