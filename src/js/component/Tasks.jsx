import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Tasks = ({ api }) => {
	function fetchTasksArray(api) {
		fetch(api.url, api.GET)
			.then(res => res.json())
			.then(arr => {
				setTasks(arr);
			})
			.catch(err => {
				setTasks([]);
			});
	}

	//Hooks

	const [tasks, setTasks] = useState();

	useEffect(() => {
		fetchTasksArray(api);
	}, []);

	return (
		<div className="text-center mt-5">
			<ul>
				{Array.isArray(tasks) && tasks.length > 0 ? (
					tasks.map((item, idx) => <li key={idx}>{item.label}</li>)
				) : Array.isArray(tasks) && tasks.lenght === 0 ? (
					<p>No pending tasks</p>
				) : (
					<p>Waiting for tasks...</p>
				)}
			</ul>
		</div>
	);
};

Tasks.propTypes = {
	api: PropTypes.object.isRequired
};

export default Tasks;
