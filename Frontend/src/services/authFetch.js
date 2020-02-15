export const destinationUrl = 'http://localhost:5000'
export function getCredentials(){
    return {
        accessToken: localStorage.getItem('accessToken')
    }
}

export function setCredentials(accessToken){
    localStorage.setItem('accessToken', accessToken);
}
export function deleteCredentials(){
    localStorage.removeItem('accessToken');
}

export function apiFetchFactory({fetch}){
    return async function apiFetch(method, url, body){
        let res = null;
        if(body != null){
             res = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }else{
            res = await fetch(url, {
                   method: method
            });
        }
        return res;
    }
}
export const apiFetch = apiFetchFactory({fetch});