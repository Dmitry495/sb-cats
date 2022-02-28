'use strict';

if(Cookies.get('user')) {
	window.location.replace('/');
}

const form = document.querySelector('.auth__enter'),
	   input = document.querySelector('.auth__input');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if(input.value.trim() !== '') {
		document.cookie = `user=${input.value}; secure`;
		input.value = '';
		window.location.replace('/');
	} else {
		alert('Введите имя');
	}
})

console.log(Cookies.get('user'));
