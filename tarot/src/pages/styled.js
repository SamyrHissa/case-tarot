import styled from 'styled-components';
export const HomePageContainer = styled.div`
`;
export const CardsContainer = styled.div`
    height: 85vh;
    background-color: green;
    overflow: scroll;
    padding: 5px;
    text-align: center;
    /* position: absolute; */

`;
export const FooterContainer = styled.div`
    height: 10vh;
    background-color: rgb(100, 180, 100);
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CardStyled = styled.img`
    margin: 5px;
    
`;

export const BackCardStyled = styled.img`
    margin: 5px;
    :hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    transition: 0.5s;
`;
export const ActionButtonStyled = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    :disabled{
        background-color: rgba(50,155,50,0.5);
        cursor: not-allowed;
    };
    :hover:not(:disabled) {
        transform: scale(1.2);
        cursor: pointer;
    };
`;
