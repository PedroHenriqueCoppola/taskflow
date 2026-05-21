import './SignUp.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListTodo, User, Mail, Lock } from "lucide-react";
import { GlobalStyle, Title, SubTitle, IconBox, LinkText } from "../../styles/globalStyles";
import { register } from '../../services/authService';

import Card from "../../components/Card/Card";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUpClick = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert('Preencha todos os campos.'); // updateModal

            return;
        }

        if (!email.includes('@')) {
            alert('Digite um email válido.'); // updateModal

            return;
        }

        if (password.length < 4) {
            alert('A senha deve ter pelo menos 4 caracteres.'); // updateModal

            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.'); // updateModal

            return;
        }

        try {
            const data = await register(name, email, password);

            if (data.success) {
                alert('Usuário criado com sucesso.'); // updateModal

                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);

            alert('Erro ao criar usuário');
        }
    };

    return (
        <div className="signUpApp">
            <GlobalStyle />

            <div className="upperText">
                <IconBox>
                    <ListTodo size={24} />
                </IconBox>

                <Title>Criar conta</Title>

                <SubTitle>Comece a organizar suas tarefas</SubTitle>
            </div>

            <div className="signUpCard">
                <Card width={400}>
                    <Input 
                        icon={<User size={16} color="#6b7280" />}
                        description="Nome"
                        placeholder="Seu nome"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <Input 
                        icon={<Lock size={16} color="#6b7280" />}
                        description="Confirmar senha"
                        placeholder="••••••••"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button 
                        height={40}
                        content="Cadastrar"
                        onClick={handleSignUpClick}
                    />
                </Card>
            </div>

            <div className="lowerText">
                <SubTitle>
                    Já tem uma conta?
                    <LinkText href="/login"> Entrar</LinkText>
                </SubTitle>
            </div>
        </div>
    )
}

export default SignUp
