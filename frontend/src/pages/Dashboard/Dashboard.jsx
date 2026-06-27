import './Dashboard.css';

import { useState, useEffect } from "react";
import { Plus, Clock, CircleCheckBig, TrendingUp, RotateCcw } from "lucide-react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";
import {
    formatTaskFrequency,
    shouldShowTaskToday,
    shouldShowTaskThisWeek,
    shouldShowTaskThisMonth,
    isTaskCompletedForCurrentOccurrence
} from "../../utils/taskHelpers";
import { getTasks, getCompletions, completeTask, uncompleteTask } from "../../services/taskService"

import Button from '../../components/Button/Button';
import InfoBox from '../../components/InfoBox/InfoBox';
import FilterBox from '../../components/FilterBox/FilterBox';
import getFilterDateText from '../../utils/getFilterDateText';
import TaskBox from '../../components/TaskBox/TaskBox';
import Tag from '../../components/Tag/Tag';

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("today");

    const [tasks, setTasks] = useState([]);
    const [completions, setCompletions] = useState([]);

    const fetchDashboardData = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem('user')
            );

            const [tasksData, completionsData] =
                await Promise.all([
                    getTasks(user.id),
                    getCompletions(user.id)
                ]);

            if (tasksData.success) {
                setTasks(tasksData.tasks);
            }

            if (completionsData.success) {
                setCompletions(
                    completionsData.completions
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchDashboardData();
        };

        loadData();
    }, []);

    const filteredTasks = tasks.filter(task => {
        switch (activeFilter) {
            case 'today':
                return shouldShowTaskToday(task);

            case 'week':
                return shouldShowTaskThisWeek(task);

            case 'month':
                return shouldShowTaskThisMonth(task);

            default:
                return false;
        }
    });

    const pendingTasksList = filteredTasks.filter(
        task => !isTaskCompletedForCurrentOccurrence(task, completions)
    );

    const completedTasksList = filteredTasks.filter(
        task => isTaskCompletedForCurrentOccurrence(task, completions)
    );

    // Lógica de amostragem das tarefas pendentes
    const pendingTasks = pendingTasksList.length;

    // Lógica de amostragem das concluídas
    const completedToday = completedTasksList.length;

    // Lógica de amostragem da taxa de conclusão
    const completionRate =
        filteredTasks.length
            ? Math.round(
                (
                    completedTasksList.length /
                    filteredTasks.length
                ) * 100
            )
            : 0;

    const handleToggleTask = async (task) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const isCompleted = isTaskCompletedForCurrentOccurrence(task, completions);

            if (isCompleted) {
                await uncompleteTask(task.id, user.id);
            } else {
                await completeTask(task.id, user.id);
            }

            await fetchDashboardData();
        } catch (error) {
            console.error(error);
        }
    };

    const completedLabel = {
        today: 'Concluídas Hoje',
        week: 'Concluídas na Semana',
        month: 'Concluídas no Mês'
    };

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
                    boxMinorTitle={pendingTasks}
                    description="aguardando conclusão"
                />

                <InfoBox
                    boxIcon={<CircleCheckBig size={16}/>}
                    boxTitle={completedLabel[activeFilter]}
                    boxMinorTitle={completedToday}
                    description="tarefas finalizadas"
                />

                <InfoBox
                    boxIcon={<TrendingUp size={16}/>}
                    boxTitle="Taxa de Conclusão"
                    boxMinorTitle={`${completionRate}%`}
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

                {pendingTasksList.map(task => (
                    <TaskBox
                        key={task.id}
                        taskBoxTitle={task.name}
                        description={task.description}
                        onToggleComplete={() => handleToggleTask(task)}
                        isCompleted={false}
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
                ))}
            </div>

            {completedTasksList.length > 0 && (
                <div className="dashboardConcludedTasks">
                    <MinorTitle fontSize="1.2rem" letterSpacing="1px">CONCLUÍDAS</MinorTitle>

                    {completedTasksList.map(task => (
                        <TaskBox
                            key={task.id}
                            taskBoxTitle={task.name}
                            description={task.description}
                            onToggleComplete={() => handleToggleTask(task)}
                            isCompleted={true}
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
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
