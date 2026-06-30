import API_BASE_URL from './api';

export const getUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/List.php`);
    return response.json();
};

export const toggleUserStatus = async (adminId, userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/ToggleStatus.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            admin_id: adminId,
            user_id: userId
        })
    });

    return response.json();
};

export const deleteUser = async (adminId, userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/Delete.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            admin_id: adminId,
            user_id: userId
        })
    });

    return response.json();
};