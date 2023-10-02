export default function AddListButton({handleClick}) {
    return (
        <div className='add-list-button' onClick={handleClick}>
            + New List
        </div>
    );
}