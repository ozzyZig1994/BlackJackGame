/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

(() => {
    'use strict'

    let deck         = [];
    const types      = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let playerPoints = [];

    // HTML references
    const btnPlay = document.querySelector('#btnPlay'),
          btnStop = document.querySelector('#btnStop'),
          btnNew  = document.querySelector('#btnNew');

    const counters      = document.querySelectorAll('small'),
          playersCards = document.querySelectorAll('.cards');

    const initializeSet = (numOfPlayers = 2) => {
        deck = buildDeck();

        disableButtons(false);

        counters.forEach(elem => elem.innerText = 0);
        playersCards.forEach(elem => elem.innerHTML = '');
        
        playerPoints = [];
        for (let i = 0; i < numOfPlayers; i++)
            playerPoints.push(0);
    };

    // This function creates a new deck of cards
    const buildDeck = () => {
        for (let i = 2; i <= 10; i++)
            for (const type of types)
                deck.push(i + type);

        for (const type of types)
            for (const special of specials)
                deck.push(special + type);

        return  _.shuffle(deck);
    };

    // This function allows you to take a card
    const drawACard = () => {
        if(!deck.length)
            throw 'Holy Guacamole!... No cards in the deck';

        return deck.pop();
    };

    const valueOfCard = (card) => {
        const valueCard = card.substring(0, card.length -1);

        return isNaN(valueCard) 
            ? (valueCard === 'A') ? 11 : 10
            : valueCard * 1;
    };

    // Turn: 0 = first player and the last player will be the computer.
    const collectPoints = (card, turn) => {
        playerPoints[turn] += valueOfCard(card);
        counters[turn].innerText = playerPoints[turn];

        return playerPoints[turn];
    };

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/deck/${card}.png`;
        imgCard.classList.add('card');
        playersCards[turn].append(imgCard);
    };

    const determineWinner = () => {
        const [minPoints, computerPoints] = playerPoints;

        (computerPoints === minPoints)
            ? msgOfDefeat()
        : (minPoints > 21)
            ? msgOfDefeat()
        : (computerPoints > 21)
            ? victoryMessage()
        : msgOfDefeat();
    }

    // Computer shift
    const computerShift = (minPoints) => {
        let computerPoints = 0;
        
        do {
            const card = drawACard();
            computerPoints = collectPoints(card, playerPoints.length -1)
            
            createCard(card, playerPoints.length -1);
            
        } while ((computerPoints < minPoints) && (minPoints <= 21));

        determineWinner();
    };

    btnNew.addEventListener('click', () => {
        initializeSet();
    });

    // Event
    btnPlay.addEventListener('click', () => {
        const card = drawACard();
        const puntosJugador = collectPoints(card, 0);

        createCard(card, 0);

        if (puntosJugador > 21) {
            msgOfDefeat();
            computerShift(puntosJugador);
        } else if (puntosJugador === 21) {
            victoryMessage();
            computerShift(puntosJugador);
        }
    });

    btnStop.addEventListener('click', () => {
        disableButtons();
        computerShift(playerPoints[0]);
    });

    const victoryMessage = () => {
        disableButtons();
        Swal.fire({
            title: 'YOU WIN!!',
            imageUrl: 'https://media.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif',
            width: 600,
            color: '#716add',
            backdrop: `
                rgba(0,0,123,0.4)
            `
        });
    };

    const msgOfDefeat = () => {
        disableButtons();
        Swal.fire({
            title: 'GAME OVER',
            imageUrl: 'https://media.giphy.com/media/meCuxM5FdjWBBZXyNr/giphy.gif',
            width: 600,
            color: '#00000'
        });
    };

    const disableButtons = (enable = true) => {
        btnPlay.disabled = enable;
        btnStop.disabled = enable;
    };
})();
