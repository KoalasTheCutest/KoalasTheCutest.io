let LOCAL = false; // true means i want to run app against local db, false means use remote db

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost";
}
else{
    // for mongoDB connection string add the name of the db after .net/ .... also update pw
    URI = "mongodb+srv://Yasir77:Password@inclassexercise.zqdrgi6.mongodb.net/contacts?retryWrites=true&w=majority&appName=InClassExercise";
    HostName = "MongoDB Atlas";
}

export {URI, HostName};

export const SessionSecret = "INFT2202SESSIONSecret";

