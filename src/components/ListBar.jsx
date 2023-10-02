import AddListButton from './AddListButton.jsx';

export default function ListBar({lists, setLists, currentList, setCurrentList}) {
    function handleAddList() {
        const title = prompt("Enter the title of the new list:");
        if (title) {
            if (lists.find((list) => list.title === title)) {
                alert("List with same name already exists!");
                return;
            }
            setLists((prevLists) => {
                const newLists = [...prevLists];
                newLists.push({
                    title: title,
                    ["To Do"]: [],
                    ["Doing"]: [],
                    ["Done"]: [],
                });
                setCurrentList(newLists[newLists.length - 1]);
                return newLists;
            });
        }
    }

    return (
        <div className='list-bar'>
            <img className='logo' src = {"\\src\\components\\todo_list.svg.png"} alt = 'logo'/>
            <h1 className='list-bar-title'>ToDoLists</h1>
            <div className='list-container'>
                <AddListButton handleClick={handleAddList}/>
                {
                    lists.map((nowList) => {
                        return (
                        <div 
                        key = {nowList.title} 
                        className= {`list over-hide ${currentList.title === nowList.title ? 'selected-list' : null}`}
                        onClick = {() => setCurrentList(nowList)}
                        >
                            {nowList.title}
                        </div>
                        );
                    })
                }
            </div>
        </div>
    );
}