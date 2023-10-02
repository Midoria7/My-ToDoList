import './App.css'
import './components/list.css'
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Listbar from './components/ListBar';
import TaskBox from './components/TaskBox';

export default function App() {
	const [lists, setLists] = useState([
		{title: "Default List"}
	]);
	const [currentLists, setCurrentLists] = useState(null);
	return (
		<div className="App">
			<Listbar lists = {lists} setLists = {setLists}/>
			<TaskBox />
		</div>
	);
}