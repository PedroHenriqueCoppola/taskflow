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
    formData.append('single_date', taskData.single_date);

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
    formData.append('single_date', taskData.single_date);

    const response = await fetch(
        `${API_BASE_URL}/tasks/update.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};

export const deleteTask = async (taskId) => {
    const formData = new FormData();

    formData.append('id', taskId);

    const response = await fetch(
        `${API_BASE_URL}/tasks/delete.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};

export const completeTask = async (taskId, userId) => {
    const formData = new FormData();

    formData.append('task_id', taskId);
    formData.append('user_id', userId);

    const response = await fetch(
        `${API_BASE_URL}/tasks/complete.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};

export const uncompleteTask = async (taskId, userId) => {
    const formData = new FormData();

    formData.append('task_id', taskId);
    formData.append('user_id', userId);

    const response = await fetch(
        `${API_BASE_URL}/tasks/uncomplete.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};

export const getCompletions = async (userId) => {
    const response = await fetch(
        `${API_BASE_URL}/completions/list.php?user_id=${userId}`
    );

    return response.json();
};