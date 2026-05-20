import './Progress.css';

import { useState } from "react";
import { Trophy, CalendarDays, TrendingUp } from "lucide-react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";

import FilterBox from '../../components/FilterBox/FilterBox';
import InfoBox from '../../components/InfoBox/InfoBox';
import Card from '../../components/Card/Card';

const Progress = () => {
    const [activeFilter, setActiveFilter] = useState("week");

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
                        boxMinorTitle="Sexta-Feira"
                        description="maior taxa de conclusão"
                    />

                    <InfoBox
                        boxIcon={<CalendarDays size={16}/>}
                        boxTitle="Total no Período"
                        boxMinorTitle="28"
                        description="tarefas concluídas"
                    />

                    <InfoBox
                        boxIcon={<TrendingUp size={16}/>}
                        boxTitle="Conclusão média"
                        boxMinorTitle="78%"
                        description="no período selecionado"
                    />
                </div>
            </div>

            <div className="progressGraphs">
                <MinorTitle fontSize="1.4rem" letterSpacing="1px" fontWeight={600}>GRÁFICOS</MinorTitle>

                <div className="graphsDiv">
                    <Card width="100%" height="33rem"></Card>
                    <Card width="100%" height="33rem"></Card>
                </div>
            </div>
        </div>
    )
}

export default Progress
