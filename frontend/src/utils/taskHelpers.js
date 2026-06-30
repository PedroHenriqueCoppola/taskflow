export const weekDaysMap = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sáb'
};

export const formatDate = (dateString) => {
    if (!dateString) {
        return '';
    }

    const [year, month, day] = dateString.split('-');

    return `${day}/${month}/${year}`;
};

export const formatTaskFrequency = (task) => {
    if (task.frequency === 'daily') {
        return 'Diária';
    }

    if (task.frequency === 'weekly') {
        if (!task.week_days) {
            return 'Semanal';
        }

        const formattedDays = task.week_days
            .split(',')
            .map(day => weekDaysMap[day])
            .join(', ');

        return `Semanal • ${formattedDays}`;
    }

    if (task.frequency === 'monthly') {
        return `Mensal • Dia ${task.month_day}`;
    }

    if (task.frequency === 'single') {
        return `Única • ${formatDate(task.single_date)}`;
    }
};

export const validateTaskForm = ({
    title,
    frequency,
    selectedDays,
    monthDay,
    singleDate,
    time
}) => {
    if (!title.trim()) {
        return 'Digite um título para a tarefa.';
    }

    if (title.trim().length < 3) {
        return 'O título deve ter pelo menos 3 caracteres.';
    }

    if (title.trim().length > 40) {
        return 'O título deve ter no máximo 40 caracteres.';
    }

    if (frequency === 'weekly' && !selectedDays.length) {
        return 'Selecione pelo menos um dia da semana.';
    }

    if (frequency === 'monthly') {
        const parsedMonthDay = Number(monthDay);

        if (!parsedMonthDay) {
            return 'Informe um dia do mês.';
        }

        if (parsedMonthDay < 1 || parsedMonthDay > 31) {
            return 'O dia do mês deve ser entre 1 e 31.';
        }
    }

    if (frequency === 'single' && !singleDate) {
        return 'Selecione uma data.';
    }

    if (time && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return 'Horário inválido.';
    }

    return null;
};

export const isDateToday = (dateString) => {
    if (!dateString) {
        return false;
    }

    const today = new Date();
    const date = new Date(dateString);

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
};

export const isDateInCurrentWeek = (dateString) => {
    if (!dateString) {
        return false;
    }

    const today = new Date();

    const currentDay = today.getDay();

    const diffToMonday =
        currentDay === 0
            ? -6
            : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const taskDate = new Date(dateString);

    return taskDate >= monday && taskDate <= sunday;
};

export const isDateInCurrentMonth = (dateString) => {
    if (!dateString) {
        return false;
    }

    const today = new Date();
    const taskDate = new Date(dateString);

    return (
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
    );
};

export const shouldShowTaskToday = (task) => {
    const today = new Date();

    const currentDayOfWeek = today.getDay();
    const currentDayOfMonth = today.getDate();

    switch (task.frequency) {
        case 'daily':
            return true;

        case 'single':
            return isDateToday(task.single_date);

        case 'weekly':
            return task.week_days
                ?.split(',')
                .map(Number)
                .includes(currentDayOfWeek);

        case 'monthly':
            return Number(task.month_day) === currentDayOfMonth;

        default:
            return false;
    }
};

export const shouldShowTaskThisWeek = (task) => {
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    switch (task.frequency) {
        case 'daily':
            return true;

        case 'single':
            return isDateInCurrentWeek(task.single_date);

        case 'weekly': {
            const selectedDays = task.week_days
                ?.split(',')
                .map(Number);

            return selectedDays?.length > 0;
        }

        case 'monthly': {
            const monthDay = Number(task.month_day);

            const currentDay = today.getDay();

            const diffToMonday =
                currentDay === 0
                    ? -6
                    : 1 - currentDay;

            const monday = new Date(today);
            monday.setDate(today.getDate() + diffToMonday);

            for (let i = 0; i < 7; i++) {
                const day = new Date(monday);

                day.setDate(monday.getDate() + i);

                if (day.getDate() === monthDay) {
                    return true;
                }
            }

            return false;
        }

        default:
            return false;
    }
};

export const shouldShowTaskThisMonth = (task) => {
    switch (task.frequency) {
        case 'daily':
        case 'weekly':
        case 'monthly':
            return true;

        case 'single':
            return isDateInCurrentMonth(task.single_date);

        default:
            return false;
    }
};

const getTaskCompletions = (task, completions) => {
    return completions.filter(
        completion => completion.task_id === task.id
    );
};

const formatDateToTaskComparison = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const isDailyOrWeeklyOrMonthlyTaskCompleted = (task, completions) => {
    const today = formatDateToTaskComparison(new Date());
    const taskCompletions = getTaskCompletions(task, completions);

    return taskCompletions.some(completion => completion.occurrence_date === today);
};

const isSingleTaskCompleted = (task, completions) => {
    const taskCompletions = getTaskCompletions(task, completions);

    return taskCompletions.length > 0;
}

export const isTaskCompletedForCurrentOccurrence = (task, completions) => {
    switch (task.frequency) {
        case 'daily':
            return isDailyOrWeeklyOrMonthlyTaskCompleted(task, completions);

        case 'weekly':
            return isDailyOrWeeklyOrMonthlyTaskCompleted(task, completions);

        case 'monthly':
            return isDailyOrWeeklyOrMonthlyTaskCompleted(task, completions);

        case 'single':
            return isSingleTaskCompleted(task, completions);

        default:
            return false;
    }
};

export const parseLocalDate = (dateString) => {
    const [year, month, day] = dateString
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
};

export const isSameDay = (dateA, dateB) => {
    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
};

export const shouldTaskExistOnDate = (task, targetDate) => {
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
                .includes(targetDate.getDay());

        case "monthly":
            return (
                Number(task.month_day) ===
                targetDate.getDate()
            );

        case "single":
            if (!task.single_date) {
                return false;
            }

            return isSameDay(parseLocalDate(task.single_date), targetDate);

        default:
            return false;
    }
};

export const isTaskCompletedOnDate = (task, completions, targetDate) => {
    return completions.some(completion => {

        if (completion.task_id !== task.id) {
            return false;
        }

        return isSameDay(
            parseLocalDate(completion.occurrence_date),
            targetDate
        );
    });
};