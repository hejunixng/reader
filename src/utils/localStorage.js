import Storage from 'web-storage-cache';

// 可以将对象自动转为JSON，将JSON字符串自动转为对象

const localStorage = new Storage();

// 设置localStorage
export function setLocalStorage(key,value){
    return localStorage.set(key,value)
}

// 获取
export function getLocalStroage(key){
    return localStorage.get(key)
}
// 
export function removelocalStorage(key){
    return localStorage.delete(key)
}

// delete all
export function clearLocalStoage(){
    return localStorage.clear()
}

//2. 设置缓存电子书的 字体
export function setBookObject(fileName,key,value){
    let book = getLocalStroage(`${fileName}-info`);
    // 判断是否能获取book
    if(!book){
        book = {}
    }
    book[key] = value;
    setLocalStorage(`${fileName}-info`,book)
}
//获取电子书信息
export function getBookObject(fileName,key){
    let book = getLocalStroage(`${fileName}-info`);
    if(book){
        return book[key]
    }else{
        return null
    }
}

// 3.字体
export function getFontFamily(fileName){
    return getBookObject(fileName,'fontFamily')
}

export function saveFontFaminly(fileName,font){
    return setBookObject(fileName,'fontFamily',font)
}

// 字体大小
export function getFontSize(fileName){
    return getBookObject(fileName,'fontSize')
}
export function saveFontSize(fileName,fontSize){
    return setBookObject(fileName,'fontSize',fontSize)
}

// 国际化
export function  getLocale(locale){
    return getLocalStroage(locale)
}

export function setLocale(locale){
    return setLocalStorage('locale',locale)
}

// 主题
export function getTheme(fileName){
    return getBookObject(fileName,'theme')
}
export function saveTheme(fileName,theme){
    return setBookObject(fileName,'theme',theme)
}

// 进度
export function saveLocation(fileName,location){
    return setBookObject(fileName,'location',location)
}
export function getLocation(fileName){
    return getBookObject(fileName,'location')
}

// 阅读时间
export function saveReadTime(fileName,readtime){
    return setBookObject(fileName,'readtime',readtime)
}
export function getReadTime(fileName){
    return getBookObject(fileName,'readtime')
}