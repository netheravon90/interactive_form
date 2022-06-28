


/** 
 * When the page first loads, the first text field should have the focus state by default to prompt the user.
*/

const nameField = document.getElementById('name');
nameField.focus();


/** 
 * The "Job Role" section has an <input type="text"> field where users can enter a custom job role. 
 * If the user selects "Other" in the "Job Role" drop down menu, 
 * they can enter info into the "Other job role" text field. 
 * But this field should be hidden by default 
 * and only displayed once users select "Other" in the drop down menu, 
 * and be hidden if the user selects any other option.
*/



//Hide the "text field" with the id of "other-job-role" 
//so it is not displayed when the form first loads.


const fillJobField = document.getElementById('other-job-role');
fillJobField.style.display = 'none';


//Program the "Job Role" <select> element to listen for user changes. 
//When a change is detected, display/hide the "text field" based on the user’s selection in the drop down menu.


const jobTitle = document.getElementById('title');

jobTitle.addEventListener('change', (e) => {
    const selection = e.target;
    if(selection.value === 'other' ){
        fillJobField.style.display = '';
    } else {
        fillJobField.style.display = 'none';
    };
});

/**
 * The options in the "Color" drop down menu are not available for each t-shirt design. 
 * So the user shouldn’t be able to see or choose a color option until they have chosen a design.
 */

//Disable the "Color" <select> element.

const shirtColor = document.getElementById('color');

shirtColor.disabled = true;



//Program the "Design" <select> element to listen for user changes. When a change is detected:
//The "Color" <select> element should be enabled.
//The "Color" <select> element should display an available color.
//The "Color" dropdown menu should display only the color options associated with the selected design. 

const selectShirtDesign = document.getElementById('shirt-designs');
const shirtcolorOptions = document.getElementById('color').children;

selectShirtDesign.addEventListener('change', (e) =>{
    shirtColor.disabled = false;
    
    for(i= 0; i< shirtcolorOptions.length; i++){
        const selection = e.target;
        let designTheme = shirtcolorOptions[i].getAttribute('data-theme');
       
        if(selection.value === designTheme){
        shirtcolorOptions[i].hidden = false;
        shirtcolorOptions[i].selected = true;
        } else {
        shirtcolorOptions[i].hidden = true; 
        }
    };
});

/**
 * The "Total: $" element below the "Register for Activities" section should update 
 * to reflect the sum of the cost of the user’s selected activities.
 */

// let totalCost  = document.getElementById('activities-cost');
let totalCost = 0;
const totalCostofActivities = document.getElementById('activities-cost');
const registerActivity = document.getElementById('activities-box');


// Program the "Register for Activities" fieldset element to listen for user changes.
// When a change is detected:
// If an activity is checked, 
// the total cost should increase by the value in the data-cost attribute 
// of the activity’s <input type="checkbox"> element.
// If an activity is unchecked, the total cost should decrease by that amount.
// The <p> element with the id of "activity-cost" below the activities section should 
// update to reflect the chosen activities' total cost.

registerActivity.addEventListener('change', (e) => {
    let cost = parseInt(e.target.getAttribute('data-cost'));
    if(e.target.checked){
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    totalCostofActivities.textContent = `Total: $${totalCost}`;
});


//The credit card payment option should be selected for the user by default. 

const paymentMethods = document.getElementById('payment');

paymentMethods[1].setAttribute('selected', '')

// Hide Paypal and Bitcoin info by default. Only loads when selected.
const paypalInfo = document.getElementById('paypal')
const bitcoinInfo = document.getElementById('bitcoin')
const creditCardInfo = document.getElementById('credit-card')

paypalInfo.style.display = 'none';
bitcoinInfo.style.display = 'none';

// Show CC, Paypal or Bitcoin info if selected.

paymentMethods.addEventListener('change', (e) => {
    if(e.target.value === 'bitcoin'){
        bitcoinInfo.style.display = ''
        paypalInfo.style.display = 'none'
        creditCardInfo.style.display = 'none'
    } else if (e.target.value === 'paypal'){
        paypalInfo.style.display = ''
        bitcoinInfo.style.display = 'none'
        creditCardInfo.style.display = 'none'
    } else{
        paypalInfo.style.display = 'none'
        bitcoinInfo.style.display = 'none'
        creditCardInfo.style.display = ''
    }
});

// Program the form element to listen for the submit event.
// When the form submission is detected, each required form field or section should be validated.

const confForm = document.forms[0];
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// change CSS when input is valid or invalid

function validPass(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none'; 
}

function validFail(element){
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block'; 
}


//The "Name" field cannot be blank or empty.'

function checkName (){
    let nameValue = nameField.value
    const validName = /^([\x00-\xFF]){1,30}$/.test(nameValue);  
    if (validName){
        validPass(nameField);
    } else{
        validFail(nameField);
    };
    return validName; 
}

//The "Email Address" field must contain a validly formatted email address.
//Reference from emailregex.com

function checkEmail () {
    let emailValue = email.value
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue);
    
    if (validEmail){
        validPass(email)
    } else {
        validFail(email)
    }
    
    return validEmail;
}

