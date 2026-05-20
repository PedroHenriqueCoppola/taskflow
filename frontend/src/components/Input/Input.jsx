import './Input.css';
import styled from "styled-components";


const Input = (props) => {
    const InputText = styled.h3`
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--black);
        text-decoration: none;
    `;

    return (
        <>
            <InputText>{props.description}</InputText>

            <div className="inputContainer">
                {props.icon && (
                    <span className="icon">
                        {props.icon}
                    </span>
                )}

                <input
                    className="inputField"
                    placeholder={props.placeholder}
                    type={props.type}
                />
            </div>
        </>
    );
}

export default Input;