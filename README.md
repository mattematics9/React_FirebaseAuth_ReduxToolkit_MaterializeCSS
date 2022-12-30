# React, Firebase Authentication, Redux Toolkit, and Materialize CSS Starter Code:

## About

Firebase Authentication starter code using React, Redux Toolkit for global state management, and Materialize CSS for minimal styling.  

Auth Features (src/components/auth): 
1) Authentication with: email and password, Google, and Apple.  Can use all three for the same email.  
2) Password Reset
3) Email Verification

Settings (src/components/Settings) for when a user is logged in.  
1) Change Display Name
2) Change Email
3) Change Password
4) Change Phone Number (not finished)

## Steps:

1) Clone the repo: git clone https://github.com/mattematics9/React_FirebaseAuth_ReduxToolkit_MaterializeCSS.git NameOfProject

2) Create project in the firebase console.  

3) Firebase Configuration:

  Create a .env.local file and input all firebase configuration values from the firebase console (located in the project settings):

      REACT_APP_FIREBASE_API_KEY = 
      REACT_APP_FIREBASE_AUTH_DOMAIN = 
      REACT_APP_FIREBASE_PROJECT_ID = 
      REACT_APP_FIREBASE_STORAGE_BUCKET = 
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 
      REACT_APP_FIREBASE_APP_ID = 
      REACT_APP_FIREBASE_MEASUREMENT_ID = 

  src/config/firebaseConfig.js will read in these values:

      const firebaseConfig = {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID,
          measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };

4) Enter 'npm install' in terminal to download project dependencies.  

5) Enter 'firebase init' in terminal.  Setup Firestore, Hosting, Storage, and Emulators.  

6) Edit the main configuration file: src/mainConfig.js

      const appName = 'Enter name of your app'.  
      
      const mode = either 'development' or 'production'.  
          mode = 'development' will make the host http://localhost:3000 and connect the firebase emulators.
          mode = 'production' will make sure the firebase domain is used and not the local host, and the emulators will not be connected.  
      
      const port = 'whatever port you want to use for local development'.  It's set at 3000.  You can switch to 5000 for the firebase hosting emulator.             You can ignore this if mode = 'production'

7) Either enable Apple Sign In by joining the Apple Developer Program (annual fee of $99) and then following https://firebase.google.com/docs/auth/web/apple, or delete the Apple Sign In button (located at src/components/auth/AppleLogin.js).


## To Do List:

- create a cloud function that deletes users if they have not verified their email within a certain time period.  However, don't delete the user if the user switched emails and got locked out because emailVerified = false.  Need a work around for this.  

- problem with letting a user update their email in settings: after the email is updated, a user cannot get into their account until they verify with email verificaiton.  but what if they give an email that is not theirs?  then their email never gets verified and they cannot get past the email verificaiton screen and access their account. even worse, the above cloud function would delete their account.  there is an "edit email" option on the email verification page that allows users to switch emails.  maybe a listener that watches the database?  a "switching email document" or "switching email flag or property", and if that document, flag, or property is not deleted within a certain amount of time, the email is reverted back to the original.  maybe this can help?  https://stackoverflow.com/questions/65259521/make-sure-a-user-verified-their-email-before-signing-them-in.  Or, here is my stackoverflow question: https://stackoverflow.com/questions/74321919/using-firebase-auth-for-my-react-web-app-problems-regarding-account-creation-ha

- have to enable email link sign-in in the firebase console.  On the Sign in method tab, enable the Email/Password provider. Note that email/password sign-in must be enabled to use email link sign-in.  In the same section, enable Email link (passwordless sign-in) sign-in method.

- don't include phone number just yet.  texts can be a later feature.  

- On Safari, google sign in will cache the user.  so if you logout and click google sign in again, it won't give options for other google users and will automatically sign in to the same user.  There is no pop up with options.  needed to clear history first, then it will work.  

- Apple sign in not working.  "auth/operation-not-allowed"



## For Production:

- In order to securely pass a continue URL, the domain for the URL will need to be added as an Authorized domain in the Firebase console. This is done in the Authentication section by adding this domain to the list of Authorized domains under the Sign-in method tab if it is not already there.


## Notes about Auth Identity Providers:

- Apple: enable sign in with Apple in firebase console.  

- When you use any identity provider (Google, Facebook, GitHub, etc) to sign into Firebase there is a one time exchange to get the user's profile information.  There is no connection to the Identity Provider after that. In fact the user could delete their Google account entirely and the Firebase auth user would continue to exist.  It's a one-time update done at the time of the first token exchange.

- idp account created first and then password account created with same email:
If you create a google account first (e.g., example@gmail.com), when you sign in the email will be verified.
If you try to create an email/password account with example@gmail.com, it will not let you create the account 
because one already exists.  If you try to change the email via the Settings page when you are logged in, it 
will throw an error (Error: auth/wrong-password). 

- email/password account created first:

1) If you create an account with email and password and don't use Google or Apple, you will first have to verify the email.  In settings you can change the email.  You will be immediately taken to the email verification screen.  Once you verify you will be logged in with the new email.  If you switched to an incorrect email, you can switch back to the orginial or a different email with the "edit email" option on the email verification page.  

2) If you create an account with email and password and then link a google account to it afterwards that has the same email, it will be successful and you will have 2 Objects in the provider Data array in the user auth object.  The Display Name that is indicated for the Google idp will populate both arrays, and it will replace the display name you had for the email/password object.  If you add another idp, such as Apple, the display name for Apple will replace the display name for email/password, but it will not replace the display name for the Google object in the provider data array.  However, if you login with google, it will show the display name for apple and email/password.  This is because the last idp to sign up will populate the primary display name property for all the idp's in the provider data array.

3) Create an email/password account.  Then sign in with a google account with same email.  Go to settings.  Change the email using the password for the email/password account.  This will go through successfully and you will then be redirected to the email verificaiton page. The user object's primary email property will be populated with the new email.  And the email field in the email/password object in the provider data array will also be populated with the newly created email.  The google object will have the original google email.  But at this point, emailVerified is false.  if you signout, and then try and sign back in with the google account, it will be stuck on the email verification page with the new email and not the google email.  If you create an apple account with the same original email, it goes through.  emailVerified is now true again. But, it is the only object in the provider data, so it is not linked to wither the email/password or google accounts.  

Possible Solution: you cannot change the email of an account that has linked auth providers.  you must first unlink the auth providers.  

## CORS Configuration:

To download data directly in the browser, you must configure your Cloud Storage bucket for cross-origin access (CORS). This can be done with the gsutil command line tool, which you can install from here.
If you don't want any domain-based restrictions (the most common scenario), copy this JSON to a file named cors.json:

[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

Run gsutil cors set cors.json gs://<your-cloud-storage-bucket> to deploy these restrictions.
