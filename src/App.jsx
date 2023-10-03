import React, { useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import uuid from "react-uuid";
import Listbar from "./components/ListBar";
import TaskBox from "./components/TaskBox";
import "./App.css";
import "./components/list.css";
import "./components/task.css";

export default function App() {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let storedLists = await get("lists");
      if (!storedLists || storedLists.length === 0) {
        storedLists = [
          {
            title: "Default List",
            "To Do": [
              {
                name: "Task 1",
                id: uuid(),
                descrip: "Description 1",
              },
            ],
            Doing: [],
            Done: [],
          },
        ];
        await set("lists", storedLists);
      }
      setLists(storedLists);
      setCurrentList(storedLists[0]);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (lists && lists.length > 0) {
      set("lists", lists);
    }
  }, [lists]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <Listbar lists={lists} setLists={setLists} currentList={currentList} setCurrentList={setCurrentList} />
      <TaskBox lists={lists} setLists={setLists} currentList={currentList} setCurrentList={setCurrentList} />
    </div>
  );
}
