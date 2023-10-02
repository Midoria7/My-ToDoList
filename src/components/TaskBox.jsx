import TaskGroup from "./TaskGroup";

export default function TaskBox({lists, setLists, currentList, setCurrentList}) {
    function handleRemove() {
        if (confirm("Delete this list?"))
            setLists((prevLists) => {
                const newLists = prevLists.filter((list) => list.title !== currentList.title);
                if (newLists.length === 0) {
                    setLists([{title: "Default List", tasks: {}}]);
                    setCurrentList({title: "Default List", tasks: {}});
                } else {
                    setCurrentList(newLists[0]);
                }
                return newLists;
            });
    }

    return (
        <div className = "task-box">
            <header className = "task-box-header">
                <h1 className = "task-box-title">Tasks</h1>
                <button className = "delete-list-button" onClick = {handleRemove}> Delete </button>
            </header>
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
        </div>
    )
}
