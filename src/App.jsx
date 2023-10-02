import './App.css'
import './components/list.css'
import './components/task.css'
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Listbar from './components/ListBar';
import TaskBox from './components/TaskBox';

export default function App() {
	const [lists, setLists] = useState([
		{title: "Default List", tasks: {}}, 
		{title: "Second List", tasks: {}}, 
	]);
	const [currentList, setCurrentList] = useState(lists[0]);
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