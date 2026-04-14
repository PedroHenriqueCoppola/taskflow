import './Sidebar.css';

import { NavLink } from "react-router-dom";
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
    padding: ${({ isOpen }) => (isOpen ? "2rem" : "2rem 1rem")};
    
    width: ${({ isOpen }) => (isOpen ? "255px" : "60px")};
    transition: width 0.3s ease;
`;

const StyledLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: .8rem;

    width: 100%;
    border-radius: 1rem;
    padding: .8rem 1rem;

    text-decoration: none;
    color: var(--gray);
    font-size: 1.4rem;

    &:hover {
        cursor: pointer;
        background-color: var(--softer-green);
        color: var(--heavier-green);
        font-weight: 600;
    }

    &.active {
        background-color: var(--softer-green);
        color: var(--heavier-green);
        font-weight: 600;
    }
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
                <IconBox size={isOpen ? "3.4rem" : "3rem"}>
                    <ListTodo size={isOpen ? 16 : 12} />
                </IconBox>

                <StyledTitle>TaskFlow</StyledTitle>
            </div>

            <div className="sidebarLinks">
                <SubTitle fontSize="1.2rem">Menu</SubTitle>

                <StyledLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    <LayoutDashboard size={16} />
                    <span className="text">Dashboard</span>
                </StyledLink>

                <StyledLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}>
                    <Calendar size={16} />
                    <span className="text">Calendário</span>
                </StyledLink>

                <StyledLink to="/progress" className={({ isActive }) => isActive ? "active" : ""}>
                    <TrendingUp size={16} />
                    <span className="text">Progresso</span>
                </StyledLink>

                <StyledLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>
                    <ListTodo size={16} />
                    <span className="text">Tasks</span>
                </StyledLink>
            </div>

            <div className="sidebarAdmin">
                <SubTitle fontSize="1.2rem">Admin</SubTitle>

                <div className="adminDiv">
                    <StyledLink to="/admin" className="sidebarItem">
                        <Shield size={16} />
                        <span className="text">Administração</span>
                    </StyledLink>
                </div>
            </div>
        </StyledSidebar>
    )
}

export default Sidebar;
