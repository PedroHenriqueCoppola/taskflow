import './Sidebar.css';

import { Link } from "react-router-dom";
import { SubTitle, IconBox } from "../../styles/globalStyles";
import { ListTodo, LayoutDashboard, Calendar, TrendingUp, Shield } from "lucide-react";

import styled from "styled-components";

const StyledSidebar = styled.div`
    height: 100vh;
    background-color: var(--white);
    border-right: 1px solid var(--border-gray);

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding: 2rem;
    
    width: ${({ isOpen }) => (isOpen ? "255px" : "50px")};
    transition: width 0.3s ease;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--gray);
    font-size: 1.4rem;
`;

const StyledTitle = styled.h2`
    color: var(--heavier-gray);
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
`;

const Sidebar = ({ isOpen }) => {
    return (
        <StyledSidebar isOpen={isOpen} className={isOpen ? "open" : "closed"}>
            <div className="sidebarLogo">
                <IconBox size="3.4rem">
                    <ListTodo size={16} />
                </IconBox>

                <StyledTitle>TaskFlow</StyledTitle>
            </div>

            <div className="sidebarLinks">
                <SubTitle fontSize="1.2rem">Menu</SubTitle>

                <div className='dashboardDiv'>
                    <LayoutDashboard size={16} color="#6b7280" />
                    <StyledLink to="/">Dashboard</StyledLink>
                </div>

                <div className="calendarDiv">
                    <Calendar size={16} color="#6b7280" />
                    <StyledLink to="/calendar">Calendário</StyledLink>
                </div>

                <div className="progressDiv">
                    <TrendingUp size={16} color="#6b7280" />
                    <StyledLink to="/progress">Progresso</StyledLink>
                </div>

                <div className="tasksDiv">
                    <ListTodo size={16} color="#6b7280" />
                    <StyledLink to="/tasks">Tasks</StyledLink>
                </div>
            </div>

            <div className="sidebarAdmin">
                <SubTitle fontSize="1.2rem">Admin</SubTitle>

                <div className="adminDiv">
                    <Shield size={16} color="#6b7280" />
                    <StyledLink to="/admin">Administração</StyledLink>
                </div>
            </div>
        </StyledSidebar>
    )
}

export default Sidebar;
