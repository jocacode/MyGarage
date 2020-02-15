export function setUserInfo(user){
    localStorage.setItem('UserId', user._id);
    localStorage.setItem('Username', user.Username)
}
export function getUserInfo(){
    return{
        userId: localStorage.getItem('UserId')
    }
}
export function clearUserInfo(){
    localStorage.removeItem('UserId');
    localStorage.removeItem('Username');
}
export function setPageToShow(page){
    sessionStorage.setItem('page', page);
}
export function getPageToShow(){
    return{
        page: sessionStorage.getItem('page')
    }
}
export function setAccessToken(token){
    localStorage.setItem('token',token)
}
export function getAccessToken(){
   return localStorage.getItem('token')
}
export function clearAccessToken(){
  localStorage.removeItem('token')
}