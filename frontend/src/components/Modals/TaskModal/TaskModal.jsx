import './TaskModal.css';

import { Title, InputText } from "../../../styles/globalStyles.js";
import { Plus } from "lucide-react";

import FilterBox from '../../../components/FilterBox/FilterBox.jsx';
import Button from '../../Button/Button.jsx';
import Input from '../../Input/Input.jsx';

const TaskModal = (props) => {
    const frequencyOptions = [
        { value: 'daily', label: 'Diária' },
        { value: 'weekly', label: 'Semanal' },
        { value: 'monthly', label: 'Mensal' },
        { value: 'single', label: 'Única' }
    ];

    const daysOfWeek = [
        { id: 0, label: 'Dom' },
        { id: 1, label: 'Seg' },
        { id: 2, label: 'Ter' },
        { id: 3, label: 'Qua' },
        { id: 4, label: 'Qui' },
        { id: 5, label: 'Sex' },
        { id: 6, label: 'Sáb' }
    ];

    const toggleDay = (dayId) => {
        if (props.selectedDays.includes(dayId)) {
            // Se já está selecionado, remove do array
            props.setSelectedDays(props.selectedDays.filter(id => id !== dayId));
        } else {
            // Se não está, adiciona ao array
            props.setSelectedDays([...props.selectedDays, dayId]);
        }
    };

    return (
        <div className="taskModalApp">
            <div className="taskModalTitle">
                <div className="taskTitleIcon">
                    <Plus size={20} />
                </div>

                <Title fontSize="1.8rem" fontWeight="600">
                    {props.modalTitle}
                </Title>
            </div>

            <div className="taskModalFields">
                <Input
                    description="Nome da tarefa"
                    placeholder="Ex: Estudar React"
                    type="text"
                    value={props.title}
                    onChange={(e) => props.setTitle(e.target.value)}
                />

                <Input
                    description="Descrição"
                    placeholder="Detalhes sobre a tarefa..."
                    height="8rem"
                    multiline
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                />

                <div className="taskModalRow">
                    <div className="frequencyInput">
                        <Input
                            description="Frequência"
                            type="select"
                            options={frequencyOptions}
                            value={props.frequency}
                            onChange={(e) => props.handleFrequencyChange(e.target.value)}
                        />
                    </div>

                    <div className="timeInput">
                        <Input
                            description="Horário"
                            type="time"
                            value={props.time}
                            onChange={(e) => props.setTime(e.target.value)}
                        />
                    </div>
                </div>

                {props.frequency === "weekly" && (
                    <div className="weekDaysContainer">
                        <InputText className="weekDaysLabel">Dias da semana</InputText>
                        <div className="weekDaysButtons">
                            {daysOfWeek.map(day => (
                                <button
                                    key={day.id}
                                    type="button"
                                    className={`weekDayBtn ${props.selectedDays.includes(day.id) ? 'selected' : ''}`}
                                    onClick={() => toggleDay(day.id)}
                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {props.frequency === "monthly" && (
                    <Input
                        description="Dia do mês"
                        placeholder="Ex: 15"
                        type="number"
                        min="1"
                        max="31"
                        value={props.monthDay}
                        onChange={(e) => props.setMonthDay(e.target.value)}
                    />
                )}
            </div>

            <div className="taskModalButtons">
                <FilterBox
                    filterType="Cancelar"
                    onClick={props.onClose}
                />

                <Button
                    height={40}
                    content={
                        props.isEditing
                            ? (
                                props.isUpdatingTask
                                    ? 'Salvando...'
                                    : 'Salvar alterações'
                            )
                            : (
                                props.isCreatingTask
                                    ? 'Criando...'
                                    : 'Criar tarefa'
                            )
                    }
                    onClick={
                        props.isEditing
                            ? props.handleUpdateTask
                            : props.handleCreateTask
                    }
                    disabled={props.isCreatingTask || props.isUpdatingTask}
                />
            </div>
        </div>
    );
}

export default TaskModal;