const form = document.getElementById('form');
const Fname = document.getElementById('Fname');
const Mname = document.getElementById('Mname');
const Lname = document.getElementById('Lname');
const email = document.getElementById('email');
const DOB = document.getElementById('DOB');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const city = document.getElementById('city');
const batchE = document.getElementById('batch');
const department = document.getElementById('department');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let v = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            v = false;
        } else {
            showSuccess(input);

        }
    });
    return v;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        return false;
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords have to match');
        return false;
    } else {
        return true;
    }

}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function isValidDOB(d) {

    var k = new Date(d.value);

    if (Object.prototype.toString.call(k) === "[object Date]") {
        // it is a date
        if (isNaN(k.getDate())) { // d.valueOf() could also work
            showError(d, 'DOB is wrong');
            return false;
        } else {
            showSuccess(d);
            return true;
        }
    } else {
        showError(d, 'DOBvvv is wrong');
        return false;
    }
}

function getGender() {
    let gender;
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else {
        gender = document.getElementById('female').value;
    }
    console.log(gender);
    return gender;
}

function getBatch() {
    let batch = batchE.value;
    console.log(batch);
    return batch;
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([Fname, Lname, email, password, city]);
    checkLength(Fname, 3, 15);
    checkLength(Lname, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    isValidDOB(DOB);
    checkPasswordsMatch(password, password2);

    if (checkRequired([Fname, Lname, email, password, city]) &&
        checkLength(Fname, 3, 15) &&
        checkLength(Lname, 3, 15) &&
        checkLength(password, 6, 25) &&
        checkEmail(email) &&
        isValidDOB(DOB) &&
        checkPasswordsMatch(password, password2)) {


        let UGender = getGender();
        let UBatch = getBatch();
        let UFname = Fname.value;
        let UMname = Mname.value;
        let ULname = Lname.value;
        let UPassword = password.value;
        let UEmail = email.value;
        let UDOB = new Date(DOB.value);
        let Ucity = city.value;
        let UDepartment = department.value;



        form.action = '/auth/register';
        form.submit();
    } else {

    }


});