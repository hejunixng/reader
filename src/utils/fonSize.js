import { vuexmin } from "./mixins";

export const FontSize=[
    {fontSize:12},
    {fontSize:14},
    {fontSize:16},
    {fontSize:18},
    {fontSize:20},
    {fontSize:22},
    {fontSize:24}
];

export const fontFamily = [
    {font:'Default'},
    {font:'Cabin'},
    {font:'Days One'},
    {font:'Montserrat'},
    {font:'Tangerine'}
];

// 主题
export function themeList(vue){
    return [
        {
            alias:vue.$t('book.themeDefault'),
            name:'Default',
            style:{
              body:{
                'color':'#4c5059',
                'background':'#cecece'
            }
            }
        },
        {
          alias: vue.$t('book.themeGold'),
            name: 'Gold',
            style: {
              body: {
                'color': '#5c5b56',
                'background': '#c6c2b6',
               
              }
        }
     },
     {
      alias: vue.$t('book.themeEye'),
        name: 'Eye',
        style: {
          body: {
            'color': '#404c42',
            'background': '#a9c1a9',
         
          },
     }
    },
    {
        alias: vue.$t('book.themeNight'),
        name: 'Night',
        style: {
          body: {
            'color': '#cecece',
            'background': '#000000',
          
          }
        }
    }
    ]
}

// 全局样式
// 动态添加link标签
export function addCss(href){
  const link = document.createElement('link')
  link.setAttribute('rel','stylesheet');
  link.setAttribute('type','text/css');
  link.setAttribute('href',href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 删除之前的link标签
export function removelink(href){
  let links = document.getElementsByTagName('link');
  for(let i =links.length;i>=0;i--){
    let link = links[i];
    if(link && link.getAttribute('href') && link.getAttribute('href')==href){
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllLink(){
  removelink(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
  removelink(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
  removelink(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
  removelink(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
}