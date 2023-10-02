import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import {Droppable, Draggable} from "react-beautiful-dnd";
import uuid from "react-uuid";

export default function TaskGroup({status, lists, setLists, currentList}) {
    function handleAdd() {
        const name = prompt("Enter task name:");
        const descrip = prompt("Enter task description:");
        if (name && descrip) {
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