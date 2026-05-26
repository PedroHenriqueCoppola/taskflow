import API_BASE_URL from './api';

export const createTask = async (taskData) => {
    const formData = new FormData();

    formData.append('user_id', taskData.user_id);
    formData.append('name', taskData.name);
    formData.append('description', taskData.description);
    formData.append('frequency', taskData.frequency);
    formData.append('time', taskData.time);
    formData.append('week_days', taskData.week_days);
    formData.append('month_day', taskData.month_day);

    const response = await fetch(
        `${API_BASE_URL}/tasks/create.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};

export const getTasks = async (userId) => {
    const response = await fetch(
        `${API_BASE_URL}/tasks/list.php?user_id=${userId}`
    );

    return response.json();
};

export const updateTask = async (taskData) => {
    const formData = new FormData();

    formData.append('id', taskData.id);
    formData.append('name', taskData.name);
    formData.append('description', taskData.description);
    formData.append('frequency', taskData.frequency);
    formData.append('time', taskData.time);
    formData.append('week_days', taskData.week_days);
    formData.append('month_day', taskData.month_day);

    const response = await fetch(
        `${API_BASE_URL}/tasks/update.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};