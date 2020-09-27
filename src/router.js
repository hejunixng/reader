import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

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
            redirect:'/store/home',
            component:()=>import('./views/store/index.vue'),
            children:[
                {
                    path:'home',
                    name:'storehome',
                    component:()=>import('./views/store/storehome.vue')
                }
            ]
        }
    ]
    })