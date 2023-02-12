export const isAuth = function(){
    if(!localStorage.getItem('LoggedIn')) return false;
    const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'))
    if(!LoggedIn) return false
    return true;
}

export const setAuth = function(value){
    if(value == true){
        localStorage.setItem('LoggedIn','true');
    }
    else
        localStorage.clear('LoggedIn')
}