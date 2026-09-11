import React from "react";
import ReactDOM from "react-dom/client";

function Book() {
  return (
    <div>
      <img
        src="https://via.placeholder.com/100"
        width={100}
        height={100}
        alt="Book"
      />
      <h2>Title: React</h2>
      <h2>Price: ₹465</h2>
      <button>Add to Cart</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Book Store</h1>
      <Book />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);