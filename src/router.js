import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            redirect: '/ebook',    
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
        }
    ]
    })