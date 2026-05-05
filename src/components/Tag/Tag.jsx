import './Tag.css';

const Tag = (props) => {
    return (
        <div className='tag'>
            {props.icon}
            {props.content}
        </div>
    );
}

export default Tag;