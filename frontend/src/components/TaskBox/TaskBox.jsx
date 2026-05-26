import './TaskBox.css';

import { Title, Description } from "../../styles/globalStyles";
import { PencilLine, Trash2 } from "lucide-react";

const TaskBox = (props) => {
    return (
        <div className='taskBox'>
            <div className="taskBoxCheck">
                <button className="checkButton"></button>
            </div>

            <div className="taskBoxContent">
                <div className="taskBoxDetails">
                    <div>
                        <Title fontSize="1.4rem" fontWeight="600">
                            {props.taskBoxTitle}
                        </Title>

                        <Description>
                            {props.description}
                        </Description>
                    </div>

                    {props.showActions && (
                        <div className="editDetails">
                            <button className="taskActionBtn btnBlock" title="Editar tarefa" onClick={props.onEdit}>
                                <PencilLine size={16} strokeWidth={1.5} />
                            </button>

                            <button className="taskActionBtn btnDelete" title="Excluir tarefa">
                                <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="taskBoxTags">
                    {props.tags}
                </div>
            </div>
        </div>
    );
}

export default TaskBox;