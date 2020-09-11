import jwtDecode from 'jwt-decode'
import http from './httpService'

const apiEndPonit = "http://localhost:4000/api/auth" 

http.setJwt(getJwt())

export async function login(user) {
   const { data: token} =   await http.post(apiEndPonit, {
        email: user.email,
        password: user.password
    })
    localStorage.setItem("token", token)
}

export function getCurrentUser(){
    try {
        const token = localStorage.getItem('token')
        return jwtDecode(token)
    } catch (ex) {
        return null
    }
}

function getJwt(){
    return localStorage.getItem("token")
}

export function loginWithJwt(jwt){
    localStorage.setItem("token", jwt)
}
