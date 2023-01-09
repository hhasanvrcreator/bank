'use strict';
const balanceField = document.querySelector('.balance');
const movementsField = document.querySelector('.movements');
const sendMoneyField = document.querySelector('#sendMoneySelectBox');
const sendingAmountField = document.querySelector('#sendingAmount');

const accounts = JSON.parse(getlocal('accounts'));
const user_id = getlocal('user_id');

function checkLogin() {
    if (localStorage.getItem('token') == null) {
        window.location.replace(window.location.origin + '/auth/login.html');
    }
}

checkLogin();

// logout
document.querySelector('#logoutButton').addEventListener('click', function () {
    removelocal('token', 'user_id');
    window.location.replace(window.location.origin + '/auth/login.html');
})

function setlocal(name, value) {
    localStorage.setItem(name, value);
}
function getlocal(name) {
    return localStorage.getItem(name);
}
function removelocal(...keys) {
    keys.forEach(element => {
        localStorage.removeItem(element)
    });
}

function getCurrentUser() {
    return accounts.find(({ id }) => id.toString() === user_id.toString());
}

function fetchMovements() {
    const user_account = getCurrentUser();
    balanceField.innerHTML = user_account.balance;
    let movementsHtml = '';
    if (user_account.movements.length > 0) {
        user_account.movements.forEach(element => {
            movementsHtml += `<p>${element.includes('-') ? 'Debited ' + element : 'Credited ' + element}</p>`
        });
    } else {
        movementsHtml = '<p>No Movement</p>';
    }
    movementsField.innerHTML = movementsHtml;
}

function fetchUsers() {
    let usersHtml = '';
    if (accounts.length > 0) {
        accounts.forEach(element => {
            if (element.id != user_id)
                usersHtml += `<option value="${element.id}">${element.name}</option>`
        });
    }
    sendMoneyField.innerHTML = usersHtml;
}

function sendMoney() {
    console.log(sendMoneyField.value + " :::: " + sendingAmountField.value);
    let amount = parseInt(sendingAmountField.value);
    const receiver_id = sendMoneyField.value;

        if (amount > parseInt(balanceField.innerHTML)) {
            alert("you don't have enough amount!");
            return false;
        }
        for (let acc in accounts) {
            if (accounts[acc].id == receiver_id) {
                let receiver_balance = parseInt(accounts[acc].balance);
                let ced = accounts[acc].balance = receiver_balance + amount;
                accounts[acc].movements.push(`${ced} (+${amount})`);
            }
            if (accounts[acc].id == user_id) {
                let deb = accounts[acc].balance -= amount;
                accounts[acc].movements.push(`${deb} (-${amount})`);
            }
            setlocal('accounts', JSON.stringify(accounts));
            fetchMovements();
        }
}

document.querySelector('#sendButton').addEventListener('click', sendMoney);

fetchMovements();
console.log(accounts);
fetchUsers();