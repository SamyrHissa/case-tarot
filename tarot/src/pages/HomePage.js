import {
    HomePageContainer,
    FooterContainer,
    CardsContainer,
    CardStyled,
    ActionButtonStyled
} from './styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
    

export const HomePage = () => {
    const [imgBaseCardUrl, setImgBaseCardUrl] = useState();
    const [imgBackCardUrk, setImgBackCardUrl] = useState();
    const [cards, setCards] = useState([]);
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
        console.log('onClickStartButton');
        const shuffledCards = shufflingCards(cards);
        const backSideCards = makeBackSideCards(shuffledCards);
        setCards(backSideCards);
        
    }
    return (
        <HomePageContainer>
            <CardsContainer>
                {cards.map(card => card.visible 
                    ? <CardStyled src={`${imgBaseCardUrl}${card.image}`} /> 
                    : <CardStyled src={imgBackCardUrk} />)} 
            </CardsContainer>
            <FooterContainer>
                    <ActionButtonStyled onClick={()=>onClickStartButton()}>Começar</ActionButtonStyled>
            </FooterContainer>
        </HomePageContainer>
    )
}