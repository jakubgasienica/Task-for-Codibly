import React from "react";
import "./App.css";
import { Products } from "./pages/Products/Products";
import { useProducts } from "./pages/Products/useProducts";

function App() {
	const { search } = useProducts();
	return (
		<div className='App'>
			<Products></Products>
		</div>
	);
}

export default App;
