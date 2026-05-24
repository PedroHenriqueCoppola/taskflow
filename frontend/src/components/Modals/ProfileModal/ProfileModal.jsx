import './ProfileModal.css';

import { User } from "lucide-react";
import { Title } from "../../../styles/globalStyles.js";
import { Mail, Shield, Calendar, LogOut } from "lucide-react";

import InputInfo from '../../InputInfo/InputInfo.jsx';
import Button from '../../Button/Button.jsx';

const ProfileModal = () => {
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
                        João Silva
                    </Title>
                </div>
            </div>

            <div className="profileInfos">
                <InputInfo
                    icon={<Mail size={16} />}
                    description="Email"
                    readonly
                    value="joao@gmail.com"
                />

                <InputInfo
                    icon={<Shield size={16} />}
                    description="Tipo de conta"
                    readonly
                    value="Usuário"
                />

                <InputInfo
                    icon={<Calendar size={16} />}
                    description="Membro desde"
                    readonly
                    value="Abril 2025"
                />
            </div>

            <div className="profileLine"></div>

            <Button
                height={40}
                content="Sair da conta"
                icon={<LogOut size={16} />}
                backgroundColor="var(--button-red)"
                hoverColor="var(--darker-button-red)"
            />
        </div>
    );
}

export default ProfileModal;