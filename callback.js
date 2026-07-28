function register(cb){
    setTimeout(()=>{
     console.log("register here");
     cb();
    },10000);
 }
 
 function login(cb){
     setTimeout(()=>{
         console.log("login here");
         cb();
        },5000);
    
 }
 function getdata(cb){
     setTimeout(()=>{
         console.log("get data");
         cb();
        },3000);
   
 
 }
 function dispalydata(){
     setTimeout(()=>{
         console.log("dispaly data");
        },6000);
 }
 



register(()=>{
    login(()=>{
        getdata(()=>{
            dispalydata();
        });
    });

});


 login();
 getdata();
 dispalydata();
 
 
 console.log("another application");








 //  register(()=>{
//     login(()=>{

//     });
//  });
//  register(
//     login(
//        getdata(
//         dispalydata(

//         )
//     )

//  )
// )