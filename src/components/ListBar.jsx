import AddListButton from './AddListButton.jsx';

export default function ListBar({lists, setLists, currentList, setCurrentList}) {
    function handleAddList() {
        const title = prompt("Enter the title of the new list:");
        if (title) {
            setLists((prevLists) => {
                return [...prevLists, {title: title, tasks: []}];
            });
        }
    }

    return (
        <div className='list-bar'>
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