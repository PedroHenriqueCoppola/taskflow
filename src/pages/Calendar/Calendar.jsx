import './Calendar.css';

import { useState } from "react";
import { GlobalStyle, Title, SubTitle } from "../../styles/globalStyles";

import FilterBox from '../../components/FilterBox/FilterBox';
import getCurrentMonthYear from '../../utils/getCurrentMonthYear';

const Calendar = () => {
    const [activeFilter, setActiveFilter] = useState("today");

    return (
        <div className='calendarApp'>
            <GlobalStyle />

            <div className="calendarHeader">
                <div className="calendarTitle">
                    <Title>Calendário</Title>
			        <SubTitle>{getCurrentMonthYear()}</SubTitle>
                </div>

                <div className="calendarFilters">
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
        </div>
    )
}

export default Calendar
