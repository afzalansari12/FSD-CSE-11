function register(){
     return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("register here");
            reject("failed to register");
         },10000);
     })
 }
 
 function login(){
     return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("login here");
            },5000);
     } )
    
 }
 function getdata(){
     return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("get data");
            },3000);
     })
   
 
 }
 function dispalydata(){
     setTimeout(()=>{
         console.log("dispaly data");
        },6000);
 }
 
// register().then(login).then(getdata).then(dispalydata).catch((err)=>{
//     console.log("error",err);
// })

 async function test(){
    try{
     await register();
     await login();
     await getdata();
     await dispalydata();
    }catch(err){
        console.log("error",err);
    }
}

   

test();
console.log("another application");
