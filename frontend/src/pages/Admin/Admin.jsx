import './Admin.css';

import { useState } from "react";
import { GlobalStyle, Title, SubTitle, MinorTitle } from "../../styles/globalStyles";
import { Shield, Ban, Trash2 } from "lucide-react";

const Admin = () => {
    const [users] = useState([
        { id: 1, name: 'Ana Silva', email: 'ana@email.com', status: 'Ativo', tasks: 34 },
        { id: 2, name: 'Carlos Souza', email: 'carlos@email.com', status: 'Ativo', tasks: 18 },
        { id: 3, name: 'Maria Oliveira', email: 'maria@email.com', status: 'Bloqueado', tasks: 7 },
        { id: 4, name: 'João Santos', email: 'joao@email.com', status: 'Ativo', tasks: 52 },
        { id: 5, name: 'Fernanda Lima', email: 'fernanda@email.com', status: 'Bloqueado', tasks: 25 },
        { id: 6, name: 'Luiz Pereira', email: 'luis@email.com', status: 'Ativo', tasks: 89 },
    ]);

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
                                    <span className={`adminStatusBadge ${user.status === 'Ativo' ? 'badgeAtivo' : 'badgeBloqueado'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="alignCenter adminTasksColumn"><MinorTitle fontSize="1.4rem">{user.tasks}</MinorTitle></td>
                                <td>
                                    <div className="adminTableActions">
                                        <button className="adminActionBtn btnBlock" title="Bloquear usuário">
                                            <Ban size={18} strokeWidth={1.5} />
                                        </button>
                                        <button className="adminActionBtn btnDelete" title="Excluir usuário">
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