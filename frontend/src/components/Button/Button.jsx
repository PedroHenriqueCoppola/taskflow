import './Button.css';

const Button = (props) => {
    const buttonStyle = {
        height: props.height
    }

    return (
        <button className='Button' style={buttonStyle} onClick={props.onClick}>
            {props.icon && (
                <span className='buttonIcon'>
                    {props.icon}
                </span>
            )}

            <span>{props.content}</span>
        </button>
    );
}

export default Button;