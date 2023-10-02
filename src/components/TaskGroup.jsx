import AddTaskButton from "./AddTaskButton";
import Task from "./Task";

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
                        title: currentList.title,
                        tasks: [
                            ...temp.tasks,
                            {name: name, descrip: descrip, status: status}
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
            <div className = "task-container">
                {
                    lists.find((list) => list.title === currentList.title).tasks.map((task) => {
                        if (task.status === status) {
                            return (
                                <Task 
                                key = {task.name}
                                name = {task.name}
                                descrip = {task.descrip}
                                />
                            );
                        }
                    })
                    }
            </div>
        </div>
    )
}