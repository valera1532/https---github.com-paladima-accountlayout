// Универсальный селект: Клик на сам селект
var selectValues = document.querySelectorAll('.ui-select-value');
selectValues.forEach(function(selectValue) {
	selectValue.addEventListener('click', function(event) {
		event.preventDefault();
		var parent = this.parentNode;
		var dropdown = parent.querySelector('.ui-select-dropdown');

		if (dropdown.style.display === 'none' || dropdown.style.display === '') {
			dropdown.style.display = 'block';
		} else {
			dropdown.style.display = 'none';
		}
	});
});



// Универсальный селект: Клик на выпадающй элемент
var selectItems = document.querySelectorAll('.ui-select > .ui-select-dropdown > ul.ui-select-list > li.ui-select-item > a');
selectItems.forEach(function(item) {
	item.addEventListener('click', function(event) {
		event.preventDefault();

		var thisElement = this,
			select = this.closest('.ui-select'),
			parent = this.parentNode;

		if (!parent.classList.contains('ui-select-item--active')) {
			var selectItems = select.querySelectorAll('.ui-select-item');

			selectItems.forEach(function(item) {
				item.classList.remove('ui-select-item--active');
			});

			parent.classList.add('ui-select-item--active');
			select.querySelector('.ui-select-value').innerHTML = thisElement.innerHTML;
		}

		select.querySelector('.ui-select-dropdown').style.display = 'none';
	});
});



 // Табы, делаем проверку на присутствие селектора и подгружаем только там, где нам это нужно
if (document.querySelector('.settings-tabs') !== null) {
	import('./tabs.js').then((module) => {
		const Tabs = module.default;

		// Табы на странице "Настройки"
		if (document.querySelector('.settings-tabs') !== null) {
			new Tabs('.settings-tabs');
		}
	});
}



// Инпут на странице "Настройки"
if (document.querySelector('.assistant__city-interests-input') !== null) {
	new Tagify(document.querySelector('.assistant__city-interests-input'));
}


// Инпут в модальном окне
if (document.querySelector('.assistant__city-topics-input') !== null) {
	new Tagify(document.querySelector('.assistant__city-topics-input'));
}



// Модальные окна
document.addEventListener('click', function(event) {
	var target = event.target;

	var openModalButton = target.closest('.open-modal');
	if (openModalButton) {
		var modalId = openModalButton.getAttribute('data-modal');

		if (openModalButton.getAttribute('disabled')) {
			return false;
		}

		var modals = document.querySelectorAll('.modal');
		var modalContents = document.querySelectorAll('.modal__content');

		for (var i = 0; i < modals.length; i++) {
			modals[i].style.display = 'none';
			modalContents[i].style.display = 'none';
		}

		scrollLock.hide();

		var modal = document.querySelector('.modal');
		var modalContent = document.querySelector('.modal__content[data-modal="' + modalId + '"]');

		modal.style.display = 'block';
		modalContent.style.display = 'block';

		return false;
	}

	var closeModalButton = target.closest('.modal__close');
	var closeModalButton2 = target.closest('.close-button-modal');
	if (closeModalButton || closeModalButton2) {
		closeModal();
		return false;
	}

	var modal = document.querySelector('.modal');

	if (modal.style.display === 'block') {
		var modalContents = document.querySelectorAll('.modal__content');

		for (var i = 0; i < modalContents.length; i++) {
			var modalContent = modalContents[i];
			if (modalContent.contains(target) || modalContent === target) {
				return; // Пропустить закрытие модального окна
			}
		}

		closeModal();
	}

	event.stopPropagation();
});

function closeModal() {
	var modal = document.querySelector('.modal');
	var modalContentList = document.querySelectorAll('.modal__content');

	modal.style.display = 'none';

	modalContentList.forEach(function(modalContent) {
		modalContent.style.display = 'none';
	});

	scrollLock.show();
}



// Копирование api ключа в буфер обмена
function copyToClipboard() {
	var input = document.querySelector('.modal__form--input--text');
	input.select();
	document.execCommand('copy');
	alert('Успешно скопировано!');
}

var api_copy_button = document.querySelector('.modal__form--name button.api_copy_button');
var api_copy_input = document.querySelector('.modal__form--name input.api_copy_input');

if(api_copy_button) {
	api_copy_button.addEventListener('click', function() {
		api_copy_input.select();
		document.execCommand('copy');
		alert('Успешно скопировано!');
	});
}
document.querySelector('.wrapper-menu__item-settings').addEventListener('click', function () {
			document.querySelector('.wrapper-menu__pop').classList.toggle('active');

		})