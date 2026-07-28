function register(){
   setTimeout(()=>{
    console.log("register here");
   },10000);
   
}

function login(){
    setTimeout(()=>{
        console.log("login here");
       },5000);

}
function getdata(){
    setTimeout(()=>{
        console.log("get data");
       },3000);


}
function dispalydata(){
    setTimeout(()=>{
        console.log("dispaly data");
       },6000);

  
}

// function waitfordelay(delay){
//     const mt = Date.now()+delay;
//     while(Date.now() <mt){

//     };
// }
register();
login();
getdata();
dispalydata();


console.log("another application");