//The "Register for Activities" section must have at least one activity selected.
const activityBox = document.getElementById('activities-box')
let checkBoxes = document.querySelectorAll("input[type='checkbox']")

function checkActivity (){
    let checkedActivities = [];

        // if checkbox is checked, activity field is valid.

        for (i = 0; i< checkBoxes.length; i++){
            if (checkBoxes[i].checked){
                validPass(activityBox);
                checkedActivities.push(checkBoxes[i])
                break;
            } else {
                validFail(activityBox)
            }
        }

        // return true if there's activity selected. return false if there's no activity selected.
        if (checkedActivities.length !== 0){
            return true;
        } else {
            return false;
        }
    }

/**
 *  
 * Firefox browser has state persist when reloading. So we reset checkbox value to false so that no checkbox will be checked when reloading page using firefox so that the amount is correct 
 */

 for (i = 0; i< checkBoxes.length; i++) {
    checkBoxes[i].checked = false;
 }


//The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces.

function checkCardNumber() {
    let ccValue = cardNumber.value
    const validCC = /^[0-9]{13,16}$/.test(ccValue)
    if (validCC){
        validPass(cardNumber)
    } else {
        validFail(cardNumber)
    }

    // test for special characters and white spaces
    const testSpecialChar = /[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(ccValue);
    const testGap = /\s/.test(ccValue)
    
    if (testSpecialChar){
        cardNumber.parentElement.lastElementChild.textContent = 'Credit card number cannot contain characters or special characters'
    } else if (testGap) {
        cardNumber.parentElement.lastElementChild.textContent = 'Credit card number cannot contain spaces'
    } else {
        cardNumber.parentElement.lastElementChild.textContent = 'Credit card number must be between 13 - 16 digits'
    }

    return validCC;
}

//The "Zip code" field must contain a 5 digit number.

function checkZipCode() {
    let zipValue = zipCode.value
    const validZipCode = /^[0-9]{5}$/.test(zipValue)
    if (validZipCode){
        validPass(zipCode)
    } else {
        validFail(zipCode)
    }
    return validZipCode;
}

//The "CVV" field must contain a 3 digit number.

function checkCVV() {
    let cvvValue = cvv.value
    const validCVV = /^[0-9]{3}$/.test(cvvValue)
    if (validCVV){
        validPass(cvv)
    } else {
        validFail(cvv)
    }
    return validCVV;
}


//focus and blur for checkboxes

for (i=0; i <checkBoxes.length; i++){
    checkBoxes[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus')
    });

    checkBoxes[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}

// Prevent Form Submission if any validations return to be false.

confForm.addEventListener('submit', (e) => {
    if (!checkName()){
        e.preventDefault();
    }
    if (!checkEmail()){
        e.preventDefault();
    }

    if (!checkActivity()){
        e.preventDefault();
    }

    //If and only if credit card is the selected payment method:

    if (paymentMethods.value === 'credit-card') {

         if (!checkCardNumber()){
         e.preventDefault();
         }

        if (!checkZipCode()){
        e.preventDefault();
         }

         if (!checkCVV()){
        e.preventDefault();
         }
    }
})


// Prevent users from registering for conflicting activities
//  Tue 9am -12pm : Disable the other option if either Javascript Libraries Workshop or Javascript Frameworks Workshop is selected.
checkBoxes[1].addEventListener('change', () => {
    if(checkBoxes[1].checked){
        checkBoxes[3].disabled = true;
        checkBoxes[3].parentElement.classList.add('disabled')
    } else {
        checkBoxes[3].disabled = false;
        checkBoxes[3].parentElement.classList.remove('disabled')
    }
})

checkBoxes[3].addEventListener('change', () => {
    if(checkBoxes[3].checked){
        checkBoxes[1].disabled = true;
        checkBoxes[1].parentElement.classList.add('disabled')
    } else {
        checkBoxes[1].disabled = false;
        checkBoxes[1].parentElement.classList.remove('disabled')
    }
})

//  Tue 1pm -4pm : Disable the other option if either Node.js Workshop or Build Tools Workshop is selected..

checkBoxes[2].addEventListener('change', () => {
    if(checkBoxes[2].checked){
        checkBoxes[4].disabled = true;
        checkBoxes[4].parentElement.classList.add('disabled')
    } else {
        checkBoxes[4].disabled = false;
        checkBoxes[4].parentElement.classList.remove('disabled')
    }
})

checkBoxes[4].addEventListener('change', () => {
    if(checkBoxes[4].checked){
        checkBoxes[2].disabled = true;
        checkBoxes[2].parentElement.classList.add('disabled')
    } else {
        checkBoxes[2].disabled = false;
        checkBoxes[2].parentElement.classList.remove('disabled')
    }
})

// Real-time error message for Name, Email, Card Number, Zip Code and CVV

nameField.addEventListener('keyup', () => checkName())
email.addEventListener('keyup',  () => checkEmail())
cardNumber.addEventListener('keyup', () => checkCardNumber())
zipCode.addEventListener('keyup', () => checkZipCode())
cvv.addEventListener('keyup', () => checkCVV())

