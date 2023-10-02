export default function Task({name, descrip, provided, snapshot}) {
    return (
        <div 
        className = "task"
        ref = {provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
            <div className = "task-name over-hide">{name}</div>
            <p className = "task-descrip">{descrip}</p>
        </div>
    );
}