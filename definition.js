const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');
let errorField = document.querySelector['js-error'];

function fetchDefinition(word) {
    
}

function formSubmitted(event) {
    event.preventDefault();

    let word = wordInputField.trim();

    if (word.length > 0) {
        errorField.innerText = '';
        wordInputField.value = "";
        fetchDefinition(word);
    }
    else {
        errorField.innerText = 'Enter a word for us to describe. You may have entered a word that is not in the API Dictionary.';
    }
}

form.addEventListener('submit', formSubmitted);
