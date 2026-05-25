import './Tasks.css';

import { GlobalStyle, Title, SubTitle } from "../../styles/globalStyles";
import { Plus, Clock, RotateCcw } from "lucide-react";
import { useState } from 'react';
import { createTask } from '../../services/taskService';

import Button from "../../components/Button/Button";
import TaskBox from '../../components/TaskBox/TaskBox';
import Tag from '../../components/Tag/Tag';
import Modal from '../../components/Modal/Modal';
import TaskModal from '../../components/Modals/TaskModal/TaskModal';

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [time, setTime] = useState('');
    const [monthDay, setMonthDay] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

    const resetTaskForm = () => {
        setTitle('');
        setDescription('');
        setFrequency('daily');
        setTime('');
        setMonthDay('');
        setSelectedDays([]);
    };

    const handleCloseModal = () => {
        resetTaskForm();
        setIsModalOpen(false);
    };

    const handleCreateTask = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const taskData = {
                user_id: user.id,
                name: title,
                description,
                frequency,
                time: time || null,
                week_days: selectedDays.length ? selectedDays.join(',') : null,
                month_day: monthDay || null
            };

            const data = await createTask(taskData);

            if (data.success) {
                alert(data.message); // updateModal

                handleCloseModal();
            } else {
                alert(data.message); // updateModal
            }
        } catch (error) {
            console.error(error);

            alert('Erro ao criar tarefa.'); // updateModal
        }
    };

    return (
        <div className="tasksApp">
            <GlobalStyle />
			
            <div className="tasksHeader">
                <div className="tasksTitle">
                    <Title>Minhas tarefas</Title>
			        <SubTitle>5 tarefas cadastradas</SubTitle>
                </div>

                <Button
                    height={40}
                    content="Nova tarefa"
                    icon={<Plus size={16} />}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                width={450}
            >
                <TaskModal
                    modalTitle="Nova Tarefa"

                    title={title}
                    setTitle={setTitle}

                    description={description}
                    setDescription={setDescription}

                    frequency={frequency}
                    setFrequency={setFrequency}

                    time={time}
                    setTime={setTime}

                    monthDay={monthDay}
                    setMonthDay={setMonthDay}

                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}

                    onClose={handleCloseModal}
                    handleCreateTask={handleCreateTask}
                />
            </Modal>

            <div className="tasksBoxes">
                <TaskBox
                    showActions={true}
                    taskBoxTitle="Estudar React"
                    description="Continuar o curso de React avançado"
                    tags={
                        <>
                            <Tag
                                icon={<RotateCcw size={14} />}
                                content="Diária"
                            />

                            <Tag
                                icon={<Clock size={14} />}
                                content="07:00"
                            />
                        </>
                    }
                />

                <TaskBox
                    showActions={true}
                    taskBoxTitle="Exercício físico"
                    description="30 minutos de caminhada ou academia"
                    tags={
                        <>
                            <Tag
                                icon={<RotateCcw size={14} />}
                                content="Diária"
                            />

                            <Tag
                                icon={<Clock size={14} />}
                                content="22:00"
                            />
                        </>
                    }
                />

                <TaskBox
                    showActions={true}
                    taskBoxTitle="Revisar finanças"
                    description="Conferir gastos e orçamento do mês"
                    tags={
                        <>
                            <Tag
                                icon={<RotateCcw size={14} />}
                                content="Semanal"
                            />
                        </>
                    }
                />

                <TaskBox
                    showActions={true}
                    taskBoxTitle="Reunião de equipe"
                    description="Alinhamento semanal com o time"
                    tags={
                        <>
                            <Tag
                                icon={<RotateCcw size={14} />}
                                content="Semanal"
                            />

                            <Tag
                                icon={<Clock size={14} />}
                                content="09:00"
                            />
                        </>
                    }
                />

                <TaskBox
                    showActions={true}
                    taskBoxTitle="Ler 20 páginas"
                    description="Livro: Atomic Habits"
                    tags={
                        <>
                            <Tag
                                icon={<RotateCcw size={14} />}
                                content="Diária"
                            />
                        </>
                    }
                />
            </div>
        </div>
    )
}

export default Tasks
