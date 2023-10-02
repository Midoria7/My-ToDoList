import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import {Droppable, Draggable} from "react-beautiful-dnd";
import uuid from "react-uuid";

export default function TaskGroup({status, lists, setLists, currentList}) {
    function handleAdd() {
        const name = prompt("Enter task name:");
        const descrip = prompt("Enter task description:");
        if (name && descrip) {
            if (lists.find((list) => list.title === currentList.title)?.[status].find((task) => task.name === name)) {
                alert("Task with same name already exists!");
                return;
            }
            setLists((prevLists) => {
                const newLists = [...prevLists];
                const index = prevLists.findIndex((list) => list.title === currentList.title);
                const temp = newLists[index];
                newLists.splice(index, 1, 
                    {
                        ...temp,
                        [status]: [
                            ...temp[status],
                            {name: name, id: uuid(), descrip: descrip}
                        ]
                    }
                );
                return newLists;
            });
        }
    }

    function handleRemove(id) {
        if (confirm("Delete this task?")) {
            setLists((prevLists) => 
                prevLists.map((list) => {
                    if (list.title === currentList.title) {
                        const taskList = list[status];
                        const index = taskList.findIndex((task) => task.id === id);
                        taskList.splice(index, 1);
                        return {
                            ...list,
                            [status]: [...taskList]
                        }
                    } else {
                        return list;
                    }
                })
            );
        }
    }

    function handleModify(id) {
        const name = prompt("New task name:");
        const descrip = prompt("New task description:");
        if (name && descrip) {
            if (lists.find((list) => list.title === currentList.title)?.[status].find((task) => task.name === name)) {
                alert("Task with same name already exists!");
                return;
            }
            setLists((prevLists) =>
                prevLists.map((list) => {
                    if (list.title === currentList.title) {
                        const taskList = list[status];
                        const index = taskList.findIndex((task) => task.id === id);
                        const modifiedTask = {
                            ...taskList[index],
                            name,
                            descrip,
                        };
                        taskList.splice(index, 1);
                        taskList.splice(index, 0, modifiedTask);
                        return {
                            ...list,
                            [status]: [...taskList]
                        }
                    } else {
                        return list;
                    }
                })
            );
        }
    }

    return (
        <div className = "task-group">
            {status}
            <AddTaskButton handleClick = {handleAdd} />
            <Droppable droppableId = {status}>
                {
                    (provided, snapshot) => {
                        return (
                            <div
                            className = "task-container"
                            ref = {provided.innerRef}
                            {...provided.droppableProps}
                            >
                                {
                                    lists.find((list) => list.title === currentList.title)
                                    ?.[status].map((task, index) => (
                                        <Draggable
                                        key = {task.id}
                                        draggableId = {task.id}
                                        index = {index}
                                        >
                                            {
                                                (provided, snapshot) => (
                                                    <Task 
                                                    name = {task.name}
                                                    descrip = {task.descrip}
                                                    id = {task.id}
                                                    provided = {provided}
                                                    snapshot = {snapshot}
                                                    handleRemove = {handleRemove}
                                                    handleModify = {handleModify}
                                                    />
                                                )
                                            }
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                }
            </Droppable>
        </div>
    )
}