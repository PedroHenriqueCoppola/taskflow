const getCurrentMonthYear = () => {
    const currentDate = new Date();

    const months = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];

    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${month} de ${year}`;
};

export default getCurrentMonthYear;