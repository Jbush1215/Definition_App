const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');
let errorField = document.querySelector('.js-error');
let headingSection = document.querySelector('.js-heading-data');
let nounMeaningSection = document.querySelector('.js-noun-meaning-data')
let verbsMeaningSection = document.querySelector('.js-verbs-meaning-data')

function getDefinitionEndpoint(wordToDefine) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`;
}

function renderDefinition(definition) {
    let meanings = definition.meanings;
    let nouns = meanings[0];
    let verbs = meanings[1];
    let nounDefinitions = nouns.definitions;
    let verbsDefinitions = verbs.definitions;

    headingSection.innerHTML = `
        <h2>${definition.word}</h2>
    `;
    nounMeaningSection.innerHTML = `
            <p>Noun Meaning definitions:</p>
            <ul>
        `;
    
    if (Array.isArray(nounDefinitions)) {
        for (let def of nounDefinitions)
            nounMeaningSection.innerHTML += `
           <li>${nounDefinitions[def]}</li>
        `;
    }
    else {
        nounMeaningSection.innerHTML += '<p>Error Rending nounMenaingSection</p>'
    };
    nounMeaningSection.innerHTML += `
            </ul>
        `;
    console.log(verbsDefinitions) /* Todo */
 }

function fetchDefinition(wordToDefine) {
    fetch(getDefinitionEndpoint(wordToDefine))
        .then(x => x.json())
        .then(results => {
            if (typeof results !== 'undefined' && results.length > 0) {
                definition = results[0];
            }
            else {
                errorField.innerText = `The word ${wordToDefine} does not exist in this Dictionary API.`;
            }
            renderDefinition(definition);
            console.log(definition);
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
