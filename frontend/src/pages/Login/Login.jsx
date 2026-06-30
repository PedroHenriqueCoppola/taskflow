import './Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTodo, Mail, Lock } from "lucide-react";
import { GlobalStyle, Title, SubTitle, IconBox, LinkText } from "../../styles/globalStyles";
import { login } from '../../services/authService';
import { toast } from 'sonner';

import Card from "../../components/Card/Card";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        if (!email || !password) {
            toast.warning('Preencha todos os campos.');

            return;
        }

        if (!email.includes('@')) {
            toast.warning('Digite um email válido.');

            return;
        }

        try {
            const data = await login(email, password);

            if (data.success) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(data.user)
                );

                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);

            toast.error('Erro ao realizar login.');
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
