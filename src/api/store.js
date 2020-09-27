import axios from 'axios';
import{setLocalForage} from '../utils/localForage';

export function download(book, onSucess, onError, onProgress) {
    if (onProgress == null) {
      onProgress = onError
      onError = null
    }
    return axios.create({
      baseURL: process.env.VUE_APP_EPUB_URL,
      method: 'get',
      responseType: 'blob',
      timeout: 180 * 1000,
      onDownloadProgress: progressEvent => {
        //   进度
        if (onProgress) onProgress(progressEvent)
      }
    }).get(`${book.categoryText}/${book.fileName}.epub`)
      .then(res => {
        //   成功回调
        const blob = new Blob([res.data]);
        // 转为二进制对象
        setLocalForage(book.fileName, blob,
          () => onSucess(book),
          err => onError(err))
      }).catch(err => {
        if (onError) onError(err)
      })
  }


// 首页信息
export function home(){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/home`
    })
}
// 
export function detail(book){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BOOK_URL}/book/detail`,
        params:{
            fileName:book.fileName
        }
    })
} 

export function list(){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/list}`
    })
}

export function shelf() {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
  }
  