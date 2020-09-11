import http from './httpService'

const apiEndPoint = "http://localhost:4000/api/customers"

export function getCustomers() {
    return http.get(apiEndPoint)
}

export function getCustomer(id) {
    return http.get(apiEndPoint + "/" + id)
}

export function saveCustomer(customer) {
    if (customer._id) {
        const body = { ...customer };
        delete body._id;
        return http.put(apiEndPoint + "/"  + customer._id, body)
    } 
      return http.post(apiEndPoint , customer);
}

export function handleTrans(customer){
    return http.patch(apiEndPoint + "/" + customer._id, { isGold: customer.isGold})
}
 
 export function deleteCustomer(id) {
    return http.delete(apiEndPoint + "/" + id)
}