const getFilterDateText = (activeFilter) => {
    const currentDate = new Date();

    const weekDays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    if (activeFilter === "today") {
        const dayName = weekDays[currentDate.getDay()];
        const day = currentDate.getDate();
        const month = months[currentDate.getMonth()];

        return `${dayName}, ${day} de ${month}`;
    }

    if (activeFilter === "week") {
        const currentDay = currentDate.getDay();

        const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date(currentDate);
        monday.setDate(currentDate.getDate() + diffToMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const startDay = monday.getDate();
        const endDay = sunday.getDate();

        const month = months[monday.getMonth()];

        return `${startDay} - ${endDay} de ${month}`;
    }

    if (activeFilter === "month") {
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        return `${month} de ${year}`;
    }

    return "";
};

export default getFilterDateText;