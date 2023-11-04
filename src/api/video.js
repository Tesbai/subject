import request from '@/axios'

export function getVideo(pk){
    return request({
        url:`chapter_video?pk=${pk}`,
        data:{
            pk:pk
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}
export function addVideo(video, name, chapter_id, video_permission=1){
    const formdata = new FormData();
    formdata.append('video', video);
    formdata.append('name', name);
    formdata.append('chapter_id', chapter_id);
    formdata.append('video_permission', video_permission);
    return request({
        url:'chapter_video',
        data:formdata
    })
}

export function deleteVideo(pk){
    return request({
        url:'chapter_video',
        method:'DELETE',
        data:{
            pk:pk
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}