import './Dashboard.css';

import { useState } from "react";
import { Plus, Clock, CircleCheckBig, TrendingUp, RotateCcw } from "lucide-react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";

import Button from '../../components/Button/Button';
import InfoBox from '../../components/InfoBox/InfoBox';
import FilterBox from '../../components/FilterBox/FilterBox';
import getFilterDateText from '../../utils/getFilterDateText';
import TaskBox from '../../components/TaskBox/TaskBox';
import Tag from '../../components/Tag/Tag';

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("today");

    return (
        <div className='dashboardApp'>
            <GlobalStyle />

            <div className="dashboardTitle">
                <Title>Dashboard</Title>
                <SubTitle>Acompanhe suas tarefas do dia</SubTitle>
            </div>

            <div className="dashboardBoxes">
                <InfoBox
                    boxIcon={<Clock size={16}/>}
                    boxTitle="Tarefas Pendentes"
                    boxMinorTitle="5"
                    description="aguardando conclusão"
                />

                <InfoBox
                    boxIcon={<CircleCheckBig size={16}/>}
                    boxTitle="Concluídas Hoje"
                    boxMinorTitle="0"
                    description="tarefas finalizadas"
                />

                <InfoBox
                    boxIcon={<TrendingUp size={16}/>}
                    boxTitle="Taxa de Conclusão"
                    boxMinorTitle="0%"
                    description="do total"
                />
            </div>

            <div className="dashboardFilters">
                <FilterBox
                    filterType="Hoje"
                    isActive={activeFilter === "today"}
                    onClick={() => setActiveFilter("today")}
                />

                <FilterBox
                    filterType="Semana"
                    isActive={activeFilter === "week"}
                    onClick={() => setActiveFilter("week")}
                />

                <FilterBox
                    filterType="Mês"
                    isActive={activeFilter === "month"}
                    onClick={() => setActiveFilter("month")}
                />
            </div>

            <div className="dashboardFilterResult">
                <MinorTitle>{getFilterDateText(activeFilter)}</MinorTitle>
            </div>

            <div className="dashboardPendentTasks">
                <MinorTitle fontSize="1.2rem" letterSpacing="1px">PENDENTES</MinorTitle>

                <TaskBox
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

            <div className="dashboardConcludedTasks">
                <MinorTitle fontSize="1.2rem" letterSpacing="1px">CONCLUÍDAS</MinorTitle>
            </div>
        </div>
    )
}

export default Dashboard
