import React, { useEffect, useState } from "react";

const Tasks = () => {
	//Handlers&Aux

	function tasksREST(
		method,
		data = null,
		resolve = () => {},
		reject = () => {}
	) {
		const api = {
			url: "https://assets.breatheco.de/apis/fake/todos/user/danieloos",
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
		//tasksREST("PUT", JSON.stringify(tasks), console.log, console.alert);
		setNewTask("");
	}

	function deleteTask(ev) {
		const newTasks = [...tasks];
		newTasks.splice(ev.target.dataset.idx, 1);
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
				{Array.isArray(tasks) && tasks.length > 0 ? (
					tasks.map((item, idx) => (
						<li key={idx}>
							{item.label}{" "}
							<span data-idx={idx} onClick={deleteTask}>
								[x]
							</span>
						</li>
					))
				) : Array.isArray(tasks) && tasks.lenght === 0 ? (
					<p>No pending tasks</p>
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
