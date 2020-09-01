export function fetchTopKeys(){
    // let list = ['cname','created', 'expiry','status'];
    let list = ['cname','status'];
    return list;
}

export function fetchKeyDescMapping(){
    return keyDescMapping;
}
// "created" : "Certificate issue date",
// "expiry" : "Certificate expiry date",s
export const keyDescMapping = {
    "cname": "Host name",
    "status" : "Certificate Status",
};
