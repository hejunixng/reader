import axios from 'axios';
import{setLocalForage} from '../utils/localForage';

export function download(book, onSucess, onError, onProgress) {
    // 检查
  if (onProgress == null) {
      onProgress = onError
      onError = null
    }
    return axios.create({
      // http://196.168.0.106:8081/epub
      baseURL: process.env.VUE_APP_EPUB_URL,
      method: 'get',
      // 二进制
      responseType: 'blob',
      // 超时
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
export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list(){
    return axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/book/list`
    })
}

export function shelf() {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
  }
  