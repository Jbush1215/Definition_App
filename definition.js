const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');
let errorField = document.querySelector('.js-error');
let headingSection = document.querySelector('.js-heading-data');
let nounMeaningSection = document.querySelector('.js-noun-meaning-data')
let verbMeaningSection = document.querySelector('.js-verb-meaning-data')

function getDefinitionEndpoint(wordToDefine) {    //This is the API call
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
    //Noun Definition Start
    let nounDefinitions = noun?.definitions;

    headingSection.innerHTML = `
        <h2 class="word-heading">${definedWord.word}</h2>
    `;

    let html = '';

    if (Array.isArray(nounDefinitions)) {
        html += `
            <section class='def-border'>
                <p>Noun Definitions:</p>
                <ul>
        `;
        for (let def of nounDefinitions) {
            html += `
                <li>${def.definition}</li>
            `;
        }
        html += `
                </ul>
            </section>
        `;
    }
    else {
        html = '';
    };
    nounMeaningSection.innerHTML = html;
    //Noun definition end

    //Verb definition start
    let verbDefinitions = verb?.definitions;

    let html1 = '';

    if (Array.isArray(verbDefinitions)) {
        html1 += `
            <section class='def-border'>
                <p>Verb Definitions:</p>
                <ul>
        `;
        for (let def of verbDefinitions) {
            html1 += `
                <li>${def.definition}</li>
            `;
        }
        html1 += `
                </ul>
            </section>
        `;
    }
    else {
        html1 = '';
    };
    
    verbMeaningSection.innerHTML = html1;
 }

function fetchDefinition(wordToDefine) {   //This function processes the word and brings back the results array
    fetch(getDefinitionEndpoint(wordToDefine)) //Word is sent to be defined
        .then(x => x.json())  //This formats the results in order for it to be read properly. 
        .then(results => {
            if (typeof results !== 'undefined' && results.length > 0) {
                definedWord = results[0];
            }
            else {
                definedWord = undefined;
                headingSection.innerHTML = "";
                nounMeaningSection.innerHTML = '';
                verbMeaningSection.innerHTML = '';
                errorField.innerText = `The word ${wordToDefine} does not exist in this Dictionary API.`;
            }
            renderDefinition(definedWord); //sends the information to be rendered
        })
}

function formSubmitted(event) {   //This function takes the word entered in the input and sends it to get the definition and to be processed.
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