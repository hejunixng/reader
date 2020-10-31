# reader

## Project setup
```
npm install

```
## Description
```
阅读器页
字号字体
主题 / 书签
阅读进度
多级目录
全文搜索
书城页
随机推荐
搜索
分类
图书列表

书架页
私密阅读
离线阅读
分组
移出书架

详情页
基本信息
目录结构
加入书架


项目简介：图书阅读项目，实现
框架：vue全家桶
后端用node + express搭建；
静态资源：图书资源、主题资源、图片资源等部署在nginx

```
## 运行照片

#### 主要分为三大部分：读书页面、书架、书城首页

### 一、读书页面 
![image](https://raw.githubusercontent.com/hejunixng/readimage/master/%E8%AF%BB%E4%B9%A6%E9%A1%B5%E9%9D%A20.gif)

### 1.1字体设置、主题切换等
![image](https://gitee.com/hejunxing/readimage/raw/master/%E5%AD%97%E4%BD%93%E8%AE%BE%E7%BD%AE.gif)
![image](https://raw.githubusercontent.com/hejunixng/readimage/master/%E4%B8%BB%E9%A2%98%E7%AD%89.gif)
```
FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]
```
+ 字体设置的实现是v-for循环字体数据，注册点击事件，点击后渲染相应的fontSize数据。
+ 更改字体样式、页面主题原理也是同样的。



### 1.2书签介绍
### 书签添加
![image](https://gitee.com/hejunxing/readimage/raw/master/%E4%B9%A6%E7%AD%BE%E5%85%A8.gif)

### 书签功能是这次项目较为复杂和多步骤的交互功能。
#### 主要是：
1. 下拉页面后，为图书本页添加书签。
2. 存储书签信息组件可直接跳转到添加书签的页面。
3. 兼容PC端的点击下拉和移动端的触摸下拉。


### 书签交互功能
![image](https://gitee.com/hejunxing/readimage/raw/master/%E4%B9%A6%E7%AD%BE1.gif)

#### 主要说下添加书签功能的实现：
分为四步：

1. 页面开始下拉，但下拉高度未超过书签的高度（书签下移过程中）；
2. 未到达添加标签临界状态（书签已完整出现并吸顶）；
3. 超过临界状态（超过设定高度，把当前页面添加上标签）；
4. 归位（松开点击，页面回到顶部）
```
//监听页面下拉高度v
 offsetY(v) {
        //未加载完成则返回
        if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
          return
        }     
        //height为书签高度，threshold为临界高度
         //阶段1：页面刚刚开始下拉
        if (v > 0 && v < this.height) {
           this.beforeHeight()
          
          //阶段2：书签已完整出现并吸顶
        else if(v >= this.height && v < this.threshold){
            this.beforeThreshold(v)
        
        //阶段3：超过临界状态
        } else if (v >= this.threshold) {    
          this.afterThreshold(v)      
       
        //阶段4：归位
        } else if (v === 0) {
          this.restore()
        }
},

```

### 1.3目录
![image](https://gitee.com/hejunxing/readimage/raw/master/%E7%9B%AE%E5%BD%95.png)

+ 目录数据为树状多维数据，方法是递归拼接数组的每一项和其里面的子元素，达到扁平化的效果；
+ 对于一级目录以外的次级目录，也需递归对比每一项的parent-id，区分出每项数组的等级，最后再渲染目录。
```
多为数组扁平化：
funciton flatten(array){
   let newArr = array.map(item => [].concat(item, ...flatten(item.subitems)))
    return [].concat(...newArr)
}
目录等级：
function find(item, level = 0) {
            if(!item.parent) ? {
              return level 
            }else{
                //navItem为扁平化后数据
            return find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }
}

```
### 1.4搜索功能 
![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E6%90%9C%E7%B4%A2%E6%A1%86.png)

搜索功能是用到Epubjs提供的全文搜索算法，拿来主义
```
doSearch(q) {
      //q是搜索的词语
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            section => section.load(this.currentBook.load.bind(this.currentBook))
              .then(section.find.bind(section, q))
              .finally(section.unload.bind(section)))
              //数组降维
        ).then(results => Promise.resolve([].concat.apply([], results)))
}
```
### 二、书城首页
### 2.1书城
![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E6%90%9C%E7%B4%A2%E6%A1%86.gif)

#### 书城首页下拉时，顶部搜索框错位的效果。
1. 原理是将顶部搜索模块分为3个独立部分，回退按钮、中间标题、搜索框。
2. 下拉时，中间标题下沉消失的同时搜索框上升，并且增加回退按钮的高度。

### 2.2图书分类

![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E7%B1%BB%E5%88%AB1%E5%B0%8F.png)
![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E7%B1%BB%E5%88%AB2%E5%B0%8F.png)
![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E7%B1%BB%E5%88%AB4%E5%B0%8F.png) 

### 类别详情
![image](https://gitee.com/hejunxing/readimage/raw/master/%E7%B1%BB%E5%88%AB%E8%AF%A6%E6%83%85.gif)
```
<!-- 猜你喜欢 -->
<guessyoulike :data="guessyoulike"></guessyoulike>
<!-- 热门推荐 -->
<recommend :data="recommend" :class="recommend"></recommend>
...

```
图书分类页面：因为每个栏目布局不一样，每个栏目都是一个组件。

每个栏目的类别详情页面都和图书分类的“精选”组件较为相似，通过路由跳转到该组件并且props传递数据，达到复用组件的效果


### 三、书架
![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E4%B9%A6%E6%9E%B6.png)

书架：
1. 图书在编辑模式点击有私密阅读、下载图书、移动分组、移除图书功能
2. 非编辑模式跳转到图书详情页

### 3.1图书下载功能
![image](https://gitee.com/hejunxing/readimage/raw/master/%E4%B8%8B%E8%BD%BD1.gif)

![image](https://gitee.com/hejunxing/readimaggmall/raw/master/%E4%B8%8B%E8%BD%BD2.gif)

通过axios下载图书数据，转为二进制数据后，存储到IndexDB，最后解析并渲染图书
```
export function download(book, onSucess, onError, onProgress) {
  
    return axios.create({
        //接口下载地址
      baseURL: process.env.VUE_APP_EPUB_URL,
      method: 'get',
      // 二进制
      responseType: 'blob',
      // 超时时间
      timeout: 180 * 1000,
      onDownloadProgress: progressEvent => {
        //   1.进度
        if (onProgress) onProgress(progressEvent)
      }
    }).get(`${book.categoryText}/${book.fileName}.epub`)
      .then(res => {
        //   成功回调
        // 2.转为二进制对象
        const blob = new Blob([res.data]);
        //3.存储到IndexDB
        setLocalForage(book.fileName, blob,
          () => onSucess(book),
          err => onError(err))
      }).catch(err => {
        if (onError) onError(err)
      })
  }
```


### 图书详情页
![image](https://gitee.com/hejunxing/readimage/raw/master/%E8%AF%A6%E6%83%85%E9%A1%B5.gif)

“加入书架功能”是把当前图书信息存储到LocalStroage和Vuex中，让其他组件使用，最后在书架页面中显示


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
