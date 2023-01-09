'use strict';

import { validation } from '/auth/validation.js';
import { token } from '/auth/uniqueData.js';

const email = document.querySelector('#email');
const pass = document.querySelector('#password');

const accounts = JSON.parse(getlocal('accounts'));

function getlocal(name) {
    return localStorage.getItem(name);
}
function setlocal(name, value) {
    localStorage.setItem(name, value);
}

document.querySelector('#submit').addEventListener('click',function(){
    var checkValidation = validation('login',email, pass);
    if (!checkValidation) return false;
    let user_email =  email.value;
    let user_pass =  pass.value;
    let existsUser = accounts.find((x) => (x.email === user_email && x.pass === user_pass))
    if(existsUser){
        setlocal('user_id', existsUser?.id);
        setlocal('token', token());
        window.location.replace(window.location.origin + '/index.html');
    }else{
        alert('incorrect email or password');
    }
})