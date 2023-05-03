const blockLogin = document.querySelector('.login'),
blockSignUp = document.querySelector('.signup'),
titleForm = document.querySelector('.title_form'),
switchForm = document.querySelector('.change_form');
const inputElement = [emailLogin, password, emailSignup] = document.querySelectorAll("input[name]");
const [loginForm, signupForm] = document.querySelectorAll('form')
const rulesEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

const changeForm = () => {
    if(blockLogin.style.display === 'none') {
        blockLogin.style.display = 'block';
        blockSignUp.style.display = 'none';
        switchForm.innerHTML = 'Create account';
        titleForm.innerHTML = 'Log In';
        emailLogin.value = '';
        password.value = '';
    }
    else{
        blockLogin.style.display = 'none';
        blockSignUp.style.display = 'block';
        switchForm.innerHTML = 'Login';
        titleForm.innerHTML = 'Sign Up';
        emailSignup.value = '';
    }
    inputElement.forEach(removeMessageError);
}

const showMessageError = (selector, message = 'Vui lòng nhập đầy đủ thông tin!') => {
    selector.parentElement.querySelector(".messageError").innerHTML = message;
    selector.classList.add('invalid_input');
  };
  
const removeMessageError = (selector) => {
selector.parentElement.querySelector(".messageError").innerHTML = '';
selector.classList.remove('invalid_input');
};

function isEmail(selector) {
    if (!selector.value){
        showMessageError(selector);
    }
    else if (!rulesEmail.test(selector.value) && selector.value) {
        showMessageError(selector, 'Đây không phải là email!');
    }
    selector.onfocus = () => {
        removeMessageError(selector);
    }
}

function isMinLength(selector, minLength) {
    if (!selector.value){
        showMessageError(selector);
    }
    else if (selector.value.length < minLength && selector.value) {
        showMessageError(selector, `Password phải dài hơn ${minLength} kí tự!`);
    }
    selector.onfocus = () => {
    removeMessageError(selector);}
}

emailLogin.onblur = () => {
    isEmail(emailLogin)
}
password.onblur = () => {
    isMinLength(password,8)
}
emailSignup.onblur = () => {
    isEmail(emailSignup)
}

const submidForm = (selector) => {
    const inputEmail = selector.querySelector('input[name="email"]');
    const inputPass = selector.querySelector('input[name="password"]');
    let isEmailValid = true;
    let isPasswordValid = true;

    if (inputEmail !== null) {
        isEmailValid = isEmail(inputEmail);
    }

    if (inputPass !== null) {
        isPasswordValid = isMinLength(inputPass, 8);
    }
    console.log(!(isEmailValid && isPasswordValid))
    selector.onsubmit = (event) => {
        if (!(isEmailValid && isPasswordValid)) {
            event.preventDefault();
        } else {
            let inforUsers = {
                email: inputEmail.value,
                password: inputPass.value
            };
            alert(JSON.stringify(inforUsers)); // Display the form data as a string
        }
    };
};

loginForm.querySelector('input[type="submit"]').onclick = () =>{
    submidForm(loginForm)
}
signupForm.querySelector('input[type="submit"]').onclick = () =>{
    submidForm(signupForm)
}

/*function isEmail(selector) {
    if (!selector.value){
        showMessageError(selector, 'Email không được để trống!');
        return false;
    }
    else if (!rulesEmail.test(selector.value)) {
        showMessageError(selector, 'Đây không phải là email!');
        return false;
    }
    removeMessageError(selector);
    return true;
}

function isMinLength(selector, minLength) {
    if (!selector.value){
        showMessageError(selector, 'Password không được để trống!');
        return false;
    }
    else if (selector.value.length < minLength) {
        showMessageError(selector, `Password phải dài hơn ${minLength} kí tự!`);
        return false;
    }
    removeMessageError(selector);
    return true;
}

const submidForm = (selector) => {
    const inputEmail = selector.querySelector('input[name="email"]');
    const inputPass = selector.querySelector('input[name="password"]');
    let isEmailValid = true;
    let isPasswordValid = true;

    if (inputEmail !== null) {
        isEmailValid = isEmail(inputEmail);
    }

    if (inputPass !== null) {
        isPasswordValid = isMinLength(inputPass, 8);
    }

    selector.onsubmit = (event) => {
        if (!(isEmailValid && isPasswordValid)) {
            event.preventDefault();
        } else {
            let inforUsers = {
                email: inputEmail.value,
                password: inputPass.value
            };
            alert(JSON.stringify(inforUsers));
            event.preventDefault();
        }
    };
};*/