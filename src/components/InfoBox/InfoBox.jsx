import './InfoBox.css';

import { Title, MinorTitle, Description } from "../../styles/globalStyles";

const InfoBox = (props) => {
    return (
        <div className='InfoBox'>
            <div className="InfoBoxHeader">
                <MinorTitle>{props.boxTitle}</MinorTitle>

                <div className="InfoBoxIcon">
                    {props.boxIcon}
                </div>
            </div>

            <div className="InfoBoxContent">
                <Title>{props.boxMinorTitle}</Title>
                <Description>{props.description}</Description>
            </div>
        </div>
    );
}

export default InfoBox;