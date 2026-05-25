import './Input.css';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { InputText } from "../../styles/globalStyles";

const Input = (props) => {
    // Estados exclusivos para o tipo 'select'
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const inputContainerStyle = {
        height: props.height ?? '4rem'
    }

    // Lógica para fechar o dropdown ao clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Função para simular o evento onChange nativo para manter compatibilidade com seu TaskModal
    const handleSelectOption = (optionValue) => {
        props.onChange({ target: { value: optionValue } });
        setIsOpen(false);
    };

    // Encontra o label da opção selecionada para mostrar no input
    const selectedOptionLabel = props.options?.find(opt => opt.value === props.value)?.label;

    return (
        <div style={{ width: '100%' }}>
            <InputText>{props.description}</InputText>

            <div 
                className={`inputContainer ${isOpen ? 'focused' : ''}`} 
                style={inputContainerStyle}
                ref={props.type === 'select' ? dropdownRef : null}
            >
                {props.icon && (
                    <span className="icon">
                        {props.icon}
                    </span>
                )}

                {props.type === 'select' ? (
                    <div className="customSelectWrapper">
                        <div 
                            className="inputField selectTrigger" 
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span>{selectedOptionLabel || 'Selecione...'}</span>
                            <ChevronDown size={18} className="chevronIcon" />
                        </div>

                        {isOpen && (
                            <ul className="optionsList">
                                {props.options?.map((option, index) => (
                                    <li 
                                        key={index} 
                                        className={`optionItem ${props.value === option.value ? 'selected' : ''}`}
                                        onClick={() => handleSelectOption(option.value)}
                                    >
                                        <div className="optionContent">
                                            {props.value === option.value && <Check size={16} className="checkIcon" />}
                                            <span className="optionText">{option.label}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : props.multiline ? (
                    <textarea
                        className="inputField textareaField"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                    />
                ) : (
                    <input
                        className="inputField"
                        placeholder={props.placeholder}
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        min={props.min}
                        max={props.max}
                    />
                )}
            </div>
        </div>
    );
}

export default Input;