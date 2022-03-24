import request from '@/utils/request'

export function login(data) {
  data = JSON.stringify(data);
  return request({
    url: `/user/login?data=${data}`,
    method: 'post',
    // query: {data}
    // headers: { 'Content-Type': 'application/json' },
  })
}

export function reqGetUserInfo(token) {
  return request({
    url: `/userInfo?token=${token}`,
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/user/layout',
    method: 'get'
  })
}
