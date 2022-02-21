document.addEventListener('DOMContentLoaded', function (event) {

	//создаем элементы для body
	const header = document.createElement('header'),
		main = document.createElement('main'),
		footer = document.createElement('footer');
	//document.body.append(header, main, footer);

	//hedaer
	const headerBlock = document.createElement('div');
	headerBlock.className = 'header__block';
	header.append(headerBlock);

	const headerLogo = document.createElement('img');
	headerLogo.className = 'header__logo';
	headerLogo.src = 'img/cat-fill.svg';

	const headerText = document.createElement('h3');
	headerText.className = 'header__text';
	headerText.innerHTML = 'Бабулькинины котики';
	headerBlock.append(headerLogo, headerText);

	//main
	cats.forEach(i => {
		main.innerHTML += `
<div class="main__card">
			<div class="main__img"
				style="background-image: url(${i.img_link})"
				alt="cat"></div>
			<h3 class="main__name">${i.name}</h3>
			<div class="main__rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
				<img src="img/cat-fill.svg" alt="rating">
			</div>
		</div>`
	});

	//footer
	const footerText = document.createElement('h2');
	footerText.className = 'footer__text';
	footerText.textContent = '©2022 All rights reserved';
	footer.append(footerText);


	//modal

	const modal = document.createElement('div');
	modal.className = 'modal modal__active';

	document.body.append(header, main, footer, modal);


	cats.forEach(i => {
		modal.innerHTML += `
	<div class="modal__card modal__card-active">
	<img class="modal__img" src="erg" alt="cate" width="200" height="200">
	<image class="modal__close" src="img/close.png" alt="close">
		<div class="info">
			<div class="open__name">
				<h3>${i.name}</h3>
			</div>
			<div class="age">
				<h4>${i.age}</h4>
			</div>
			<p class="text">${i.description}</p>
		</div>`
		// card.addEventListener('click', e () =>  )
	});

	const closeCard = document.querySelector('.modal__close'),
		card = document.querySelectorAll('.main__card'),
		info = document.querySelector('.modal__card');

		//закрываем модальное окно
		function closeInfo() {
			info.classList.add('modal__card-active');
			modal.classList.add('modal__active');
			document.body.style.overflow = '';
		};

		//открываем модальное окно
		card.forEach(item => {
			item.addEventListener('click', () => {
				
				info.classList.remove('modal__card-active');
				modal.classList.remove('modal__active')
				document.body.style.overflow = 'hidden';
			})
		})

		//закрываем модальное окно при нажатии кнопки Esc
		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				closeInfo()
			}
		})

		//закрываем модальное окно при клике вне элемента
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				closeInfo();
			}
		})

		closeCard.addEventListener('click', closeInfo)

})