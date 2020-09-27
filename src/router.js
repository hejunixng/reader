import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}


export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            redirect: '/store',    
        },{
            path:'/ebook',
            name:'ebook',
            component:()=>import('./views/ebook/index.vue'),
            children:[
                {
                    path:':fileName',
                    name:'fileName',
                    component:()=>import('./components/ebook/bookreader.vue')
                }
            ]
        },
        {
            path:'/store',
            name:'bookstore',
            redirect:'/store/shelf',
            component:()=>import('./views/store/index.vue'),
            children:[
                {
                    path:'home',
                    name:'storehome',
                    component:()=>import('./views/store/storehome.vue')
                },
                {
                    path:'category',
                    name:'category',
                    component:()=>import('./views/store/storeCategory.vue')
                },
                {
                    path:'shelf',
                    component:()=>import('./views/store/storeshelf.vue')
                },
                {
                    path:'list',
                    name:'storelist',
                    component:()=>import('./views/store/StoreList.vue')
                },
                {
                    path:'detail',
                    name:'storedetail',
                    component:()=>import('./views/store/StoreDetail.vue')
                }
            ]
        }
    ]
    })