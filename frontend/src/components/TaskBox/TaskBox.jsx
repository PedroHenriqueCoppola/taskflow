import './TaskBox.css';

import { Title, Description } from "../../styles/globalStyles";
import { Check, PencilLine, Trash2 } from "lucide-react";

const TaskBox = (props) => {
    return (
        <div className={`taskBox ${props.isCompleted ? 'completed' : ''}`}>
            <div className="taskBoxCheck">
                <button
                    className={`checkButton ${props.isCompleted ? 'completed' : ''}`}
                    onClick={props.onToggleComplete}
                >
                    {!!props.isCompleted && (
                        <Check size={14} strokeWidth={3} />
                    )}
                </button>
            </div>

            <div className="taskBoxContent">
                <div className="taskBoxDetails">
                    <div>
                        <Title fontSize="1.4rem" fontWeight="600" className={props.isCompleted ? 'completedTitle' : ''}>
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

                            <button className="taskActionBtn btnDelete" title="Excluir tarefa" onClick={props.onDelete}>
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