import './Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTodo, Mail, Lock } from "lucide-react";
import { GlobalStyle, Title, SubTitle, IconBox, LinkText } from "../../styles/globalStyles";
import { login } from '../../services/authService';

import Card from "../../components/Card/Card";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        if (!email || !password) {
            alert('Preencha todos os campos'); // updateModal

            return;
        }

        if (!email.includes('@')) {
            alert('Digite um email válido'); // updateModal

            return;
        }

        try {
            const data = await login(email, password);

            if (data.success) {
                navigate('/');
            } else {
                alert(data.message); // updateModal
            }
        } catch (error) {
            console.error(error);

            alert('Erro ao realizar login'); // updateModal
        }
    };

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input 
                        icon={<Lock size={16} color="#6b7280" />}
                        description="Senha"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button 
                        height={40}
                        content="Entrar"
                        onClick={handleLoginClick}
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
