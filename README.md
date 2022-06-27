# interactive_form
 Project 3 - Interactive Form

Real Time Error Message will appear when user type something wrong in the respective field:

Name: 
    If user leaves it blank, error message will occur.

Email: 
    Reference: [1]@[2].[3]
    [1] = Recipient Name
    [2] = Domain Name
    [3] = Top-level Domain

    Error for email field will occur if it DOES NOT meet any of the following:
    [1] 
    Uppercase and lowercase letters in English (A-Z, a-z)
    Digits from 0 to 9
    Special characters such as ! # $ % & ' * + - / = ? ^ _ ` { |

    [2]
    Uppercase and lowercase letters in English (A-Z, a-z)
    Digits from 0 to 9 
    A hyphen (-)
    A period (.) 

    [3]
    Uppercase and lowercase letters in English (A-Z, a-z)

CardNumber:
    if input is not 13 - 16 digits long

Zip Code: 
    if input is not 5 digits long

CVV:
    if input is not 3 digits long

/*******************************************************/

Conditional Error Message for Credit Card:

If credit card number contains characters such as (a-z or A-Z) or special characters such as `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~

    The error message will return 'Credit card number cannot contain characters or special characters'

If credit card number contains spaces ' ' 

    The error message will return 'Credit card number cannot contain spaces'

Else if any other errors concerning credit card number:

    The error message will return 'Credit card number must be between 13 - 16 digits'

