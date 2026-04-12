import { Link } from "react-router-dom";
import { GlobalStyle } from "../../styles/globalStyles";
import styled from "styled-components";

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background-color: #1e1e1e;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #ccc;
    font-size: 16px;
    transition: 0.2s;

    &:hover {
        color: #fff;
    }
`;

const Sidebar = () => {
    return (
        <>
            <GlobalStyle />
            <StyledSidebar>
                <StyledLink to="/">Dashboard</StyledLink>
                <StyledLink to="/calendar">Calendário</StyledLink>
                <StyledLink to="/progress">Progresso</StyledLink>
                <StyledLink to="/tasks">Tasks</StyledLink>
            </StyledSidebar>
        </>
    )
}

export default Sidebar;
