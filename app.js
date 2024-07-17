document.getElementById('numerologyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const normalized = normalizeString(name);
    const result = calculateNumerology(normalized);
    document.getElementById('result').innerHTML = result;
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('name').value = '';
    document.getElementById('result').innerHTML = '';
});

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function calculateNumerology(name) {
    const numerologyTable = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    let total = 0;
    let breakdown = '';
    let wordTotals = [];
    
    // Split the name into words
    const words = name.split(' ');

    // Process each word
    for (let word of words) {
        let wordTotal = 0;
        let wordBreakdown = `${word} = `;

        for (let char of word) {
            if (numerologyTable[char]) {
                wordTotal += numerologyTable[char];
                wordBreakdown += `${numerologyTable[char]} + `;
            }
        }

        // Remove the last ' + ' and add the sum reduction
        wordBreakdown = wordBreakdown.slice(0, -3);
        let reducedWordTotal = reduceNumber(wordTotal);
        wordBreakdown += ` = ${wordTotal} → ${reducedWordTotal}<br>`;
        breakdown += wordBreakdown;
        wordTotals.push(reducedWordTotal);
    }

    // Sum the reduced totals of all words
    let finalTotal = wordTotals.reduce((sum, num) => sum + num, 0);
    let reducedFinalTotal = reduceNumber(finalTotal);

    breakdown += `<br>Total Final = ${wordTotals.join(' + ')} = ${finalTotal} → ${reducedFinalTotal}`;
    return breakdown;
}

function reduceNumber(num) {
    while (num >= 10 && num != 11 && num != 22 && num != 33) {
        num = num.toString().split('').reduce((sum, n) => sum + parseInt(n), 0);
    }
    return num;
}
