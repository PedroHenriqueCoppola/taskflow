import API_BASE_URL from './api';

export const login = async (email, password) => {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(
        `${API_BASE_URL}/login.php`,
        {
            method: 'POST',
            body: formData
        }
    );

    return response.json();
};