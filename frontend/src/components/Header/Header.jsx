import './Header.css';

import { PanelLeft, User } from "lucide-react";
import { Title } from "../../styles/globalStyles";
import { useState } from 'react';

import Modal from '../../components/Modal/Modal';
import ProfileModal from '../Modals/ProfileModal/ProfileModal';

const Header = ({ toggleSidebar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="headerLayout">
            <button className="sidebarButton" onClick={toggleSidebar}>
                <PanelLeft size={16} />
            </button>

            <button className="userInfos" onClick={() => setIsModalOpen(true)}>
                <User size={16} />
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width={450}
            >
                <ProfileModal></ProfileModal>
            </Modal>
        </div>
    )
}

export default Header;