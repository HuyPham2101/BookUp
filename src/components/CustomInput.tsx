import React, { useRef } from "react";
import styled from "styled-components";

const InputLabel = styled.label`
    position: absolute;
    letf: 15px;
    top: 35px;
    color: rgb(116, 116, 116);
    transform: matrix(1, 0, 0, 1, 0, -12.5);
    transform-property: transform;
    line-height: 25px;
    font-size: 18px;
    transition-duration: 0.3s;
    padding-left: 10px;
`;

const InputField = styled.input`
    background-color: transparent;
    padding: 35px 21px 13px;
    outline-width: 0px;
    border-width: 0;
    &:focus + ${InputLabel} {
        transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
    }
    &:not(:placeholder-shown) + ${InputLabel} {
        transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
    }
    height: 100%;
    width: 100%;
`;

const InputContainer = styled.div`
    transition-duration: 0.4s;
    transition-property: box.shadow, border-color;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: #000;
    position: relative;
    height: 64px;
    margin-bottom: 16px;

    &:focus-within {
        border: 1px solid grey;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1),
            inset 0 0 0 2px grey;
    }
`;

export const CustomInput = ({
    label,
    ...props
}: React.ComponentPropsWithoutRef<"input"> & {
    label: string;
    type?: "text" | "password" | "number" | "email";
}) => {
    const id = useRef(
        `${label.replace(" ", "-")}-${Math.floor(Math.random() * 10000)}`
    );

    return (
        <InputContainer>
            <InputField {...props} id={id.current} placeholder=" " />
            <InputLabel htmlFor={id.current}>{label}</InputLabel>
        </InputContainer>
    )
}
