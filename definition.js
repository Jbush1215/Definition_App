const form = document.querySelector(".js-definition-form");
let wordInputField = document.querySelector('[name="word"]');

function formSubmitted(event) {
    event.preventDefault();
    alert(wordInputField.value)

    wordInputField.value = "";
}

form.addEventListener('submit', formSubmitted);
