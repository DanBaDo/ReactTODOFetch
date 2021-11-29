import React from "react";

// Config
const restApi = {
	url: "https://assets.breatheco.de/apis/fake/todos/user/danieloos",
	GET: {
		method: "GET",
		contentType: "application/json"
	}
};

// Components
import Tasks from "./Tasks.jsx";

//create your first component
const Home = () => {
	return <Tasks api={restApi} />;
};

export default Home;
