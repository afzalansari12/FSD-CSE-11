const bookData=
[{image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 465}, {image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 500}, {image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 600}, {image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 700}, {image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 800}, {image:"https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1494421362i/29324861.jpg", price : 900}];
function Book(props){
const div=document.createElement("div");
div.setAttribute("class","card");
const image=document.createElement("img");
image.setAttribute("src",props.image);
image.setAttribute("width","100px");
image.setAttribute("height","100px");
const h2=document.createElement("h2");
h2.innerHTML="Price: INR "+props.price;
const bt=document.createElement("button");
bt.innerText="Add to Cart";
div.appendChild(image);
div.appendChild(h2);
div.appendChild(bt);
return div;
}
const bookstore=bookData.map((i)=>Book(i));
const parent=document.getElementById("root");
for(b of bookstore){
    parent.appendChild(b);
}