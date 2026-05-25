import './InputInfo.css';

import { Description, InputText } from "../../styles/globalStyles";

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