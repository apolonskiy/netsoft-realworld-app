# Test Plan for RealWorld App
This test plan is designed for a technical evaluation of QA/coding skills agains a 'realworld-app'

### Scope:
- Login page
- Resigster Page
- Settings page

Out of scope:
- New Post creation And Post display
- Liking posts
- Personal and global feed
- Usage of tags for filtering


## Login Page
Verifications performed over Login Page of an app

TC1: Should render login page correctly
1. Visit app route {baseUrl}/#/login
2. Login page is rendered correctly, having:
    a) 'Need an account' button with link to Sign Up page
    b) Email text input with placeholde 'Email'
    c) Password text input with placeholde 'Password'
    d) Sign In button disabled when one of both of the fields is empty
    e) navbar in header has Home, Sign In (active) and Sign Up buttons

TC2: Should login success when submit a valid login form
1. Visit app route {baseUrl}/#/login
2. Fill in valid password, email
3. Hit Sign In button
4. Verify redirect to Dashboard page URL

TC3: Should display error when submit an invalid form (password not match)
1. Visit app route {baseUrl}/#/login
2. Fill in valid email but invalid password
3. Click Sign In button
4. Verify that form has a corresponding error (email or password is invalid)

TC4: should display format error without API call when submit an invalid format
1.  Visit app route {baseUrl}/#/login
2. Fill in invalid email and any password
3. Hit submit button
4. Verify that form is not valid
5. Verify that no request is sent to BE

## Register Page

TC1: should call register API and jump to home page when submit a valid form
RE this testCase - not sure it's a good practice to do it this way, I'd go for random name generator instead of faking response, but won't change it, maybe there is some purpose I might mish
1. Visit app route {baseUrl}/#/register
2. Fill in valid usenrame, email and pwd
3. Hit submit button
4. replace a response by cy.intercept() to let user in
5. Verify that url contains #/ and user 'logged in'

TC2: should display error message when submit the form that username and email already exist
1. Visit app route {baseUrl}/#/register
2. Fill in user email and username, pwd can be any
3. Hit submit button
4. verify that response has error
5. verify that form has errors about both username and email being occupied

TC3: should display error message when submit the form that username already exist
same as #TC2 but fill in only occupied username and check for corresponding error

TC4: should display error message when submit the form that email already exist
same as #TC2 but fill in only occupied email and check for corresponding error

TC5: should display error message when submit the form that username is too long
same as #TC2 but fill in username with lentgh of 21 and check for corresponding error


TC6: hould display error message when submit the form when password is less than 8 symbols
same as #TC2 but fill in password with lentgh of 7 and check for corresponding error

TC7: should have invalid form when email is invalid
same as #TC2 but fill in invalid email (several @@@) and check that request not sent, form is not valid

## Settings Page

TC1: should update user settings with valid data an d redirect to profile
1. Login to app via APi
2. visit {baseUrl}/#/settings route
3. Update all fields with valid unoccupied values (random)
4. click Submit
5. Verify that you are redirected to /#/profile/{username} page
6. go back and check that values in form preserved

TC2: should unot update usr settings when filled in occupied username
1. Login to app via APi
2. visit {baseUrl}/#/settings route
3. Update username with occupied value
4. click Submit
5. Verify that network response has proper error about occupied username




