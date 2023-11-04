import request from '@/axios';
import qs from 'qs';

export function getSubject(){
    return request({
        url:'classify'
    })
}

export function addSubject(name){
    const formDate = new FormData()
    formDate.append("name", name)
    return request({
        url:'classify',
        method:'POST',
        data: formDate
    })
}

export function delSubject(id){
    return request({
        url:'classify',
        method:'DELETE',
        data:{
            pk:id,
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}

export function changeSubject(id, name){
    return request({
        url:'classify',
        method:'PUT',
        data:{
            pk:id,
            name:name,
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}