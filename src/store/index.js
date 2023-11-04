import VueX from 'vuex';
import Vue from 'vue';
import { profile } from '@/api/users'
import subject from './subject'
import chapter from './chapter'
Vue.use(VueX);

export default new VueX.Store({
    state:{
        isCollapse:false,
        token:"",
        userProfile:{
            id:"",
            username:"",
            email:"",
            avator:"",
            phone:""
        }
    },
    getters:{
        username(state){
            return state.userProfile.username;
        }
    },
    //只能写同步代码
    mutations:{
        changeMsg(state, data){
            state.msg = data
        },
        reWriteIsCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        writeToken(state, token){
            state.token = token
        },
        writeUserProfile(state, profile){
            state.userProfile.id = profile.id;
            state.userProfile.username = profile.username;
            state.userProfile.email = profile.email;
            state.userProfile.avator = `https://www.chengzier.cn:8000/${profile.avator}`;
            state.userProfile.phone = profile.phone;
        },
        clearToken(state){
            state.token = '';
        }
    },
    //可以写异步代码
    actions:{
        getUserProfile({ commit, state }){
            return new Promise((resolve, reject)=>{
                profile().then(res=>{
                    let data = res.data;
                    if(data.status){
                        reject();
                    }else{
                        commit('writeUserProfile', data)
                        resolve();
                    }
                }).catch(err=>{
                    reject();
                })
            })
        }
    },
    modules:{
        subject:subject,
        chapter:chapter
    }
})