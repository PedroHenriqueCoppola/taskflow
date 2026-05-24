import './Button.css';

const Button = (props) => {
    const buttonStyle = {
        height: props.height,
        '--button-bg': props.backgroundColor || 'var(--standard-green)',
        '--button-hover': props.hoverColor || 'var(--lighter-green)',
        '--button-color': props.color || 'var(--white)'
    };

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