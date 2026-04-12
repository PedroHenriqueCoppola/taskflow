import './Login.css';
import styled from "styled-components";
import { ListTodo, Mail, Lock } from "lucide-react";
import { GlobalStyle, Title, SubTitle, IconBox } from "../../styles/globalStyles";
import Card from "../../components/Card/Card";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Login = () => {
    const LinkText = styled.a`
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--standard-green);
        text-decoration: none;
        transition: background-color 0.2s ease;

        &:hover {
            font-weight: 600;
        }
    `;

    return (
        <div className="loginApp">
            <GlobalStyle />

            <div className="upperText">
                <IconBox>
                    <ListTodo size={24} />
                </IconBox>

                <Title>TaskFlow</Title>

                <SubTitle>Organize sua rotina com eficiência</SubTitle>
            </div>

            <div className="loginCard">
                <Card width={400}>
                    <Input 
                        icon={<Mail size={16} color="#6b7280" />}
                        description="Email"
                        placeholder="seu@email.com"
                        type="email"
                    />

                    <Input 
                        icon={<Lock size={16} color="#6b7280" />}
                        description="Senha"
                        placeholder="••••••••"
                        type="password"
                    />

                    <Button 
                        height={40}
                        content="Entrar"
                    />
                </Card>
            </div>

            <div className="lowerText">
                <SubTitle>
                    Não tem uma conta?
                    <LinkText href="/signup"> Cadastre-se</LinkText>
                </SubTitle>
            </div>
        </div>
    )
}

export default Login
