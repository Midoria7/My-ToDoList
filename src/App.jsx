import "./App.css"
import "./components/list.css"
import "./components/task.css"
import React, { useMemo, useState, useCallback, useEffect } from "react";
import uuid from "react-uuid";
import Listbar from "./components/ListBar";
import TaskBox from "./components/TaskBox";

export default function App() {
	const [lists, setLists] = useState(
		() => {
			return localStorage.getItem("lists")
			? JSON.parse(localStorage.getItem("lists"))
			: [
				{
					title: "Default List",
					["To Do"]: [
						{
							name: "Task 1",
							id: uuid(),
							descrip: "Description 1",
						},
					],
					["Doing"]: [],
					["Done"]: [],
				}, 
			];
		}
	);
	const [currentList, setCurrentList] = useState(lists[0]);
	
	function localStore() {
		if (!lists.length) {
			localStorage.setItem("lists", JSON.stringify([
				{
					title: "Default List",
					["To Do"]: [
						{
							name: "Task 1",
							id: uuid(),
							descrip: "Description 1",
						},
					],
					["Doing"]: [],
					["Done"]: [],
				}, 
			]));
			setLists(JSON.parse(localStorage.getItem("lists")));
		} else {
			localStorage.setItem("lists", JSON.stringify(lists));
		}
	}

	useEffect(() => {
		localStore();
	}, [lists]);
	
	return (
		<div className="App">
			<Listbar 
			lists = {lists}
			setLists = {setLists}
			currentList = {currentList}
			setCurrentList = {setCurrentList}
			/>
			<TaskBox 
			lists = {lists}
			setLists = {setLists}
			currentList = {currentList}
			setCurrentList = {setCurrentList}
			/>
		</div>
	);
}