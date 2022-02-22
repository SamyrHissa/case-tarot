import {
    HomePageContainer,
    FooterContainer,
    CardsContainer,
    CardStyled,
    ActionButtonStyled
} from './styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
    

export const HomePage = () => {
    const [imgBaseCardUrl, setImgBaseCardUrl] = useState();
    const [imgBackCardUrk, setImgBackCardUrl] = useState();
    const [cards, setCards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState();

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
    const onClickStartButton = () => {
        const shuffledCards = shufflingCards(cards);
        const backSideCards = makeBackSideCards(shuffledCards);
        setCards(backSideCards);
        
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
                {cards.map(card => card.visible 
                    ? <CardStyled src={`${imgBaseCardUrl}${card.image}`} /> 
                    : <CardStyled src={imgBackCardUrk} onClick={()=>onClickCard(card)} />)} 
            </CardsContainer>
            {modalVisible && <Modal onClose={()=>setModalVisible(false)} >
                                <h1>{selectedCard.name}</h1>
                                <img src={`${imgBaseCardUrl}${selectedCard.image}`} />
                            </Modal>
            }
            <FooterContainer>
                    <ActionButtonStyled onClick={()=>onClickStartButton()}>Começar</ActionButtonStyled>
            </FooterContainer>
        </HomePageContainer>
    )
}