const a=[1,2,3,4,5,6,7,8,9];
const even=a.filter((i)=>i%2==0);
console.log("even=",even);
const square=a.map((i)=>i*i);
console.log("square=",square);
const sum=square.reduce((i,j)=>i+j);
console.log("sum=",sum);