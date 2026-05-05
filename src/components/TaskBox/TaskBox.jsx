import './TaskBox.css';

import { Title, Description } from "../../styles/globalStyles";
import { Clock } from "lucide-react";

import Tag from '../Tag/Tag';

const TaskBox = (props) => {
    return (
        <div className='taskBox'>
            <div className="taskBoxCheck">
                <button className="checkButton"></button>
            </div>

            <div className="taskBoxContent">
                <Title fontSize="1.4rem" fontWeight="600">
                    {props.taskBoxTitle}
                </Title>

                <Description>
                    {props.description}
                </Description>

                <div className="taskBoxTags">
                    {props.tags}
                </div>
            </div>
        </div>
    );
}

export default TaskBox;