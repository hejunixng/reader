<template>
  <div class="shelf-footer" v-if="isEditMode">
      <div class="shelf-footer-tab-wrapper" 
      v-for="item in table" :key="item.index" @click="tabclick(item)"
        
      >
          <div class="shelf-footer-tab" :class="{'is-selected':isSelected}">
              <div class="icon-private tab-icon"  v-if="item.index === 1 && !isprivate"></div>
               <div class="icon-private-see tab-icon" v-if="item.index === 1 && isprivate"></div>
               <div class="icon-download tab-icon" :class="{'is-selected':isSelected}" v-if="item.index === 2 && !isdownload"></div>
                <div class="icon-download-remove tab-icon" :class="{'is-selected':isSelected}" v-if="item.index === 2 && isdownload"></div>
                <div class="icon-move tab-icon"  :class="{'is-selected':isSelected}" v-if="item.index === 3"></div>
                 <div class="icon-shelf tab-icon" :class="{'is-selected':isSelected}" v-if="item.index === 4"></div>
                 <div class="tab-text">{{label(item)}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import {shelfmixin} from '../../utils/mixins';
import {saveBookShelf,removelocalStorage} from '../../utils/localStorage';
import { download } from '../../api/store';
import {removeLocalForage} from '../../utils/localForage';
export default {
    name:'shelffooter',
    mixins:[shelfmixin],
    data(){
        return {
            pop:null,
           
        }
    },
    methods:{
        // 
        hidepop(){
            // 隐藏菜单栏
            this.pop.hide()
        },
        setPrivate(){
            let isPrivate;
            if(this.isprivate){
                // 取反，每个都是私密，改为不私密
                isPrivate = false
            }else{
                isPrivate = true
            }
            this.shelfSelected.forEach(book=>{
                book.private = isPrivate
            })
            this.setisEditMode(false);
            // 存储到localstorage
            // console.log(this.shelfList);
            saveBookShelf(this.shelfList);
            this.hidepop();
            if(isPrivate){
                this.simpleToast(this.$t('shelf.setPrivateSuccess'))
            }else{
                this.simpleToast(this.$t('shelf.closePrivateSuccess'))
            }
        },
        showprivate(){
            // 1.私密阅读弹窗
             this.pop =  this.popup({
               title:this.isprivate? this.$t('shelf.closePrivateTitle'):this.$t('shelf.setPrivateTitle'),
               btn:[
                   {
                       text:this.isprivate? this.$t('shelf.close'): this.$t('shelf.open'),

                       click:()=>{
                        //    点击后弹出确认框
                          this.setPrivate()
                       }
                   },
                   {
                    //    取消
                       text:this.$t('shelf.cancel'),

                       click:()=>{
                        this.hidepop();
                       }
                   },
                   
               ]

            }).show();
            
        },
        async downloadSelectedBook() {
            for (let i = 0; i < this.shelfSelected.length; i++) {
            await this.downloadBook(this.shelfSelected[i])
                .then(book => {
                book.cache = true
                })
            }
      },
        // downloadBook(book){
        //     let text = 'please waitting...';
        //     const toast = this.totast({
        //         text
        //     })
        //     toast.continueShow()
        //     // 异步下载
        //     // console.log(this.shelfList);
        //     return new Promise((resolve,reject)=>{
        //         download(book,(res)=>{ 
        //             // 成功回调
        //             // console.log('ok');
        //             resolve(book)
        //         },()=>{
        //             // console.log("11");
        //         },progressEvent=>{
        //         //   下载进度
        //         const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
        //     const tt = this.$t('shelf.progressDownload').replace('$1', `${book.fileName}.epub(${progress})`)
        //         // toast.updateText('please waitting')
        //         // console.log(progressEvent);
        //         })
        //     })
        // },
         downloadBook(book) {
                let text = ''
                const toast = this.totast({
                text
                })
                toast.continueShow()
                return new Promise((resolve, reject) => {
                download(book, book => {
                    toast.remove()
                    resolve(book)
                }, reject, progressEvent => {
                    const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
                    text = this.$t('shelf.progressDownload').replace('$1', `${book.fileName}.epub(${progress})`)
                    toast.updateText('waiting...')
                })
                })
      },
        removeSelectedBook() {
        Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
          .then(books => {
            books.map(book => {
              book.cache = false
            })
            saveBookShelf(this.shelfList)
            this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
          })
      },
      removeBook(book) {
        return new Promise((resolve, reject) => {
          removelocalStorage(`${book.categoryText}/${book.fileName}-info`)
          removeLocalForage(`${book.fileName}`)
          resolve(book)
        })
      },
       async setDownload() {
         this.setisEditMode(false);
            // 存储到localstorage
           
            saveBookShelf(this.shelfList);
            this.hidepop();
          

        if (this.isdownload) {
            // 移除
            console.log('remove');
          this.removeSelectedBook()
        } else {
            console.log('re');
            // 异步下载，等待下载完成
          await this.downloadSelectedBook()
          saveBookShelf(this.shelfList)
            // 下载完成后 更改提示信息
          this.simpleToast(this.$t('shelf.setDownloadSuccess'))
        }
        },
        // 2.下载
        showDownload(){
        this.pop =  this.popup({
               title:this.isdownload? this.$t('shelf.removeDownloadTitle'):this.$t('shelf.setDownloadTitle'),
               btn:[
                   {
                       text:this.isdownload? this.$t('shelf.delete'): this.$t('shelf.open'),

                       click:()=>{
                        //    点击后弹出确认框
                          this.setDownload()
                       }
                   },
                   {
                    //    取消
                       text:this.$t('shelf.cancel'),

                       click:()=>{
                        this.hidepop();
                       }
                   },
                   
               ]

            }).show();
        },
        removeSelected(){
            this.shelfSelected.forEach(item => {
                // 把已选择的书本，在书架中对比，留下其他书籍
                return this.setShelfList(this.shelfList.filter(book=> book !== item));
            })
            this.setshelfSelected([]);
            this.setisEditMode(false);
            // 存储到localstorage
           
            saveBookShelf(this.shelfList);
            this.hidepop();
            
        },
        // 4.移除
        showRemove(){
            let title;
            if(this.shelfSelected.length === 1){
                // 直选中一件
                title = this.$t('shelf.removeBookTitle').replace('$1',`《${this.shelfSelected[0].title}》`)
            }else{
                // 选中一本以上的文字
                title = this.$t('shelf.removeBookTitle').replace('$1',this.$t('shelf.selectedBooks'));
            };
            this.pop =  this.popup({
               title:title,
               btn:[
                   {
                       text:this.$t('shelf.removeBook'),
                        type:'danger',
                       click:()=>{
                        //    点击后弹出确认框
                          this.removeSelected()
                       }
                   },
                   {
                    //    取消
                       text:this.$t('shelf.cancel'),

                       click:()=>{
                        this.hidepop();
                       }
                   },
                   
               ]

            }).show();
        },
        // 第一个按钮点击
        tabclick(item){
            // console.log(item);
           if(!this.isSelected){
            //    没有一个被选中
               return false
           }
           switch(item.index){
               case 1:
                //    选中标签，私密阅读
                   this.showprivate()
                   break
                case 2:
                    // 下载按钮
                    this.showDownload()
                    break
                case 3:
                    this.dialog().show()
                    break
                case 4:
                    // 移除
                    this.showRemove();
                    break
                default:
                    break
           };
           
        },
        label(item){
            switch(item.index){
                case 1:
                    // 只要有一个书本不是私密，私密阅读 改变
                    return this.isprivate ? item.label2 :item.label
                    break;
                case 2:
                    return this.isdownload ? item.label2 : item.label
                    break;
                default:
                    return item.label
            }
        },
       
    },
   
    computed:{
         isprivate(){//判断私密阅读
            if(!this.isSelected){
                // 没有选中
                return false
            }else{
                return this.shelfSelected.every((item)=>{
                    // 选中的每一个都是私密
                   return item.private
                })
            }
         },
         isdownload(){//判断
        //  console.log('od');
            if(!this.isSelected){
                // 没有选中
                // console.log('ss');
                return false
            }else{
                return this.shelfSelected.every((item)=>{
                    // 选中的每一个都是私密
                //    console.log('nod');
                //    console.log(this.shelfSelected);
                   return item.cache
                })
            }
         },
        // 是否选中
        isSelected(){
            return this.shelfSelected.length>0
        },
        table(){
            return[
                {
                    label:this.$t('shelf.private'),
                    label2:this.$t('shelf.noPrivate'),
                    index:1
                },
                {
                    label:this.$t('shelf.download'),
                    label2:this.$t('shelf.delete'),
                    index:2
                },
                {
                    label:this.$t('shelf.move'),
                    
                    index:3
                },
                {
                    label:this.$t('shelf.remove'),
                  
                    index:4
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/gobal.scss';
.shelf-footer{
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    background-color: #fff;
    box-shadow: 0 px2rem(-2) px2rem(6) rgba(0,0,0,0.5);
    z-index: 120;
    .shelf-footer-tab-wrapper{
        flex: 1;
       height: 100%;
       
       .shelf-footer-tab{
           width: 100%;
           height: 100%;
           @include columnCenter;

            .tab-icon{
                font-size: px2rem(20);
                color: #666;
                opacity: 0.5;
            }
            .tab-text{
                font-size: px2rem(12);
                color: #666;
                opacity: 0.5;
                margin-top: px2rem(5);
            }
            .is-selected{
                opacity: 1;
            }
            .icon-shelf{
                color:deeppink ;
            }
            
       }
       
    }
}
</style>