export default function Task({name, descrip}) {
    return (
        <div className='task'>
            <div className='task-name'>
                {name}
            </div>
            <div className='task-descrip'>
                {descrip}
            </div>
        </div>
    );
}