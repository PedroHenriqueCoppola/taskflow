import './Card.css';

const Card = (props) => {
    const cardStyle = {
        height: props.height,
        width: props.width
    }

    return (
        <div className='Card' style={cardStyle}>
            {props.children}
        </div>
    );
}

export default Card;