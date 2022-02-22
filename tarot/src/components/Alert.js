import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
    position: absolute;
    top: 5;
    left: 80vw;
    height: 30px;
    width: 15vw;
    background: rgb(255, 55, 55);
    transition: left 50s;
    animation: go-front 1s ;

    @keyframes go-front {
        from {
            transform: translateX(25vw);
        }
        to {
            transform: translateX(0);
        }
    }
`;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

export const Alert = ({text, onClose}) => {

    const startProgress = () => {
        sleep(3000)
        onClose()
    }
    useEffect(()=>{
        startProgress()
    }, []);
    return (
        <AlertContainer>
            <strong>{text}</strong>
        </AlertContainer>
    )
}