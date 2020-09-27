<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
  import { realPx } from '../../utils/utils'
  import Bookmark from '../common/mark'
  import {vuexmin} from '../../utils/mixins';
  import { getBookmark, saveBookmark } from '../../utils/localStorage'

  const BLUE = '#346cbc'
  const WHITE = '#fff'
  export default {
    mixins: [vuexmin],
    components: {
      Bookmark
    },
    // 因为数据要经过处理 再返回，在computed
    computed: {
      height() {
        return realPx(35)
      },
      // 临界值
      threshold() {
        return realPx(55)
      },
    //  书签固定位置
      fixedStyle() {
        return {
          position: 'fixed',
          top: 0,
          right:0
        }
      }
    },
    mounted(){
     
      // console.log( `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`);
    },
    // 监听offset的变化，操作标签
    watch: {
      offsetY(v) {
        //   避免没渲染完就拖动
        if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
          return
        }
        if (v >= this.height && v < this.threshold) {
          this.beforeThreshold(v)
        } else if (v >= this.threshold) {
          this.afterThreshold(v)
        } else if (v > 0 && v < this.height) {
          this.beforeHeight()
        } else if (v === 0) {
            // 松手归位
          this.restore()
        }
      },
      isBookmark(isBookmark) {
        this.isFixed = isBookmark;
        
        if (isBookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    data() {
      return {
        text: '',
        color: WHITE,
        isFixed: false
      }
    },
    methods: {
         // 存储书签
      addBookmark() {
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        // ！前面,把currenbook对象的cfi，start，end拼接在一起
        const currentLocation = this.currentbook.rendition.currentLocation()
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '')
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
        const cfirange = `${cfibase}!,${cfistart},${cfiend})`
       //   得到电子书内容
       this.currentbook.getRange(cfirange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      // 删除标签
      removeBookmark() {
        const currentLocation = this.currentbook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          // 把删除的标签剔除
          this.bookmark = this.bookmark.filter(item => item.cfi !== cfi);
          saveBookmark(this.fileName,this.bookmark )
          this.setisBookmark(false)
        }
      },
      restore() {
        // 状态4：归位
        setTimeout(() => {
            // 回到index。vue上方
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }, 200)
        if (this.isFixed) {
             // 固定标签
          this.setisBookmark(true)
          this.addBookmark()
        } else {
          this.setisBookmark(false)
          this.removeBookmark()
        }
      },
      beforeHeight() {
        // 状态1：未超过书签的高度
        //判断是否为标签页
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
      beforeThreshold(v) {
        // 状态2：未到达零界状态
            // 做相对运动，屏幕下拉多少，标签相反方向移动，相对静止

        this.$refs.bookmark.style.top = `${-v}px`
        this.beforeHeight()
        //    改变图标字体
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)'
        }
      },
      afterThreshold(v) {
        // 状态3：超越零界状态
        this.$refs.bookmark.style.top = `${-v}px`
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        const iconDown = this.$refs.iconDown
        if (iconDown.style.transform === '' ||
          iconDown.style.transform === 'rotate(0deg)') {
          iconDown.style.transform = 'rotate(180deg)'
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/gobal.scss';

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }
</style>
