import Vue from 'vue';
import VueI18N from 'vue-i18n';
import en from './en';
import cn from './cn';
import {getLocale,setLocale} from '../utils/localStorage'


// 加载插件
Vue.use(VueI18N);

const messages = {
    cn,
    en
}

// 语言版本
let locale = getLocale();
if(!locale){
    locale = 'cn';
    setLocale(locale)
}

const i18n = new VueI18N({
    locale,
    messages,
    silentTranslationWarn: true,
});

export default i18n;