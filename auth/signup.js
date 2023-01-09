'use strict';

import { validation } from '/auth/validation.js';
import { token, uniqueId } from '/auth/uniqueData.js';

const user_name = document.querySelector('#username');
const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const cpass = document.querySelector('#cpassword');
const submit_btn = document.querySelector('#submit');

let localAccounts = JSON.parse(localStorage.getItem('accounts'));
const wl = window.location;
const user_id = uniqueId();

function setlocal(name, value) {
    localStorage.setItem(name, value);
}

submit_btn.addEventListener('click', function () {
    var checkValidation = validation('signup',email, user_name, pass, cpass);
    if (!checkValidation) return false;
    const newAccount = {
        id: user_id,
        pass: pass.value,
        name: user_name.value,
        email: email.value,
        movements: [],
        balance: 100
    }
    if (localAccounts) {
        if (localAccounts.some(acc => acc.email == email.value)) {
            alert('Email already exist!');
            return false;
        }
        localAccounts.push(newAccount);
    } else {
        localAccounts = [newAccount];
    }
    // set variables in localstorage

    setlocal('user_id', user_id);
    setlocal('accounts', JSON.stringify(localAccounts));
    setlocal('token', token());

    alert('your account has been created successfully');
    wl.replace(wl.origin + '/index.html');
});