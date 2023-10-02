import TaskGroup from "./TaskGroup";
import { DragDropContext } from "react-beautiful-dnd";

export default function TaskBox({lists, setLists, currentList, setCurrentList}) {
    function handleRemove() {
        if (confirm("Delete this list?"))
            setLists((prevLists) => {
                const newLists = prevLists.filter((list) => list.title !== currentList.title);
                if (newLists.length === 0) {
                    setLists([{title: "Default List", tasks: []}]);
                    setCurrentList({title: "Default List", tasks: []});
                } else {
                    setCurrentList(newLists[0]);
                }
                return newLists;
            });
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
                <h1 className = "task-box-title">Tasks</h1>
                <button className = "delete-list-button" onClick = {handleRemove}> Delete </button>
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
