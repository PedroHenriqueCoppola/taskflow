import './Admin.css';

import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";
import { Shield, Ban, Trash2 } from "lucide-react";

import useAdmin from '../../hooks/useAdmin';

const Admin = () => {
    const {
        users,
        toggleStatus,
        removeUser
    } = useAdmin();

    return (
        <div className='adminApp'>
            <GlobalStyle />

            <div className="adminHeader">
                <div className="securityIcon">
                    <Shield size={20}/>
                </div>

                <div className="adminTitle">
                    <Title>Administração</Title>
                    <SubTitle>Gerencie os usuários do sistema</SubTitle>
                </div>
            </div>

            <div className="adminTableContainer">
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th className="alignCenter">Tarefas</th>
                            <th className="alignCenter">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="adminNameColumn"><Title fontSize="1.5rem" fontWeight="500">{user.name}</Title></td>
                                <td className="adminEmailColumn"><MinorTitle fontSize="1.4rem" fontWeight={400}>{user.email}</MinorTitle></td>
                                <td>
                                    <span className={`adminStatusBadge ${user.status === "ativo" ? 'badgeAtivo' : 'badgeBloqueado'}`}>
                                        {user.status === "ativo" ? "Ativo" : "Bloqueado"}
                                    </span>
                                </td>
                                <td className="alignCenter adminTasksColumn"><MinorTitle fontSize="1.4rem">{user.tasks}</MinorTitle></td>
                                <td>
                                    <div className="adminTableActions">
                                        <button className="adminActionBtn btnBlock" title="Bloquear usuário" onClick={() => toggleStatus(user.id)}>
                                            <Ban size={18} strokeWidth={1.5} />
                                        </button>
                                        <button className="adminActionBtn btnDelete" title="Excluir usuário" onClick={() => removeUser(user.id)}>
                                            <Trash2 size={18} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;