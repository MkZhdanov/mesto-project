export { validationConfig, enableValidation, hideInputError, disableButton, };

// объект со всеми данными для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// функция, которая показывает ошибку, если форма не валидна
function showInputError(inputElement, errorElement, validationConfig) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// функция, которая скрывает ошибку, если форма снова стала валидна
function hideInputError(inputElement, errorElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// функция, которая проверяет валидность формы
function checkInputValidity(inputElement, formElement, validationConfig) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // проверка на соответствие паттерну из инпут поля и вывод кастомной ошибки из дата аттрибута инпута
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!isInputValid) {
    showInputError(inputElement, errorElement, validationConfig);
  } else {
    hideInputError(inputElement, errorElement, validationConfig);
  }
}

// функция, которая проверяет все ли инпуты формы валидны
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функция, которая переключает состояния кнопки, в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function disableButton(buttonElement) {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

// функция ищет инпуты внутри каждой формы, перебирает список инпутов и вешает обработчик событий input на каждый инпут
function setEventListener(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, formElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// функция, которая включает валидацию
function enableValidation(validationConfig) {
  const formsList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formsList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  });
}
