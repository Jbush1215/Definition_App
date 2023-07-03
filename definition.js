const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');
let errorField = document.querySelector('.js-error');
let definitionSection = document.querySelector('.js-definition-data')

function getDefinitionEndpoint(wordToDefine) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`;
}

function renderDefinition(definition) {
    definitionSection.innerHTML = `
        <h2>${definition}</h2>
    `;
 }

function fetchDefinition(wordToDefine) {
    fetch(getDefinitionEndpoint(wordToDefine))
        .then((x) => x.json())
        .then(response => {
            let results = response.results;
            if (typeof results !== 'undefined' && results.length > 0) {
                let definition = results[0];
            }
            else {
                errorField.innerText = `The word ${wordToDefine} does not exist in this Dictionary API.`;
            }
            renderDefinition(response);
            console.log(wordToDefine);
        })
}

function formSubmitted(event) {
    event.preventDefault();

    let word = wordInputField.value.trim();

    if (word.length > 0) {
        errorField.innerText = ``;
        wordInputField.value = "";
        fetchDefinition(word);
    }
    else {
        errorField.innerText = `Enter a word for us to describe.`;
    }
}

form.addEventListener('submit', formSubmitted);
