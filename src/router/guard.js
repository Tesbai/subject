import router from './index';
import store from '@/store';
import cookie from 'js-cookie';

//全局前置守卫
router.beforeEach(async(to, from, next) => {
    //登录成功有token,cookie,vuex
    let token = store.state.token;
    if(!token){
        token = cookie.get('id');
        store.commit('writeToken', token)
    }
    if(!token){
        //没有登录
        if(to.path != '/login'){
            next('/login');
        }else{
            next();
        }
    }else{
        //已经登录了，验证token,通过个人信息验证
        let username = store.getters.username;
        if(!username){
            try{
                await store.dispatch('getUserProfile')
                if(to.path != '/login'){
                    next();
                }else{
                    next('/');
                }
            }catch(e){
                cookie.remove('id')
                store.commit('writeToken', '')
                if(to.path != '/login'){
                    next('/login');
                }else{
                    next();
                }
            }
        }else{
            if(to.path != '/login'){
                next();
            }else{
                next('/');
            }
        }
        
    }
})

export default router;