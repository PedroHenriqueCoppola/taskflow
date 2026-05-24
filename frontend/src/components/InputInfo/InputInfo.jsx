import './InputInfo.css';
import styled from "styled-components";

import { Description } from "../../styles/globalStyles";

const InputText = styled.h3`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--black);
    text-decoration: none;
`;

const InputInfo = (props) => {
    return (
        <div className="inputInfoContainer">
            <span className="icon">
                {props.icon}
            </span>

            <div className="infos">
                <Description>{props.description}</Description>

                <InputText>{props.value}</InputText>
            </div>
        </div>
    );
}

export default InputInfo;