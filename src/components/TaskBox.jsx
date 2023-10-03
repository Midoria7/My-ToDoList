import uuid from "react-uuid";
import TaskGroup from "./TaskGroup";
import { DragDropContext } from "react-beautiful-dnd";
import { Dropdown } from "rsuite";

export default function TaskBox({lists, setLists, currentList, setCurrentList}) {
    function handleDeleteList() {
        if (confirm("Delete this list?"))
            setLists((prevLists) => {
                const newLists = prevLists.filter((list) => list.title !== currentList.title);
                if (newLists.length === 0) {
                    setLists([{
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
                    },]);
                    setCurrentList({
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
                    },);
                } else {
                    setCurrentList(newLists[0]);
                }
                return newLists;
            });
    }

    function handleRenameList() {
        const title = prompt("Enter new list title:");
        if (title) {
            if (lists.find((list) => list.title === title)) {
                alert("List with same name already exists!");
                return;
            }
            setLists((prevLists) => {
                const newLists = [...prevLists];
                const index = prevLists.findIndex((list) => list.title === currentList.title);
                const temp = newLists[index];
                newLists.splice(index, 1, 
                    {
                        ...temp,
                        title: title,

                    }
                );
                setCurrentList(newLists[index]);
                return newLists;
            });
        }
    }

    function DropdownMenu() {
        return (
            <Dropdown className = "dropdown-menu">
                <Dropdown.Item className = "rename-list-button" onClick = {handleRenameList}> Rename List </Dropdown.Item>
                <Dropdown.Item className = "delete-list-button" onClick = {handleDeleteList}> Delete List </Dropdown.Item>
            </Dropdown>
        );
    }

    function handleDragEnd(result) {
        if (!result.destination) return;
        const {source, destination} = result;
        const curList = lists.find((list) => list.title === currentList.title);
        const taskCopy = curList[source.droppableId][source.index];
        // Remove From Source
        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.title === currentList.title) {
                    const taskList = list[source.droppableId];
                    taskList.splice(source.index, 1);
                    return {
                        ...list,
                        [source.droppableId]: taskList,
                    }
                } else {
                    return list;
                }
            })
        );
        // Add to Destination
        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.title === currentList.title) {
                    const taskList = list[destination.droppableId];
                    taskList.splice(destination.index, 0, taskCopy);
                    return {
                        ...list,
                        [destination.droppableId]: taskList,
                    }
                } else {
                    return list;
                }
            })
        );
    }

    return (
        <div className = "task-box">
            <header className = "task-box-header">
                <h1 className = "task-box-title">{currentList.title}</h1>
                {/* <button className = "rename-list-button" onClick = {handleRenameList}> Rename </button>
                <button className = "delete-list-button" onClick = {handleDeleteList}> Delete </button> */}
                <DropdownMenu />
            </header>
            <DragDropContext onDragEnd = {(result) => handleDragEnd(result)}>
                <div className = "task-box-body">
                    <TaskGroup 
                    status = "To Do"
                    lists = {lists}
                    setLists = {setLists}
                    currentList = {currentList}
                    />
                    <TaskGroup 
                    status = "Doing"
                    lists = {lists}
                    setLists = {setLists}
                    currentList = {currentList}
                    />
                    <TaskGroup 
                    status = "Done"
                    lists = {lists}
                    setLists = {setLists}
                    currentList = {currentList}
                    />
                </div>
            </DragDropContext>
        </div>
    )
}
