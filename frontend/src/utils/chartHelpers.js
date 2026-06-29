const parseDate = (dateString) => {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
};

export const getCompletionChartData = (completions, period) => {
    if (period === "week") {
        const days = [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb"
        ];

        const data = days.map(day => ({day, completed: 0}));

        completions.forEach(completion => {
            const date = parseDate(completion.occurrence_date);

            data[date.getDay()].completed++;
        });

        return data;
    }

    if (period === "month") {
        const today = new Date();

        const lastDay = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        ).getDate();

        const data = [];

        for (let day = 1; day <= lastDay; day++) {
            data.push({
                day: day.toString(),
                completed: 0
            });
        }

        completions.forEach(completion => {
            const date = parseDate(
                completion.occurrence_date
            );

            data[date.getDate() - 1].completed++;
        });

        return data;
    }

    return [];
};