import './Dashboard.css';

import { useState } from "react";
import { Plus, Clock, CircleCheckBig, TrendingUp } from "lucide-react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";

import Button from '../../components/Button/Button';
import InfoBox from '../../components/InfoBox/InfoBox';
import FilterBox from '../../components/FilterBox/FilterBox';
import getFilterDateText from '../../utils/getFilterDateText';

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("today");

    return (
        <div className='dashboardApp'>
            <GlobalStyle />

            <div className="dashboardHeader">
                <div className="dashboardTitle">
                    <Title>Dashboard</Title>
			        <SubTitle>Acompanhe suas tarefas do dia</SubTitle>
                </div>

                <Button
                    height={40}
                    content="Nova tarefa"
                    icon={<Plus size={16} />}
                />
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

            <div className="dashboardTaskCards">
                <MinorTitle fontSize="1.2rem" letterSpacing="1px">PENDENTES</MinorTitle>


            </div>
        </div>
    )
}

export default Dashboard
