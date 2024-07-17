document.getElementById('numerologyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputType = document.getElementById('inputType').value;
    const inputValue = document.getElementById('name').value;
    let result;
    if (inputType === 'name') {
        const normalized = normalizeString(inputValue);
        result = calculateNumerology(normalized, 'name');
    } else if (inputType === 'date') {
        result = calculateNumerology(inputValue, 'date');
    }
    document.getElementById('result').innerHTML = result;
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('name').value = '';
    document.getElementById('result').innerHTML = '';
});

document.getElementById('name').addEventListener('input', function(event) {
    const inputType = document.getElementById('inputType').value;
    if (inputType === 'date') {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 8) {
            value = value.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2}).*/, '$1/$2/$3-$4:$5');
        } else if (value.length > 4) {
            value = value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3-');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{2}).*/, '$1/$2/');
        } else if (value.length > 0) {
            value = value.replace(/^(\d{2}).*/, '$1/');
        }
        event.target.value = value;
    }
});

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function calculateNumerology(input, type) {
    const numerologyTable = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    let total = 0;
    let breakdown = '';
    let wordTotals = [];

    if (type === 'name') {
        // Split the name into words
        const words = input.split(' ');

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
    } else if (type === 'date') {
        let [datePart, timePart] = input.split('-');
        datePart = datePart || '';
        timePart = timePart || '0';

        let dateTotal = 0;
        let dateBreakdown = `${datePart} = `;

        for (let char of datePart.replace(/\D/g, '')) {
            dateTotal += parseInt(char);
            dateBreakdown += `${char} + `;
        }

        dateBreakdown = dateBreakdown.slice(0, -3);
        let reducedDateTotal = reduceNumber(dateTotal);
        dateBreakdown += ` = ${dateTotal} → ${reducedDateTotal}<br>`;
        breakdown += dateBreakdown;
        wordTotals.push(reducedDateTotal);

        if (timePart !== '0') {
            let timeTotal = 0;
            let timeBreakdown = `${timePart} = `;

            for (let char of timePart.replace(/\D/g, '')) {
                timeTotal += parseInt(char);
                timeBreakdown += `${char} + `;
            }

            timeBreakdown = timeBreakdown.slice(0, -3);
            let reducedTimeTotal = reduceNumber(timeTotal);
            timeBreakdown += ` = ${timeTotal} → ${reducedTimeTotal}<br>`;
            breakdown += timeBreakdown;
            wordTotals.push(reducedTimeTotal);
        }
    }

    // Sum the reduced totals of all parts
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
