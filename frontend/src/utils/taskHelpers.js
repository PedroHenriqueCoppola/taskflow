export const weekDaysMap = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sáb'
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

    return 'Única';
};

export const validateTaskForm = ({
    title,
    frequency,
    selectedDays,
    monthDay,
    time
}) => {
    if (!title.trim()) {
        return 'Digite um título para a tarefa.';
    }

    if (title.trim().length < 3) {
        return 'O título deve ter pelo menos 3 caracteres.';
    }

    if (title.trim().length > 150) {
        return 'O título deve ter no máximo 150 caracteres.';
    }

    if (
        frequency === 'weekly'
        && !selectedDays.length
    ) {
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

    if (time && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return 'Horário inválido.';
    }

    return null;
};

export const shouldShowTaskToday = (task) => {
    const today = new Date();

    const currentDayOfWeek = today.getDay();
    const currentDayOfMonth = today.getDate();

    switch (task.frequency) {
        case 'daily':
        case 'single':
            return true;

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