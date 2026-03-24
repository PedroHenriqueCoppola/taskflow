import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <Link to="/">Dashboard</Link>
            <Link to="/calendar">Calendário</Link>
            <Link to="/progress">Progresso</Link>
            <Link to="/tasks">Tasks</Link>
        </div>
    )
}

export default Sidebar;
