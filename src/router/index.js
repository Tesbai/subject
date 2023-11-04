import VueRouter from 'vue-router';
import Vue from 'vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
    return originalPush.call(this, location).catch(err=>err)
}

Vue.use(VueRouter);

//@就是src目录
const Login = () => import('@/views/Login');//懒加载
const LayOut = () => import('@/layout/index');

const Dashboard = () => import('@/views/Dashboard');
const Subject = () => import('@/views/Subject');
const Video = () => import('@/views/Video');
const Chapter = () => import('@/views/Chapter')
const Usernews = () => import('@/views/Usernews')

const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/',
        redirect:'/dashboard',
        component:LayOut,
        children:[
            {
                path:'/dashboard',
                component:Dashboard,
                meta:{
                    title:'首页'
                }
            },
            
        ]
    },
    {
        path:'/subject',
        component:LayOut,
        children:[
            {
                path:'',
                component:Subject,
                meta:{
                    title:'课程管理'
                }
            }
        ]
    },
    {
        path:'/video',
        component:LayOut,
        children:[
            {
                path:'',
                component:Video,
                meta:{
                    title:'视频管理'
                }
            }
        ]
    },
    {
        path:'/chapter',
        component:LayOut,
        children:[
            {
                path:'',
                component:Chapter,
                meta:{
                    title:'章节管理'
                }
            }
        ]
    },
    {
        path:'/usernews',
        component:LayOut,
        children:[
            {
                path:'',
                component:Usernews,
                meta:{
                    title:'个人信息'
                }
            }
        ]
    }
]

export default new VueRouter({
    mode:"hash",
    routes
})