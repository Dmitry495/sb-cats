'use strict';

//кука для входа на страницу
if (!Cookies.get('user')) {
    window.location.replace('./enter.html');
}

const rootPopup = document.querySelector('.root-popup'),
    popup = document.querySelector('.popup'),
    popupCats = document.querySelector('.popup_type_cats-info'),
    popupAddCats = document.querySelector('.popup_type_cats-add'),
    popupEditCats = document.querySelector('.popup_type_cats-edit'),
    formAdd = popupAddCats.querySelector('.popup__form'),
    formEdit = popupEditCats.querySelector('.popup__form'),
    inputId = formAdd.querySelector('#id'),
    inputName = formAdd.querySelector('#name'),
    inputImg = formAdd.querySelector('#img_link'),
    inputDesc = formAdd.querySelector('#description'),
    popupCatsImage = popupCats.querySelector('.popup__image'),
    popupCatsText = popupCats.querySelector('.popup__text'),
    popupCateRate = popupCats.querySelector('.popup__rate'),
    popupCateAge = popupCats.querySelector('.popup__age'),
    popupCatsName = popupCats.querySelector('.popup__name'),
    catImages = document.querySelectorAll('.cat__image'),
    closePopupCats = document.querySelector('.popup__close'),
    cardTemplate = document.querySelector('#card-tempalte'),
    cardListContainer = document.querySelector('.cats-list'),
    buttonReloadData = document.querySelector('.reload-data'),
    buttonAddCat = document.querySelector('#button-add-cat');

function formSerialize(form) {
    const result = {}
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        result[input.name] = input.value;
    })
    return result;
}

function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.body.style.overflow = 'hidden';

}

function handleClickCloseBtn(event) {
    if (event.target.classList.contains('popup__close')) {
        closePopup();
    }
}

function closePopup() {
    const popopActive = document.querySelector('.popup_opened');
    if (popopActive) {
        popopActive.classList.remove('popup_opened');
    }
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        closePopup();
    }
})

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup()
    }
})

function createCardCat(dataCat) {
    const newCardElement = cardTemplate.content.querySelector('.cats-list__item').cloneNode(true);
    const cardImage = newCardElement.querySelector('.cat__image');
    const cardName = newCardElement.querySelector('.cat__title');
    const cardButtonDelete = newCardElement.querySelector('.cat__delete');
    const cardButtonEdit = newCardElement.querySelector('.cat__edit');
    cardImage.src = dataCat.img_link;
    cardImage.dataset.id = dataCat.id;
    cardName.textContent = dataCat.name;
    
    function handleClickCatImage() {
        popupCatsImage.src = dataCat.img_link;
        popupCatsName.textContent = dataCat.name;
        popupCatsText.textContent = dataCat.description;
        let n = '';
        if (dataCat.age === 1) {
            n = 'год';
        } else if (dataCat.age >= 2 && dataCat.age <= 4) {
            n = 'года';
        } else {
            n = 'лет'
        }
        popupCateAge.textContent = `${dataCat.age} ${n}`;
        openPopup(popupCats)
    }

    function handleClickCatEdit() {
        const inputs = formEdit.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = dataCat[input.name];
        });
        openPopup(popupEditCats)
    }

    function handleClickButtonDelete() {
        if(confirm('Вы точно хотите удалить котика?')) {
            console.log('yes');
            fetch(`https://sb-cats.herokuapp.com/api/delete/${dataCat.id}`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response)
            })
            .then((data) => {
                console.log(data);
                if (data.message === 'ok') {
                    newCardElement.remove();
                    const oldData = getLocalStorageData('cats');
                    const newData = oldData.filter(item => item.id !== dataCat.id);
                    setLocalStorageData('cats', newData);
                }
            })
        };
}

    cardButtonEdit.addEventListener('click', handleClickCatEdit)
    cardButtonDelete.addEventListener('click', handleClickButtonDelete)
    cardImage.addEventListener('click', handleClickCatImage)

    return newCardElement;
}

function cardAddToContainer(elementNode, container) {
    container.append(elementNode)
}

function getCats() {
    fetch('https://sb-cats.herokuapp.com/api/show')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        })
        .then(({
            data
        }) => {
            localStorage.setItem('cats', JSON.stringify(data))
            data.forEach(dataCat => cardAddToContainer(createCardCat(dataCat), cardListContainer))
        })
        .catch(err => {
            console.log(err);
        })

}

function handleClickButtonAdd() {
    openPopup(popupAddCats)
}

console.log(formAdd.elements);


formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const bodyJSON = formSerialize(formAdd)

    fetch('https://sb-cats.herokuapp.com/api/add', {
            method: 'POST',
            body: JSON.stringify(bodyJSON),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        })
        .then((data) => {
            if (data.message === 'ok') {
                reloadData();
                closePopup();
            }
        })
        .catch(err => {
            console.log(err);
        })
})

function reloadData() {
    localStorage.clear();
    cardListContainer.innerHTML = "";
    getCats()
}

buttonAddCat.addEventListener('click', handleClickButtonAdd)
rootPopup.addEventListener('click', handleClickCloseBtn);
buttonReloadData.addEventListener('click', reloadData)

getCats();