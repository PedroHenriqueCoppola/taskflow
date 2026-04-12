import './Button.css';

const Button = (props) => {
    const buttonStyle = {
        height: props.height
    }

    return (
        <button className='Button' style={buttonStyle}>
            {props.content}
        </button>
    );
}

export default Button;