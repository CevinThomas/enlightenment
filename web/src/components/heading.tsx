import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
font-size: 5em;
font-weight: 300;
`;

interface IProps {
    children: React.ReactNode
}

const Heading = ({children}: IProps): JSX.Element => {
    return (
        <Title>{children}</Title>
    );
};

export default Heading;
