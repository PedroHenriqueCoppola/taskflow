import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUsers, toggleUserStatus, deleteUser } from "../services/adminService";
import { confirmToast } from "../utils/confirmToast";

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

    const toggleStatus = (userId) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const selectedUser = users.find(user => user.id === userId);
        const isBlocking = selectedUser.status === "ativo";

        confirmToast({
            title: isBlocking
                ? "Bloquear usuário?"
                : "Desbloquear usuário?",
            description: isBlocking
                ? "O usuário perderá acesso ao sistema."
                : "O usuário poderá acessar novamente o sistema.",
            confirmLabel: isBlocking
                ? "Bloquear"
                : "Desbloquear",

            onConfirm: async () => {
                const response = await toggleUserStatus(currentUser.id, userId);

                if (response.success) {
                    await fetchUsers();

                    toast.success(
                        isBlocking
                            ? "Usuário bloqueado."
                            : "Usuário desbloqueado."
                    );
                } else {
                    toast.error(response.message);
                }
            }
        });
    };

    const removeUser = (userId) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        confirmToast({
            title: "Excluir usuário?",
            description:
                "Todos os dados do usuário serão removidos permanentemente.",
            confirmLabel: "Excluir",

            onConfirm: async () => {
                const response = await deleteUser(currentUser.id, userId);

                if (response.success) {
                    await fetchUsers();

                    toast.success("Usuário excluído.");
                } else {
                    toast.error(response.message);
                }
            }
        });
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