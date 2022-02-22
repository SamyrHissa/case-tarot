import styled from 'styled-components';

const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(30px);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalFrame = styled.div`
    background-color: white;
    height: 300px;
    width: 300px;
`;

const ModalHeader = styled.div`
    text-align: end;
    padding: 10px;
`;

const ModalContent = styled.div``

export const Modal = ({ children, onClose }) => {
    const onClickClose = (event) => {
        if(event.target.id === 'outside' || event.target.id === 'close-button') {
            console.log("Fechar");
            onClose();
        }
    }
    return (
        <ModalBackdrop id="outside" onClick={onClickClose}>
            <ModalFrame>
                <ModalHeader>
                <span id="close-button" onClick={onClickClose}>X</span>
                </ModalHeader>
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalFrame>
        </ModalBackdrop>
    )
}