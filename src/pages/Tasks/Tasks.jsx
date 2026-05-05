import './Tasks.css';

import { GlobalStyle, Title, SubTitle } from "../../styles/globalStyles";
import { Plus, Clock, RotateCcw } from "lucide-react";

import Button from "../../components/Button/Button";
import TaskBox from '../../components/TaskBox/TaskBox';
import Tag from '../../components/Tag/Tag';

const Tasks = () => {
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
                />
            </div>

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
