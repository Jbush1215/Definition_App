const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');
let errorField = document.querySelector('.js-error');
let headingSection = document.querySelector('.js-heading-data');
let nounMeaningSection = document.querySelector('.js-noun-meaning-data')
let verbsMeaningSection = document.querySelector('.js-verbs-meaning-data')

function getDefinitionEndpoint(wordToDefine) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`;
}

function renderDefinition(definedWord) {
    let meanings = definedWord.meanings;
    let noun = null, verb = null;
    for (let mean of meanings) {
        if (mean.partOfSpeech === 'noun') {
            noun = mean;
        }
        else if (mean.partOfSpeech === 'verb') {
            verb = mean;
        }
    }
    let nounDefinitions = noun?.definitions;
    let verbDefinitions = verb?.definitions;

    headingSection.innerHTML = `
        <h2>${definedWord.word}</h2>
    `;

    let html = '';

    html += `
            <p>Noun Meaning definitions:</p>
            <ul>
        `;
    if (Array.isArray(nounDefinitions)) {
        for (let def of nounDefinitions) {
                html += `
           <li>${def.definition}</li>
            `;
        }
    }
    else {
        html += '<p>Error Rending nounMenaingSection</p>'
    };
    html += `
            </ul>
        `;
    nounMeaningSection.innerHTML = html;
    console.log(verbDefinitions) /* Todo */
 }

function fetchDefinition(wordToDefine) {
    fetch(getDefinitionEndpoint(wordToDefine))
        .then(x => x.json())
        .then(results => {
            if (typeof results !== 'undefined' && results.length > 0) {
                definedWord = results[0];
            }
            else {
                nounMeaningSection.innerHTML = ``;
                verbsMeaningSection.innerHTML = ``;
                errorField.innerText = `The word ${wordToDefine} does not exist in this Dictionary API.`;
            }
            renderDefinition(definedWord);
            console.log(definedWord);
        })
}

function formSubmitted(event) {
    event.preventDefault();

    let word = wordInputField.value.trim();

    if (word.length > 0) {
        errorField.innerText = ``;
        wordInputField.value = ``;
        fetchDefinition(word);
    }
    else {
        errorField.innerText = `Enter a word for us to describe.`;
    }
}

form.addEventListener('submit', formSubmitted);
