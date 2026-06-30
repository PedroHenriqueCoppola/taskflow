import "./NotFound.css";

import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

import Button from "../../components/Button/Button";
import { GlobalStyle, Title, SubTitle } from "../../styles/globalStyles";

const NotFound = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="notFoundApp">
            <GlobalStyle />

            <div className="notFoundContent">
                <div className="notFoundIcon">
                    <SearchX size={34} />
                </div>

                <Title fontSize="5rem">
                    404
                </Title>

                <Title fontSize="3rem" textAlign="center">
                    Página não encontrada
                </Title>

                <SubTitle fontSize="1.6rem" textAlign="center">
                    A página que você está tentando acessar não existe ou foi removida.
                </SubTitle>

                <Link to={user ? "/" : "/login"}>
                    <Button 
                        content={
                            user
                                ? "Voltar ao Dashboard"
                                : "Ir para o Login"
                            }
                    >
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;