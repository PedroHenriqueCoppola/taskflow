import './PublicLayout.css';
import { GlobalStyle } from "../../styles/globalStyles.js";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className='publicLayoutApp'>
            <GlobalStyle />
            <Outlet />
        </div>
    )
}

export default PublicLayout
