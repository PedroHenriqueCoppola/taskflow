import './Header.css';

const Header = ({ toggleSidebar }) => {
    return (
        <div className="headerLayout">
            <button className="menuButton" onClick={toggleSidebar}>
                ☰
            </button>
        </div>
    )
}

export default Header;