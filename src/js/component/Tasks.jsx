import React, { useEffect, useState } from "react";

// Resources

import "../../styles/Tasks.scss";

const Tasks = () => {
	//Handlers&Aux

	const APIURL = "https://assets.breatheco.de/apis/fake/todos/user/danieloos";

	function tasksREST(
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

	const [tasks, setTasks] = useState();
	const [newTask, setNewTask] = useState("");
	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		tasksREST("GET", null, setTasks, () => setTasks([]));
	}, []);

	useEffect(() => {
		if (!firstLoad)
			tasksREST("PUT", JSON.stringify(tasks), console.log, console.alert);
		else if (Array.isArray(tasks)) setFirstLoad(false);
	}, [tasks]);

	return (
		<div className="text-center mt-5">
			<ul>
				{Array.isArray(tasks) && tasks.length === 1 && tasks[0].done ? (
					<p>No pending tasks</p>
				) : Array.isArray(tasks) && tasks.length > 0 ? (
					tasks.map((item, idx) => (
						<li key={idx} className={item.done ? "hidden" : ""}>
							{item.label}{" "}
							<span data-idx={idx} onClick={deleteTask}>
								[x]
							</span>
						</li>
					))
				) : (
					<p>Waiting for tasks...</p>
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
