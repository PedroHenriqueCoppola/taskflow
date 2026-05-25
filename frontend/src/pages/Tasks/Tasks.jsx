import './Tasks.css';

import { GlobalStyle, Title, SubTitle } from "../../styles/globalStyles";
import { Plus, Clock, RotateCcw } from "lucide-react";
import { useState, useEffect } from 'react';
import { createTask, getTasks } from '../../services/taskService';
import { formatTaskFrequency, validateTaskForm } from '../../utils/taskHelpers';

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

    const [tasks, setTasks] = useState([]);

    const [isCreatingTask, setIsCreatingTask] = useState(false);

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
        const validationError = validateTaskForm({
            title,
            frequency,
            selectedDays,
            monthDay,
            time
        });

        if (validationError) {
            alert(validationError); // updateModal

            return;
        }

        try {
            setIsCreatingTask(true);

            const user = JSON.parse(localStorage.getItem('user'));

            const taskData = {
                user_id: user.id,
                name: title,
                description,
                frequency,
                time: time || null,
                week_days: selectedDays.length
                    ? [...selectedDays]
                        .sort((a, b) => a - b)
                        .join(',')
                    : null,
                month_day: monthDay || null
            };

            const data = await createTask(taskData);

            if (data.success) {
                alert(data.message); // updateModal

                await fetchTasks();

                handleCloseModal();
            } else {
                alert(data.message); // updateModal
            }
        } catch (error) {
            console.error(error);

            alert('Erro ao criar tarefa.'); // updateModal
        } finally {
            setIsCreatingTask(false);
        }
    };

    const fetchTasks = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            const data = await getTasks(user.id);

            if (data.success) {
                setTasks(data.tasks);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleFrequencyChange = (value) => {
        setFrequency(value);

        if (value !== 'weekly') {
            setSelectedDays([]);
        }

        if (value !== 'monthly') {
            setMonthDay('');
        }
    };

    return (
        <div className="tasksApp">
            <GlobalStyle />
			
            <div className="tasksHeader">
                <div className="tasksTitle">
                    <Title>Minhas tarefas</Title>
			        <SubTitle>
                        {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''} cadastrada{tasks.length !== 1 ? 's' : ''}
                    </SubTitle>
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
                    handleFrequencyChange={handleFrequencyChange}
                    isCreatingTask={isCreatingTask}
                />
            </Modal>

            <div className="tasksBoxes">
                {!tasks.length ? (
                    <SubTitle>
                        Nenhuma tarefa cadastrada ainda.
                    </SubTitle>
                ) : (
                    tasks.map((task) => (
                        <TaskBox
                            key={task.id}
                            showActions={true}
                            taskBoxTitle={task.name}
                            description={task.description}
                            tags={
                                <>
                                    <Tag
                                        icon={<RotateCcw size={14} />}
                                        content={formatTaskFrequency(task)}
                                    />

                                    {task.time && (
                                        <Tag
                                            icon={<Clock size={14} />}
                                            content={task.time.slice(0, 5)}
                                        />
                                    )}
                                </>
                            }
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Tasks
