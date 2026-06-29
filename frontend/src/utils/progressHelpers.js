const parseDate = (dateString) => {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
};

const isWithinCurrentWeek = (date) => {
    const today = new Date();

    const firstDay = new Date(today);
    firstDay.setHours(0, 0, 0, 0);
    firstDay.setDate(today.getDate() - today.getDay());

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    lastDay.setHours(23, 59, 59, 999);

    return date >= firstDay && date <= lastDay;
};

const isWithinCurrentMonth = (date) => {
    const today = new Date();

    return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const getFilteredCompletions = (completions, period) => {
    return completions.filter(completion => {
        const completionDate =
            parseDate(completion.occurrence_date);

        switch (period) {
            case "week":
                return isWithinCurrentWeek(completionDate);

            case "month":
                return isWithinCurrentMonth(completionDate);

            default:
                return false;
        }
    });
};

export const getTotalCompleted = (filteredCompletions) => {
    return filteredCompletions.length;
};

export const getBestDay = (filteredCompletions) => {
    if (!filteredCompletions.length) {
        return "-";
    }

    const days = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    const count = {};

    filteredCompletions.forEach(completion => {
        const date = parseDate(completion.occurrence_date);
        const day = date.getDay();

        count[day] = (count[day] || 0) + 1;
    });

    const bestDay = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];

    return days[bestDay];
};

export const getAverageCompletionRate = (tasks, filteredCompletions) => {
    if (!tasks.length) {
        return 0;
    }

    return Math.round((filteredCompletions.length / tasks.length) * 100);
};

const WEEK_DAYS = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"
];

export const getDailyCompletedData = (completions) => {
    const data = WEEK_DAYS.map(day => ({
        label: day,
        value: 0
    }));

    const filtered = getFilteredCompletions(
        completions,
        "week"
    );

    filtered.forEach(completion => {
        const date = parseDate(
            completion.occurrence_date
        );

        data[date.getDay()].value++;
    });

    return data;
};

export const getWeeklyCompletedData = (completions) => {
    const data = [
        { label: "Sem 1", value: 0 },
        { label: "Sem 2", value: 0 },
        { label: "Sem 3", value: 0 },
        { label: "Sem 4", value: 0 },
        { label: "Sem 5", value: 0 }
    ];

    const filtered = getFilteredCompletions(
        completions,
        "month"
    );

    filtered.forEach(completion => {
        const date = parseDate(completion.occurrence_date);

        const week = Math.floor((date.getDate() - 1) / 7);

        if (data[week]) {
            data[week].value++;
        }
    });

    return data.filter(item => item.value > 0);
};

export const getMonthlyCompletedData = (completions) => {
    const today = new Date();

    const months = [];

    for (let i = 2; i >= 0; i--) {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
        );

        months.push({
            month: date.getMonth(),
            year: date.getFullYear(),
            label: date.toLocaleDateString("pt-BR", {
                month: "short"
            }),
            value: 0
        });
    }

    completions.forEach(completion => {
        const date = parseDate(completion.occurrence_date);

        const month = months.find(item =>
            item.month === date.getMonth() &&
            item.year === date.getFullYear()
        );

        if (month) {
            month.value++;
        }
    });

    return months.map(({ label, value }) => ({
        label,
        value
    }));
};

export const getCompletedChartData = (completions, period) => {
    switch (period) {
        case "day":
            return getDailyCompletedData(completions);

        case "week":
            return getWeeklyCompletedData(completions);

        case "month":
            return getMonthlyCompletedData(completions);

        default:
            return [];
    }
};

export const getCompletionRateChartData = (
    tasks,
    completions,
    period
) => {
    if (!tasks.length) {
        return [];
    }

    if (period === "week") {
        const WEEK_DAYS = [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb"
        ];

        const data = WEEK_DAYS.map(label => ({
            label,
            completed: 0,
            total: 0,
            value: 0
        }));

        const filteredCompletions = getFilteredCompletions(
            completions,
            "week"
        );

        filteredCompletions.forEach(completion => {
            const date = parseDate(
                completion.occurrence_date
            );

            data[date.getDay()].completed++;
        });

        for (let i = 0; i < 7; i++) {
            const dayTasks = tasks.filter(task => {
                switch (task.frequency) {

                    case "daily":
                        return true;

                    case "weekly":
                        if (!task.week_days) {
                            return false;
                        }

                        return task.week_days
                            .split(",")
                            .map(Number)
                            .includes(i);

                    case "monthly":
                        return false;

                    case "single":
                        if (!task.single_date) {
                            return false;
                        }

                        return (
                            parseDate(task.single_date).getDay() === i
                        );

                    default:
                        return false;
                }
            });

            if (i === 1) {
                console.log(
                    dayTasks.map(task => ({
                        id: task.id,
                        nome: task.name,
                        frequencia: task.frequency,
                        single_date: task.single_date,
                        week_days: task.week_days
                    }))
                );
            }

            data[i].total = dayTasks.length;

            data[i].value = dayTasks.length
                ? Math.round(
                    (data[i].completed / dayTasks.length) * 100
                )
                : 0;
        }

        return data;
    }

    if (period === "month") {
        const today = new Date();

        const weeks = [
            { label: "Sem 1", completed: 0, total: 0, value: 0 },
            { label: "Sem 2", completed: 0, total: 0, value: 0 },
            { label: "Sem 3", completed: 0, total: 0, value: 0 },
            { label: "Sem 4", completed: 0, total: 0, value: 0 },
            { label: "Sem 5", completed: 0, total: 0, value: 0 }
        ];

        const filteredCompletions = getFilteredCompletions(
            completions,
            "month"
        );

        filteredCompletions.forEach(completion => {
            const date = parseDate(
                completion.occurrence_date
            );

            const week = Math.floor(
                (date.getDate() - 1) / 7
            );

            if (weeks[week]) {
                weeks[week].completed++;
            }
        });

        weeks.forEach((week, index) => {
            const firstDay = index * 7 + 1;
            const lastDay = firstDay + 6;

            let total = 0;

            for (let day = firstDay; day <= lastDay; day++) {
                tasks.forEach(task => {

                    switch (task.frequency) {

                        case "daily":
                            total++;
                            break;

                        case "weekly": {
                            if (!task.week_days) {
                                break;
                            }

                            const date = new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                day
                            );

                            if (
                                task.week_days
                                    .split(",")
                                    .map(Number)
                                    .includes(date.getDay())
                            ) {
                                total++;
                            }

                            break;
                        }

                        case "monthly":
                            if (
                                Number(task.month_day) === day
                            ) {
                                total++;
                            }

                            break;

                        case "single":
                            if (!task.single_date) {
                                break;
                            }

                            {
                                const taskDate = parseDate(
                                    task.single_date
                                );

                                if (
                                    taskDate.getDate() === day &&
                                    taskDate.getMonth() === today.getMonth() &&
                                    taskDate.getFullYear() === today.getFullYear()
                                ) {
                                    total++;
                                }
                            }

                            break;

                        default:
                            break;
                    }
                });
            }

            week.total = total;

            week.value = total
                ? Math.round(
                    (week.completed / total) * 100
                )
                : 0;
        });

        return weeks.filter(
            week => week.total > 0
        );
    }

    return [];
};