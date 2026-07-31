// function sum(...num){
//     const sum=num.reduce((s,i)=>(s+1));
//     return sum;
// }
// let s=0;
// function add(...num){
// for (const i of num) {
//      s+=i;
// }
//     return s;
// }
// export  {sum,add}


export function sum(...num){
    const sum=num.reduce((s,i)=>(s+1));
    return sum;
}

let s=0;

export function add(...num){
for (const i of num) {
     s+=i;
}
    return s;
}