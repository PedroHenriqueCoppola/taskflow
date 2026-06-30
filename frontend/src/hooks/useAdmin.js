import { useEffect, useState } from "react";
import { getUsers, toggleUserStatus, deleteUser } from "../services/adminService";

const useAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);

        const response = await getUsers();

        if (response.success) {
            setUsers(response.users);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleStatus = async (userId) => {
        const confirmed = window.confirm("Deseja realmente bloquear este usuário?");

        if (!confirmed) return;

        const user = JSON.parse(localStorage.getItem("user"));

        await toggleUserStatus(user.id, userId);

        fetchUsers();
    };

    const removeUser = async (userId) => {
        const confirmed = window.confirm("Deseja realmente excluir este usuário?");

        if (!confirmed) return;

        const user = JSON.parse(localStorage.getItem("user"));

        await deleteUser(user.id, userId);

        fetchUsers();
    };

    return {
        users,
        loading,
        refresh: fetchUsers,
        toggleStatus,
        removeUser
    };
};

export default useAdmin;