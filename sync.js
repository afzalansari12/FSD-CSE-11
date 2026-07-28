function register(){
    waitfordelay(10000);
    console.log("register here");
}

function login(){
    waitfordelay(5000);

    console.log("login here");
}
function getdata(){
    waitfordelay(3000);

    console.log("get data");
}
function dispalydata(){
    waitfordelay(6000);

    console.log("dispaly data");
}

function waitfordelay(delay){
    const mt = Date.now()+delay;
    while(Date.now() <mt){

    };
}
register();
login();
getdata();
dispalydata();


console.log("another application");