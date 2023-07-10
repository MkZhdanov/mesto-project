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
const popupCloseButton = document.querySelectorAll('.popup__close');
const popupWindow = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_type_image');
const inputName = document.querySelector('.popup__item_type_name');
const inputBio = document.querySelector('.popup__item_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const formElementProfile = document.querySelector('.popup__form-profile');
const cardsContainer = document.querySelector('.elements');
const formElementCard = document.querySelector('.popup__form-card');

// функция, которая открывает popup
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

// функция, которая закрывает все popup на странице
function closePopup () {
  popupWindow.forEach((item) => {
    item.classList.remove('popup_opened');
  });
}

// Функция, которая сохраняет значения инпутов попапа "Редактировать профиль" в профайл на странице и закрывает попап
function handleFormSubmit(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup(popupEditProfile)
}

// Функция, которая создает карточку на странице со значениями инпутов формы "Новое место" закрывает попап и очишает значения инпутов
function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  const title = document.querySelector('.popup__item_type_location');
  const img = document.querySelector('.popup__item_type_link');
  addCard(title.value, img.value);
  closePopup(popupLocationAdd)
  title.value = '';
  img.value = '';
}

// Функция, которая делает все
function addCard(titleValue, imgValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__img').setAttribute('src', imgValue);
  // Добавляет/Удаляет лайки
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  // Удаляет карточку
  cardElement.querySelector('.card__delete').addEventListener('click', function (){
    cardElement.remove();
  });
  // Открывает попап с изображением и подписью
  cardElement.querySelector('.card__img').addEventListener('click', function () {
    openPopup(popupImage);
    document.querySelector('.image-popup__image').setAttribute('src', imgValue);
    document.querySelector('.image-popup__title').textContent = titleValue;
  });
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
popupCloseButton.forEach((item) => {
  item.addEventListener('click', closePopup);
})

// Слушатель кнопки "Сохранить" в форме "Редактировать профиль"
formElementProfile.addEventListener('submit', handleFormSubmit);

// Слушатель кнопки "Создать" в форме "Новое место"
formElementCard.addEventListener('submit', handleFormSubmitCard);

// Добавляет элементы из массива в секцию elements
  initialCards.forEach(function (element) {
    const titleValue = element.name;
    const imgValue = element.link;
    addCard(titleValue, imgValue);
    })
