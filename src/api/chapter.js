import request from '@/axios'

export function getChapter(pk){
    return request({
        url:`chapter?pk=${pk}`
    })
}

export function changeChapter(pk, chapter_name){
    return request({
        url:'chapter',
        method:'PUT',
        data:{
            pk:pk,
            chapter_name:chapter_name
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}

export function addChapter(pk, chapter_name){
    let formData = new FormData();
    formData.append('pk', pk)
    formData.append('chapter_name', chapter_name)
    return request({
        url:'chapter',
        method:'POST',
        data:formData
    })
}

export function deleteChapter(pk){
    return request({
        url:'chapter',
        method:'DELETE',
        data:{
            pk:pk
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}