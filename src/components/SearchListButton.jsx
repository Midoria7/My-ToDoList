export default function SearchListButton({handleClick}) {
    return (
        <div className = "search-list-button" onClick = {handleClick}>
            <img className = "search-icon" src = {"\\src\\components\\search_button.png"} alt = "search"/>
        </div>
    );
}