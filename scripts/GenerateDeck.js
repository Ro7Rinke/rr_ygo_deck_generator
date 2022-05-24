const fs = require('fs')

const loadCards = () => {
    return JSON.parse(fs.readFileSync('./data/RND_Cards.json', 'utf-8'))
}

const between = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addCard = (allCards, cardTypeKey, deckCards, isUnique) => {
    const cardIndex = between(0, allCards[cardTypeKey].length - 1)
    
    deckCards.push(allCards[cardTypeKey][cardIndex])

    if(isUnique)
        allCards[cardTypeKey].splice(cardIndex, 1)
}

const writeDeck = (deckCards) => {
    const deckCount = parseInt(fs.readFileSync('./data/RND_Deck_Count.dat'))
    let deckData = `#created by RR_YGO_DECK_GENERATOR\n#main\n${deckCards.join('\n')}\n#extra\n!side\n`
    fs.writeFileSync(`./data/RND_Decks/RND_DECK_${deckCount}.ydk`, deckData)
    fs.writeFileSync('./data/RND_Deck_Count.dat', `${deckCount + 1}`)
}

const generateDeck = async () => {
    let deckAmount = 1
    let isUnique = false

    const args = process.argv.slice(2);

    if(args[0]){
        deckAmount = parseInt(args[0])
    }

    if(args[1]){
        isUnique = args[1].toLowerCase() === 'true'
    }

    for(let amount = 0; amount < deckAmount; amount++){
        let allCards = loadCards()
        let deckCards = []
        const deckStructure = {
            effect_ultra: 3,
            effect_high: 4,
            effect_low: 10,
            normal_ultra: 1,
            normal_high: 2,
            normal_low: 8,
            spell: 10,
            trap: 7
        }

        for( const key of Object.keys(deckStructure)){
            for( let index = 0; index < deckStructure[key]; index++){
                addCard(allCards, key, deckCards, isUnique)
            }
        }
        deckCards.sort()
        writeDeck(deckCards)
    }
}

generateDeck()

module.exports = generateDeck