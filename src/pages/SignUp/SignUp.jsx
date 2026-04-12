import './SignUp.css';
import { ListTodo, User, Mail, Lock } from "lucide-react";
import { GlobalStyle, Title, SubTitle, IconBox, LinkText } from "../../styles/globalStyles";
import Card from "../../components/Card/Card";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const SignUp = () => {
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
                    />

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

                    <Input 
                        icon={<Lock size={16} color="#6b7280" />}
                        description="Confirmar senha"
                        placeholder="••••••••"
                        type="password"
                    />

                    <Button 
                        height={40}
                        content="Cadastrar"
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
