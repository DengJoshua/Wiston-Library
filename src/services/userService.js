import http from './httpService'

const apiEndPoint = "http://localhost:4000/api/users"

export function getUsers() {
    return http.get(apiEndPoint)
}

export function saveUser(user){
    if (user._id) {
        const body = { ...user };
        delete body._id;
        return http.patch(apiEndPoint + "/"  + user._id, body)
    } 
      return http.post(apiEndPoint , user);
}


export function deleteUser(id) {
    http.delete(apiEndPoint + "/" + id)
}