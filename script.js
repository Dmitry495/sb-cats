'use strict';

const mainContainer = document.querySelector('.main__container');

//main
cats.forEach(i => {
	mainContainer.innerHTML += `
		<div class="main__card" id="${i.id}">
        <div class="main__img" style="background-image: url(${i.img_link})"></div>
        <h3 class="main__name">${i.name}</h3>
        <div class="main__rating" data-rate='${i.rate}'></div>
    </div>`
});

const mainCard = document.querySelectorAll('.main__card'),
	mainRat = document.querySelectorAll('.main__rating'),
	coodCat = ['img/cat-fill.svg'],
	sadCat = ['img/cat-stroke.svg'];

mainRat.forEach(item => {
	let n = '';
	let antiLike = 10 - +item.getAttribute('data-rate');

	for (let i = 0; i < +item.getAttribute('data-rate'); i++) {
		n += `<image src=${coodCat}>`;
		item.innerHTML = n;
	}

	if (antiLike) {
		for (let i = 0; i < antiLike; i++) {
			n += `<image src=${sadCat}>`;
			item.innerHTML = n;
		}
	}
})

//modal
const modal = document.querySelector('.modal');

mainCard.forEach(card => {

	cats.forEach(i => {
		let n = '';

		let age = '';
		if (i.age == 1) {
			age = 'год';
		} else if (i.age >= 2 && i.age <= 4) {
			age = 'года';
		} else {
			age = 'лет'
		}

		n = `
	<div class="modal__card modal__card-active" data-id=${i.id}>
	<img class="modal__img" src="${i.img_link}" alt="cate">
	
		<div class="modal__info">
			<image class="modal__close-img" src="img/close.png" alt="close">
			<h2 class="modal__name">${i.name}</h2>
			<h3 class="modal__age">${i.age} ${age}</h3>
			<p class="modal__text">${i.description}</p>
		</div>
	</div>`

		card.addEventListener('click', () => {
			modal.classList.remove('modal__close')
			document.body.style.overflow = 'hidden';
			if (card.getAttribute('id') == i.id) {
				modal.innerHTML = n;
			}
			const closeCard = document.querySelector('.modal__close-img');
			closeCard.addEventListener('click', modalClose)
		})

	});
})

//закрываем модальное окно
function modalClose() {
	modal.classList.add('modal__close');
	document.body.style.overflow = '';
};

//закрываем модальное окно при нажатии кнопки Esc
document.addEventListener('keydown', (e) => {
	if (e.code === 'Escape') {
		modalClose()
	}
})

//закрываем модальное окно при клике вне элемента
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modalClose();
	}
})