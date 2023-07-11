// Массив с фотографиями и названиями для карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileEditButton = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const addCardButton = document.querySelector('.profile__add-card');
const popupLocationAdd = document.querySelector('.popup_type_add-card');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_type_image');
const inputName = document.querySelector('.popup__item_type_name');
const inputBio = document.querySelector('.popup__item_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const formElementProfile = document.querySelector('.popup__form-profile');
const cardsContainer = document.querySelector('.elements');
const formElementCard = document.querySelector('.popup__form-card');
const title = document.querySelector('.popup__item_type_location');
const img = document.querySelector('.popup__item_type_link');
const imgBig = document.querySelector('.image-popup__image');
const imgBigCaption = document.querySelector('.image-popup__title');

// функция, которая открывает popup
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

// функция, которая закрывает все popup на странице
function closeAllPopups () {
  popups.forEach(closePopup);
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Функция, которая сохраняет значения инпутов попапа "Редактировать профиль" в профайл на странице и закрывает попап
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup(popupEditProfile)
}

// Функция, которая создает карточку на странице со значениями инпутов формы "Новое место" закрывает попап и очишает значения инпутов
function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  addCard(title.value, img.value);
  closePopup(popupLocationAdd)
  evt.target.reset()
}

// Функция, которая создает карточку
function createCard(titleValue, imgValue) {
    // тут создаете карточку и возвращаете ее
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__img')

    cardElement.querySelector('.card__title').textContent = titleValue;
    cardImage.setAttribute('src', imgValue);
    cardImage.setAttribute('alt', titleValue);
    // Добавляет/Удаляет лайки
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like_active');
    });
    // Удаляет карточку
    cardElement.querySelector('.card__delete').addEventListener('click', function (){
      cardElement.remove();
    });
    // Открывает попап с изображением и подписью
    cardImage.addEventListener('click', function () {
      openPopup(popupImage);
      imgBig.setAttribute('src', imgValue);
      imgBig.setAttribute('alt', titleValue);
      imgBigCaption.textContent = titleValue;
    });
  return cardElement
}

// Функция, которая добавляет карточку
function addCard(titleValue, imgValue) {
  const cardElement = createCard(titleValue, imgValue);
  // Добавляет элемент в начало контейнера
  cardsContainer.prepend(cardElement);
}

// открывает форму "Редактировать профиль" и подтягивает значения инпутов из профайла на странице
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
});

// Открывает форму "Новое место"
addCardButton.addEventListener('click', function () {
  openPopup(popupLocationAdd);
});

// Закрывает любую форму
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// Слушатель кнопки "Сохранить" в форме "Редактировать профиль"
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

// Слушатель кнопки "Создать" в форме "Новое место"
formElementCard.addEventListener('submit', handleFormSubmitCard);

// Добавляет элементы из массива в секцию elements
  initialCards.forEach(function (element) {
    const titleValue = element.name;
    const imgValue = element.link;
    addCard(titleValue, imgValue);
    })
