

const isDev= true;

let API_URL ="";

if(isDev) {
    API_URL = "https://jsonplaceholder.typicode.com";
}

export default API_URL;


// import.meta.env.VITE_API_URL;