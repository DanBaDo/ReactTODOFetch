import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [text, setText] = useState("");

	useEffect(() => {
		const url =
			"https://assets.breatheco.de/apis/fake/todos/user/danieloos";
		const parameters = {
			method: "GET",
			contentType: "application/json"
		};

		fetch(url, parameters)
			.then(res => res.json())
			.then(setText)
			.catch(err => setText(err.toString()));
	}, []);

	return <div className="text-center mt-5">{text}</div>;
};

export default Home;
