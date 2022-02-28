'use strict';
//кука для входа на страницу
if (!Cookies.get('user')) {
	window.location.replace('/enter.html');
}


const mainContainer = document.querySelector('.main__container'),
	btnReload = document.querySelector('.main__btn-reload');

//main
//создаем локальное хранилище и добавляем данные из API
function getCats() {
	fetch('https://sb-cats.herokuapp.com/api/show')
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.res.json()
		})
		.then(({
			data
		}) => {
			localStorage.setItem('cats', JSON.stringify(data));

			return data;
		})
		.catch(arr => {
			console.log(arr);
		})
}
getCats()
let catsApi = JSON.parse(localStorage.getItem('cats'));

//создаем карточки с котами
catsApi.forEach(i => {
	mainContainer.innerHTML += `
		<div class="main__card" id="${i.id}">
        <div class="main__img" style="background-image: url(${i.img_link})"></div>
        <h3 class="main__name">${i.name}</h3>
        <div class="main__rating" data-rate='${i.rate}'></div>
		<button type='button' class='main__btn-change'>Изменить</button>
		<button type='button' class='main__btn-delete'>Удалить</button>
    </div>`

	//удаляем карточки с котами
	const catDelete = document.querySelector('.main__btn-delete'),
		  mainCard = document.querySelectorAll('.main__card')

	function btnDelete() {
		fetch(`https://sb-cats.herokuapp.com/api/delete/${i.id}`, {
				method: 'DELETE'
			})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(res)
			})
			.then((data) => {
				console.log(i.id);
				if (data.message === 'ok') {
					mainCard.remove();
					const oldData = getLocalStorageData('catsApi');
					const newData = oldData.filter(item => item.id !== i.id);
					setLocalStorageData('catsApi', newData);
					console.log(i.id);
				}
			})
	}
	catDelete.addEventListener('click', btnDelete)
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
	catsApi.forEach(i => {
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

		// card.addEventListener('click', () => {
		// 	modal.classList.remove('modal__close')
		// 	document.body.style.overflow = 'hidden';
		// 	if (card.getAttribute('id') == i.id) {
		// 		modal.innerHTML = n;
		// 	}
		// 	const closeCard = document.querySelector('.modal__close-img');
		// 	closeCard.addEventListener('click', modalClose)
		// })

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


//обновление страницы
function getReload() {
	localStorage.clear();
	catsApi.innerHTML = '';
	getCats();
}

btnReload.addEventListener('click', getReload);