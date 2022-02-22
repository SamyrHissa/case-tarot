import {
    HomePageContainer,
    FooterContainer,
    CardsContainer,
    CardStyled,
    ActionButtonStyled,
    BackCardStyled
} from './styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';

export const HomePage = () => {
    const [imgBaseCardUrl, setImgBaseCardUrl] = useState();
    const [imgBackCardUrk, setImgBackCardUrl] = useState();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [titleButton, setTitleButton] = useState("Começar");

    
    useEffect(()=>{
        axios.get('tarot.json')
            .then(({data}) => {
                setCards(data.cards.map((card)=>{
                    return ({...card, visible: true})
                }));
                setImgBackCardUrl(data.imageBackCard);
                setImgBaseCardUrl(data.imagesUrl)
            })
            .catch(err => console.log(err))
    },[]);

    const shufflingCards = (cards) => {
        const numeredCards = cards.map((card)=>{
            return {...card, number: Math.random()}
        })
        const shuffledCards = numeredCards.sort((a, b)=> a.number - b.number);
        return shuffledCards
    };
    const makeBackSideCards = (cards) => {
        
        const newCards = cards.map((card)=>{
            return ({...card, visible: false})
        })
        return newCards
    };
    const onClickStartButton = () => {
        if(titleButton === "Começar"){
            const shuffledCards = shufflingCards(cards);
            const backSideCards = makeBackSideCards(shuffledCards);
            setCards(backSideCards);
            setTitleButton("Resetar");
            setAlertVisible(true)
        } else {
            axios.get('tarot.json')
            .then(({data}) => {
                setCards(data.cards.map((card)=>{
                    return ({...card, visible: true})
                }));
                setImgBackCardUrl(data.imageBackCard);
                setImgBaseCardUrl(data.imagesUrl)
            })
            .catch(err => console.log(err));
            setTitleButton("Começar");
        }
    }
    const onClickCard = (cardSelected) => {
        const newCards = cards.map((card)=>{
            if(cardSelected.name === card.name){
                return {...card, visible: true}
            };
            return card;
        })
        setCards(newCards);
        setSelectedCard(cardSelected);
        setModalVisible(true);
    }
    return (
        <HomePageContainer>
            
            <CardsContainer>
                {alertVisible && <Alert text="Cartas embaralhadas!" onClose={()=>setAlertVisible(false)} />}
                {cards.map(card => card.visible 
                    ? <CardStyled key={card.name} src={`${imgBaseCardUrl}${card.image}`} /> 
                    : <BackCardStyled src={imgBackCardUrk} onClick={()=>onClickCard(card)} />)} 
                
            </CardsContainer>
            {modalVisible && <Modal onClose={()=>setModalVisible(false)} >
                                <h3>{selectedCard.name}</h3>
                                <img src={`${imgBaseCardUrl}${selectedCard.image}`} />
                                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
                            </Modal>
            }
            <FooterContainer>
                    <ActionButtonStyled onClick={()=>onClickStartButton()}>{titleButton}</ActionButtonStyled>
            </FooterContainer>
        </HomePageContainer>
    )
}