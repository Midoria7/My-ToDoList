import AddListButton from './AddListButton.jsx';

export default function ListBar(props) {
    const lists = props.lists;
    const setLists = props.setLists;
    
    function handleAddList() {
        const title = prompt("Enter the title of the new list:");
        if (title) {
            setLists((prevLists) => {
                return [...prevLists, {title: title}];
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
                        <div key={nowList.title} className='list over-hide'>
                            {nowList.title}
                        </div>
                        );
                    })
                }
            </div>
        </div>
    );
}