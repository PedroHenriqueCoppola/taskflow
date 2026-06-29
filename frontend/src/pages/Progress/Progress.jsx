import './Progress.css';

import { useState } from "react";
import { Trophy, CalendarDays, TrendingUp } from "lucide-react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";
import {
    getFilteredCompletions,
    getTotalCompleted,
    getBestDay,
    getAverageCompletionRate
} from "../../utils/progressHelpers";
import { getCompletedChartData, getCompletionRateChartData } from "../../utils/progressHelpers";

import FilterBox from '../../components/FilterBox/FilterBox';
import InfoBox from '../../components/InfoBox/InfoBox';
import Card from '../../components/Card/Card';
import useProgress from '../../hooks/useProgress';
import useTasks from '../../hooks/useTasks';
import ProgressBarChart from "../../components/ProgressBarChart/ProgressBarChart";
import ProgressLineChart from "../../components/ProgressLineChart/ProgressLineChart";

const Progress = () => {
    const [activeFilter, setActiveFilter] = useState("week");
    const [completedChartFilter, setCompletedChartFilter] = useState("day");
    const [completionChartFilter, setCompletionChartFilter] = useState("week");
    const [rateChartFilter, setRateChartFilter] = useState("week");

    const {
        tasks,
        completions
    } = useProgress();

    const filteredCompletions = getFilteredCompletions(completions, activeFilter);
    const totalCompleted = getTotalCompleted(filteredCompletions);
    const bestDay = getBestDay(filteredCompletions);
    const averageCompletionRate = getAverageCompletionRate(tasks, filteredCompletions);

    const completedChartData = getCompletedChartData(
        completions,
        completedChartFilter
    );

    return (
        <div className='progressApp'>
            <GlobalStyle />

            <div className="progressHeader">
                <Title>Progresso</Title>
                <SubTitle>Acompanhe sua evolução</SubTitle>
            </div>

            <div className="progressSummary">
                <div className="summaryTitle">
                    <MinorTitle fontSize="1.4rem" letterSpacing="1px" fontWeight={600}>RESUMO</MinorTitle>

                    <div className="summaryFilters">
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
                </div>

                <div className="summaryInfoBoxes">
                    <InfoBox
                        boxIcon={<Trophy size={16}/>}
                        boxTitle="Melhor Dia"
                        boxMinorTitle={bestDay}
                        description="maior taxa de conclusão"
                    />

                    <InfoBox
                        boxIcon={<CalendarDays size={16}/>}
                        boxTitle="Total no Período"
                        boxMinorTitle={totalCompleted}
                        description="tarefas concluídas"
                    />

                    <InfoBox
                        boxIcon={<TrendingUp size={16}/>}
                        boxTitle="Conclusão média"
                        boxMinorTitle={`${averageCompletionRate}%`}
                        description="no período selecionado"
                    />
                </div>
            </div>

            <div className="progressGraphs">
                <MinorTitle fontSize="1.4rem" letterSpacing="1px" fontWeight={600}>GRÁFICOS</MinorTitle>

                <div className="graphsDiv">
                    <Card width="100%" height="33rem">
                        <div className="graphHeader">
                            <Title fontSize="1.8rem">
                                Tarefas Concluídas
                            </Title>

                            <div className="graphFilters">

                                <FilterBox
                                    size="small"
                                    filterType="Dia"
                                    isActive={completedChartFilter === "day"}
                                    onClick={() => setCompletedChartFilter("day")}
                                />

                                <FilterBox
                                    size="small"
                                    filterType="Semana"
                                    isActive={completedChartFilter === "week"}
                                    onClick={() => setCompletedChartFilter("week")}
                                />

                                <FilterBox
                                    size="small"
                                    filterType="Mês"
                                    isActive={completedChartFilter === "month"}
                                    onClick={() => setCompletedChartFilter("month")}
                                />
                            </div>
                        </div>

                        <div className="graphContent">
                            <ProgressBarChart data={completedChartData} />
                        </div>
                    </Card>

                    <Card width="100%" height="33rem">
                        <div className="graphHeader">
                            <Title fontSize="1.8rem">
                                Taxa de Conclusão
                            </Title>

                            <div className="graphFilters">

                                <FilterBox
                                    size="small"
                                    filterType="Semana"
                                    isActive={rateChartFilter === "week"}
                                    onClick={() => setRateChartFilter("week")}
                                />

                                <FilterBox
                                    size="small"
                                    filterType="Mês"
                                    isActive={rateChartFilter === "month"}
                                    onClick={() => setRateChartFilter("month")}
                                />
                            </div>
                        </div>

                        <div className="graphContent">
                            <ProgressLineChart
                                data={getCompletionRateChartData(
                                    tasks,
                                    completions,
                                    rateChartFilter
                                )}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Progress
