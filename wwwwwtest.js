setLikes(item) {
  this._likesCounterElement.textContent = item.likes.length;
  this._likeButtonElement.classList.add("card__like_active");
}

_setButtonLike() {
  if (this._data.likes.some((like) => like._id === this._userId)) {
    this._likeButtonElement.classList.add("card__like_active");
  }
}


function handleRemoveLike(card) {
  api
    .unsetLike(card.getId())
    .then((item) => {
      console.log(111);
      card.setLikes(item);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAddLike(card) {
  api
    .setLike(card.getId())
    .then((item) => {
      console.log(222);
      card.setLikes(item);
    })
    .catch((err) => {
      console.log(err);
    });
}
