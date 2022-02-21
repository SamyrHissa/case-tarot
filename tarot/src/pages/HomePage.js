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
    // const [backSide, setBackSide] = useState(false);
    const shuffleCards = () => {
        // const shuffledCards = 
    }
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
    },[])
    return (
        <HomePageContainer>
            <CardsContainer>
                {cards.map(card => <CardStyled src={`${imgBaseCardUrl}${card.image}`} />)} 
            </CardsContainer>
            <FooterContainer>
                    <ActionButtonStyled >Começar</ActionButtonStyled>
            </FooterContainer>
        </HomePageContainer>
    )
}