const fs = require('fs')

const getCardsFromFile = (filePath) => {

    const data = fs.readFileSync(filePath, 'utf-8')

    let lines = data.split('\r\n')

    const start = lines.indexOf('#main') + 1
    const end = lines.indexOf('#extra')
    
    const cards = lines.slice(start, end)

    // console.log(cards)

    return cards

}

const removeDuplicates = (array) => {
    let newArray = []

    for (const item of array)
        if(!newArray.includes(item))
            newArray.push(item)

    return newArray
}

const writeToLFList = (cards) => {
    let lflist = `!FilteredCards\n$whitelist\n${cards.join(' 3\n')} 3`

    fs.writeFileSync('../results/filteredCards.lflist.conf', lflist)
}

const main = async () => {

    let allCards = []

    for (let index = 1; index <= 32; index++) {
        allCards.push(...getCardsFromFile(`../decks/RND_${index}.ydk`))
    }

    const filteredCards = removeDuplicates(allCards)

    writeToLFList(filteredCards)

}

main()