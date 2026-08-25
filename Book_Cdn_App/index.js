function book(props){
    const image= React.createElement("img",{src:"",width:"100px",height:"100px"},null);
    const title= React.createElement("h2",{style:{color:"red"}},"Title:ReactJs"+props.title);
    const price= React.createElement("h2",{style:{color:"green"}},"price:465/-"+props.price);
    const btn = React.createElement("button", { style: { color: "blue" } }, "AddToCart" );
    const div = React.createElement("div", { className: "book" }, [image, title, price, btn]);


  return div;
}
const bookData=[{image:"",title:"reactjs",price:465},
                {image:"",title:"nodejs",price:435},
                {image:"",title:"expressjs",price:965}
];

function App(){
  const bookstore =   bookData.map((b)=>{
           return book(b);
    })
    const div = React.createElement("div",{className:"bookstore"},bookstore);
     return div;
}
const parent = document.getElementById("root");
const root=ReactDOM.createRoot(parent);
// root.render(book());
root.render(App());
