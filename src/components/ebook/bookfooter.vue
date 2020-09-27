<template>
    <div class="ebook-footer">
        <div class="ebook-footer-text">{{this.progress + '%'}}</div>
    </div>
</template>

<script>
import {vuexmin} from '../../utils/mixins';
export default {
    name:'bookfooter',
    mixins:[vuexmin]
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.ebook-footer{
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    bottom: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .ebook-footer-text{
        font-size: px2rem(12);
        color: #6d7178;
    }
}
</style>