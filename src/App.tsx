import React, { useState, memo, useCallback, useEffect } from "react";
import "./App.css";
import { Products } from "./pages/Products/Products";

// const Footer = memo(() => {
// 	console.log("footer");
// 	return <></>;
// }); // drugi argument funkcji memo // useMemo

const Footer = () => {
	console.log("footer");
	return <></>;
};

function App() {
	const [state, setState] = useState(0);

	// const memoizedFooter = useMemo(() => <Footer />, []);

	const fetchFoo = useCallback(() => {
		setState(s => s + 1);
	}, []);

	useEffect(() => {
		fetchFoo();
	}, [fetchFoo]);

	return (
		<div className='App'>
			<button onClick={() => setState(s => s + 1)}>klik</button>
			<Products />
		</div>
	);
}

export default App;
