import {
    parseLocalDate,
    taskExistsOnDate,
    taskCompletedOnDate
} from "./taskHelpers";

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
            parseLocalDate(completion.occurrence_date);

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
        const date = parseLocalDate(completion.occurrence_date);
        const day = date.getDay();

        count[day] = (count[day] || 0) + 1;
    });

    const bestDay = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];

    return days[bestDay];
};

export const getAverageCompletionRate = (tasks, completions, period) => {
    if (!tasks.length) {
        return 0;
    }

    const today = new Date();

    let totalOccurrences = 0;
    let completedOccurrences = 0;

    let startDate;
    let endDate;

    if (period === "week") {
        startDate = new Date(today);

        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(today.getDate() - today.getDay());

        endDate = new Date(startDate);

        endDate.setDate(startDate.getDate() + 6);
    } else {
        startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        endDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        );
    }

    for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
    ) {
        const currentDate = new Date(date);

        const existingTasks = tasks.filter(task =>
            taskExistsOnDate(task, currentDate)
        );

        totalOccurrences += existingTasks.length;

        completedOccurrences += existingTasks.filter(task =>
            taskCompletedOnDate(task, completions, currentDate)
        ).length;
    }

    if (!totalOccurrences) {
        return 0;
    }

    return Math.round(
        (completedOccurrences / totalOccurrences) * 100
    );
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
        const date = parseLocalDate(
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
        const date = parseLocalDate(completion.occurrence_date);

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
        const date = parseLocalDate(completion.occurrence_date);

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

export const getCompletionRateChartData = (tasks, completions, period) => {
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

        const today = new Date();

        const firstDay = new Date(today);
        firstDay.setHours(0, 0, 0, 0);
        firstDay.setDate(today.getDate() - today.getDay());

        const data = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(firstDay);
            currentDate.setDate(firstDay.getDate() + i);

            const existingTasks = tasks.filter(task => taskExistsOnDate(task, currentDate));
            const completedTasks = existingTasks.filter(task => taskCompletedOnDate(task, completions, currentDate));

            data.push({
                label: WEEK_DAYS[currentDate.getDay()],
                total: existingTasks.length,
                completed: completedTasks.length,
                value: existingTasks.length
                    ? Math.round(
                        (completedTasks.length /
                        existingTasks.length) * 100
                    )
                    : 0
            });
        }

        return data;
    }

    if (period === "month") {
        const today = new Date();
        const weeks = [];
        const totalWeeks =
            Math.ceil(
                new Date(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    0
                ).getDate() / 7
            );

        for (let week = 0; week < totalWeeks; week++) {
            let total = 0;
            let completed = 0;

            const firstDay = week * 7 + 1;
            const lastDay = Math.min(
                firstDay + 6,
                new Date(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    0
                ).getDate()
            );

            for (let day = firstDay; day <= lastDay; day++) {
                const currentDate = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    day
                );

                const existingTasks = tasks.filter(task => taskExistsOnDate(task, currentDate));

                total += existingTasks.length;

                completed += existingTasks.filter(task =>
                    taskCompletedOnDate(task, completions, currentDate)
                ).length;
            }

            weeks.push({
                label: `Sem ${week + 1}`,
                total,
                completed,
                value: total
                    ? Math.round(
                        (completed / total) * 100
                    )
                    : 0
            });
        }

        return weeks;
    }

    return [];
};