import './ProfileModal.css';

import { User } from "lucide-react";
import { Title } from "../../../styles/globalStyles.js";
import { Mail, Shield, Calendar, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authService';

import InputInfo from '../../InputInfo/InputInfo.jsx';
import Button from '../../Button/Button.jsx';

const ProfileModal = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate('/login');
    };

    const formattedDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString(
            'pt-BR',
            {
                month: 'long',
                year: 'numeric'
            }
        )
        : '';

    return (
        <div className="profileModalApp">
            <div className="profileHeader">
                <div className="profileTitle">
                    <Title fontSize="1.8rem" fontWeight="600">
                        Meu Perfil
                    </Title>
                </div>

                <div className="profileName">
                    <div className="userImage">
                        <User size={32} />
                    </div>

                    <Title fontSize="1.8rem" fontWeight="600">
                        {user?.name}
                    </Title>
                </div>
            </div>

            <div className="profileInfos">
                <InputInfo
                    icon={<Mail size={16} />}
                    description="Email"
                    readonly
                    value={user?.email}
                />

                <InputInfo
                    icon={<Shield size={16} />}
                    description="Tipo de conta"
                    readonly
                    value={(user?.role == 'user') ? "Usuário comum" : "Administrador"}
                />

                <InputInfo
                    icon={<Calendar size={16} />}
                    description="Membro desde"
                    readonly
                    value={formattedDate}
                />
            </div>

            <div className="profileLine"></div>

            <Button
                height={40}
                content="Sair da conta"
                icon={<LogOut size={16} />}
                backgroundColor="var(--button-red)"
                hoverColor="var(--darker-button-red)"
                onClick={handleLogout}
            />
        </div>
    );
}

export default ProfileModal;