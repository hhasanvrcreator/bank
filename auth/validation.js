'use strict';
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validation(type,...fields) {
    if(type == "login"){
        let [email , pass] = fields;
        if (email.value == "" || pass.value == "") {
            alert('Please fill all the given fields!');
            return false;
        }
    }else if(type == "signup"){
        let [email, user_name, pass, cpass] = fields;
        let chk_cpass = true;
        if(typeof cpass.value !== undefined){
            if(cpass.value == "")
                chk_cpass = false;
        }   
        if (user_name.value == "" || email.value == "" || pass.value == "" || chk_cpass == false) {
            alert('Please fill all the given fields!');
            return false;
        }
        else if (!email.value.match(mailformat)) {
            alert('Invalid email address!');
            return false;
        }
        else if(cpass.value !== pass.value){
            alert('Password not match!');
            return false;
        }
    }
    return true;
}
export { validation };