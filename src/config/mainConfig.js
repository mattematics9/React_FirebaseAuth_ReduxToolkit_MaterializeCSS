const appName = 'App Name';
//development or production
const mode = 'production';
//port for the local host for development.  Can be 5000 if you want to switch over the firebase hosting emulator.  But I use "npm start" and port 3000.
const port = '3000';


const getUrl = () => {
    if(mode === 'production'){
        console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
        return `https://${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`;
    }else{
        return `http://localhost:${port}`;
    }
}

export {appName, mode, getUrl};



