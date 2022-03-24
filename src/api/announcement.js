import request from '@/utils/request'

export const reqAddAnnouncement = (data) => {
    data = JSON.stringify(data);
    return request({
        url: `/addAnnounce?data=${data}`,
        method: 'post'
    })
}

export const reqGetAnnouncementList = (page) => {
    return request({
        url: `/announce/list/${page}`,
        method: 'get'
    })
}
export const reqDeleteAnnouncement = (data) => {
    data = JSON.stringify(data);
    return request({
        url: `/deleteAnnouncement?data=${data}`,
        method: 'post'
    })
}