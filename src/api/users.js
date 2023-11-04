import request from '@/axios';
import qs from 'qs';
export function login(data) {
    //将数据转换成Form表单格式，根据需要写headers
    // qs.stringify(data);
    //将数据转换成FormData格式,不能写headers。
    let formData = new FormData();
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('text', data.text)
    formData.append('uuid', data.uuid)
    return request({
        url: 'supersignin',
        method: 'POST',
        data: formData,
        // headers:{
        //     "Content-Type":"application/x-www-form-urlencoded"
        // }
    })
}

export function profile() {
    return request({
        url: 'superprofile'
    })
}

export function createUser(name) {
    let formDate = new FormData()
    formDate.append('username', name)
    return request({
        url: 'createsuperuser',
        method: 'POST',
        data: formDate
    })
}

export function getEmailCode(text) {
    return request({
        url: 'superbindemail',
        method: 'POST',
        data:{
            email:text
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function bindEmail(text) {
    return request({
        url: 'superbindemail',
        method: 'PUT',
        data:{
            text:text
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function getChangePasswordCoded(){
    return request({
        url:'superchangepwd',
        method:'POST'
    })
}

export function changePassword(data){
    return request({
        url:'superchangepwd',
        method:'PUT',
        data:{
            text:data.password_code,
            pwd1:data.new_password,
            pwd2:data.confirm_password
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}