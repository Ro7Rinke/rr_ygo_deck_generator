const generateDeck = require('./GenerateDeckCore')

let deckAmount = 1

const args = process.argv.slice(2);

if(args[0]){
    deckAmount = parseInt(args[0])
}

generateDeck(deckAmount, true)