import React, { useEffect, useState } from "react";

// Resources

import "../../styles/Tasks.scss";

const Tasks = () => {
	//Handlers&Aux

	const APIURL = "https://assets.breatheco.de/apis/fake/todos/user/danieloos";

	function tasksREST( // Takes HTTP request method and callbacks for resolve and reject cases.
		method,
		data = null,
		resolve = () => {},
		reject = () => {}
	) {
		const api = {
			url: APIURL,
			GET: {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			},
			PUT: {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: data
			}
		};
		fetch(api.url, api[method])
			.then(res => res.json())
			.then(arr => {
				resolve(arr);
			})
			.catch(err => {
				reject(err);
			});
	}

	function updateNewTask(ev) {
		setNewTask(ev.target.value);
	}

	function addTask() {
		setTasks([...tasks, { label: newTask, done: false }]);
		setNewTask("");
	}

	function deleteTask(ev) {
		const newTasks = [...tasks];
		if (newTasks.length > 1) newTasks.splice(ev.target.dataset.idx, 1);
		else newTasks[ev.target.dataset.idx].done = true;
		setTasks([...newTasks]);
	}

	//Hooks

	const [tasks, setTasks] = useState(); // Tasks list
	const [newTask, setNewTask] = useState(""); // Input content
	const [firstLoad, setFirstLoad] = useState(true); // Flag for avoiding first rerendering

	useEffect(() => {
		// Runs on component instantiation.
		tasksREST("GET", null, setTasks, console.alert);
	}, []);

	useEffect(() => {
		// Runs on setTasks calls
		if (!firstLoad)
			tasksREST("PUT", JSON.stringify(tasks), console.log, console.alert);
		else if (Array.isArray(tasks)) setFirstLoad(false);
	}, [tasks]);

	return (
		<div className="text-center mt-5">
			<ul>
				{Array.isArray(tasks) && tasks.length === 1 && tasks[0].done ? (
					<p>No pending tasks</p> // Shows if only lonely hidden tasks
				) : Array.isArray(tasks) && tasks.length > 0 ? (
					tasks.map((
						item,
						idx // Else, render tasks if tasks list
					) => (
						<li key={idx} className={item.done ? "hidden" : ""}>
							{item.label}{" "}
							<span data-idx={idx} onClick={deleteTask}>
								[x]
							</span>
						</li>
					))
				) : (
					<p>Waiting for tasks...</p> // If there is not a tasks list at all
				)}
			</ul>
			<div>
				<input
					type="text"
					placeholder="Nueva tarea..."
					value={newTask}
					onChange={updateNewTask}
				/>
				<button onClick={addTask}>+</button>
			</div>
		</div>
	);
};

export default Tasks;
