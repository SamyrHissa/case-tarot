import styled from 'styled-components';

const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(13px);
`;

const ModalFrame = styled.div`
    border-radius: 10px;
    border: 1px solid black;
    background-color: white;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const CloseIconContainer = styled.span`
    padding: 10px;
    cursor: pointer;
`;
const ModalContent = styled.div`
    padding: 10px;
    display: grid;
    max-width: 80vw;
    grid-template-areas:
        "header header header"
        "img desc desc"
        "img desc desc" 
        "img desc desc" 
        "img desc desc" 
        "img desc desc";
    
    h3 {
        grid-area: header;
        align-self: start;
        justify-self: center;
    }
    img {
        grid-area: img;
        justify-self: center;
    }
    h5 {
        grid-area: desc;
    }
    grid-template-rows: 1fr 5fr;
    grid-template-columns: 1fr 2fr;
`;

export const Modal = ({ children, onClose }) => {
    const onClickClose = (event) => {
        if(event.target.id === 'outside' || event.target.id === 'close-button') {
            onClose();
        }
    }
    return (
        <ModalBackdrop id="outside" onClick={onClickClose}>
            <ModalFrame>
                <ModalHeader>
                    <CloseIconContainer id="close-button" onClick={onClickClose}>X</CloseIconContainer>
                </ModalHeader>
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalFrame>
        </ModalBackdrop>
    )
}