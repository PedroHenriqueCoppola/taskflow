import './Header.css';

import { PanelLeft, User } from "lucide-react";

const Header = ({ toggleSidebar }) => {
    return (
        <div className="headerLayout">
            <button className="sidebarButton" onClick={toggleSidebar}>
                <PanelLeft size={16} />
            </button>

            <button className="userInfos">
                <User size={16} />
            </button>
        </div>
    )
}

export default Header;