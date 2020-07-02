import { shuffle, filter } from 'lodash';

var deck = [];

const nextcard = (cards, maxWords = 5) => {
    deck = filter(shuffle(cards), (card) => String(card.KEYWORD).trim().split(/\s/).length <= maxWords);

    return () => {
        if (deck.length === 0) {
            deck = filter(shuffle(cards), (card) => String(card.KEYWORD).trim().split(/\s/).length <= maxWords);
        };

        return deck.pop();
    }
};

exports.nextcard = nextcard;
