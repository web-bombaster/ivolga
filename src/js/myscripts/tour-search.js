
const initTourSearch = () => {
	const form = document.querySelector('#tourSearchForm');

	if (!form) return;

	// ==========================================
	// Элементы формы
	// ==========================================

	// Выпадающие панели
	const fields = form.querySelectorAll('[data-dropdown]');
	const panels = form.querySelectorAll('[data-dropdown-panel]');
	const triggers = form.querySelectorAll('[data-dropdown-trigger]');

	// Направления
	const destinationInput = form.querySelector('[data-destination-input]');
	const destinationClear = form.querySelector('[data-destination-clear]');

	// Даты
	const dateValue = form.querySelector('[data-date-value]');
	const flexibleDates = form.querySelector('[data-flexible-dates]');
	const calendar = form.querySelector('[data-calendar]');

	// Ночи
	const nightsValue = form.querySelector('[data-nights-value]');
	const nightsFrom = form.querySelector('[data-nights-from]');
	const nightsTo = form.querySelector('[data-nights-to]');

	// Туристы
	const touristsValue = form.querySelector('[data-tourists-value]');


	// ==========================================
	// Состояние формы
	// ==========================================

	const state = {
		date: null,
		flexible: flexibleDates?.checked ?? true,
		nightsFrom: Number(nightsFrom?.value) || 5,
		nightsTo: Number(nightsTo?.value) || 7,
		adults: 2,
		children: 0
	};


	// ==========================================
	// Общие функции
	// ==========================================

	// Форматирование даты
	const formatDate = date => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');

		return `${day}.${month}`;
	};


	// Обновление информационного текста о турах
	const updateNightsInfo = () => {
		const dateText = state.date
			? formatDate(state.date)
			: 'выберите дату';

		const flexibleText = state.flexible
			? ' (±3 дня)'
			: '';

		const dateElement = form.querySelector('[data-nights-date]');
		const flexibleElement = form.querySelector('[data-nights-flexible]');
		const fromElement = form.querySelector('[data-nights-from-text]');
		const toElement = form.querySelector('[data-nights-to-text]');

		if (dateElement) dateElement.textContent = dateText;
		if (flexibleElement) flexibleElement.textContent = flexibleText;
		if (fromElement) fromElement.textContent = state.nightsFrom;
		if (toElement) toElement.textContent = state.nightsTo;
	};


	// ==========================================
	// 1. Выпадающие панели
	// ==========================================

	const closeDropdowns = () => {
		fields.forEach(field => {
			field.classList.remove('is-active');
		});

		panels.forEach(panel => {
			panel.hidden = true;
		});

		triggers.forEach(trigger => {
			trigger.setAttribute('aria-expanded', 'false');
		});
	};


	const openDropdown = name => {
		closeDropdowns();

		const field = form.querySelector(`[data-dropdown="${name}"]`);
		const panel = form.querySelector(`[data-dropdown-panel="${name}"]`);
		const trigger = form.querySelector(`[data-dropdown-trigger="${name}"]`);

		if (!field || !panel) return;

		field.classList.add('is-active');
		panel.hidden = false;

		trigger?.setAttribute('aria-expanded', 'true');
	};


	// Открытие панелей по кнопкам
	triggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			const name = trigger.dataset.dropdownTrigger;
			const panel = form.querySelector(`[data-dropdown-panel="${name}"]`);

			if (!panel) return;

			if (panel.hidden) {
				openDropdown(name);
			} else {
				closeDropdowns();
			}
		});
	});


	// Открытие списка направлений
	if (destinationInput) {
		destinationInput.addEventListener('focus', () => {
			openDropdown('destination');
		});

		destinationInput.addEventListener('click', () => {
			openDropdown('destination');
		});
	}


	// Закрытие при клике вне формы
	document.addEventListener('click', event => {
		if (!form.contains(event.target)) {
			closeDropdowns();
		}
	});


	// Закрытие по Escape
	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') {
			closeDropdowns();
		}
	});


	// ==========================================
	// 2. Направления
	// ==========================================

	if (destinationInput) {
		const countryInputs = form.querySelectorAll(
			'[data-destination-group="country"] input[type="checkbox"]'
		);

		const destinationItems = form.querySelectorAll(
			'[data-destination-item]'
		);

		const destinationGroups = form.querySelectorAll(
			'[data-destination-group]'
		);


		// Получение выбранных стран
		const getSelectedCountries = () => {
			return [...countryInputs]
				.filter(input => input.checked)
				.map(input => input.value);
		};


		// Фильтрация направлений
		const filterDestinations = () => {
			const query = destinationInput.value
				.trim()
				.toLowerCase();

			const selectedCountries = getSelectedCountries();


			// Фильтрация стран
			countryInputs.forEach(input => {
				const option = input.closest('.tour-search__option');

				if (!option) return;

				const text = option.textContent.toLowerCase();

				option.hidden = !text.includes(query);
			});


			// Фильтрация курортов и отелей
			destinationItems.forEach(item => {
				const country = item.dataset.country;
				const text = item.textContent.toLowerCase();

				const matchesQuery = text.includes(query);

				const matchesCountry =
					selectedCountries.length === 0 ||
					selectedCountries.includes(country);

				item.hidden = !matchesQuery || !matchesCountry;
			});


			// Скрываем пустые группы
			destinationGroups.forEach(group => {
				const options = group.querySelectorAll(
					'.tour-search__option'
				);

				const hasVisibleOptions = [...options].some(option => {
					return !option.hidden;
				});

				group.hidden = !hasVisibleOptions;
			});
		};


		// Обновление выбранных направлений
		const updateDestinationSummary = () => {
			const selected = form.querySelectorAll(
				'[data-destination-group] input[type="checkbox"]:checked, ' +
				'[data-destination-item] input[type="checkbox"]:checked'
			);

			const names = [...selected].map(input => {
				const option = input.closest('.tour-search__option');

				return option
					?.querySelector('.tour-search__option-name')
					?.textContent.trim();

			}).filter(Boolean);


			if (names.length) {
				destinationInput.dataset.selectedSummary = names.join(', ');

				if (destinationClear) {
					destinationClear.hidden = false;
				}

			} else {
				delete destinationInput.dataset.selectedSummary;

				if (destinationClear) {
					destinationClear.hidden = true;
				}
			}
		};


		// Ввод поискового запроса
		destinationInput.addEventListener('input', filterDestinations);


		// Изменение выбранной страны или направления
		form.addEventListener('change', event => {
			if (
				event.target.matches(
					'[data-destination-group] input[type="checkbox"]'
				) ||
				event.target.matches(
					'[data-destination-item] input[type="checkbox"]'
				)
			) {
				filterDestinations();
				updateDestinationSummary();
			}
		});


		// Очистка направлений
		destinationClear?.addEventListener('click', () => {
			form.querySelectorAll(
				'[data-destination-group] input[type="checkbox"], ' +
				'[data-destination-item] input[type="checkbox"]'
			).forEach(input => {
				input.checked = false;
			});

			destinationInput.value = '';

			updateDestinationSummary();
			filterDestinations();

			destinationInput.focus();
		});


		// При потере фокуса показываем выбранные направления
		destinationInput.addEventListener('blur', () => {
			setTimeout(() => {
				if (destinationInput.dataset.selectedSummary) {
					destinationInput.value =
						destinationInput.dataset.selectedSummary;
				}
			}, 150);
		});


		// При повторном фокусе очищаем строку поиска
		destinationInput.addEventListener('focus', () => {
			if (destinationInput.dataset.selectedSummary) {
				destinationInput.value = '';
				filterDestinations();
			}
		});


		filterDestinations();
	}


	// ==========================================
	// 3. Календарь
	// ==========================================

	if (calendar && dateValue) {
		const months = calendar.querySelectorAll('[data-calendar-month]');
		const monthTitles = calendar.querySelectorAll('[data-month-title]');
		const monthDays = calendar.querySelectorAll('[data-month-days]');

		const monthNames = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь'
		];

		const weekDays = 7;

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		let calendarDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			1
		);


		// Формат даты для атрибута data-date
		const formatDateForInput = date => {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			return `${year}-${month}-${day}`;
		};


		// Генерация календаря
		const renderCalendar = () => {
			months.forEach((month, index) => {
				const currentMonth = new Date(
					calendarDate.getFullYear(),
					calendarDate.getMonth() + index,
					1
				);

				const year = currentMonth.getFullYear();
				const monthIndex = currentMonth.getMonth();

				const firstDay = new Date(year, monthIndex, 1);
				const lastDay = new Date(year, monthIndex + 1, 0);

				// Понедельник = 0, воскресенье = 6
				const offset = (firstDay.getDay() + 6) % weekDays;

				monthTitles[index].textContent =
					`${monthNames[monthIndex]} ${year}`;

				monthDays[index].innerHTML = '';


				// Пустые ячейки перед первым числом
				for (let i = 0; i < offset; i++) {
					const empty = document.createElement('span');

					empty.className = 'tour-search__day-empty';

					monthDays[index].append(empty);
				}


				// Числа месяца
				for (let day = 1; day <= lastDay.getDate(); day++) {
					const date = new Date(year, monthIndex, day);

					const button = document.createElement('button');

					button.type = 'button';
					button.className = 'tour-search__day';
					button.textContent = day;

					button.dataset.date = formatDateForInput(date);


					// Запрещаем выбор прошедших дат
					if (date < today) {
						button.disabled = true;

						button.classList.add(
							'tour-search__day--disabled'
						);
					}


					// Выделяем сегодняшний день
					if (date.getTime() === today.getTime()) {
						button.classList.add(
							'tour-search__day--today'
						);
					}


					// Выделяем выбранную дату
					if (
						state.date &&
						date.getTime() === state.date.getTime()
					) {
						button.classList.add(
							'tour-search__day--selected'
						);
					}

					monthDays[index].append(button);
				}
			});
		};


		// Переключение месяцев
		const prevButton = calendar.querySelector(
			'[data-calendar-prev]'
		);

		const nextButton = calendar.querySelector(
			'[data-calendar-next]'
		);


		prevButton?.addEventListener('click', () => {
			const previousMonth = new Date(
				calendarDate.getFullYear(),
				calendarDate.getMonth() - 1,
				1
			);

			if (
				previousMonth.getFullYear() < today.getFullYear() ||
				(
					previousMonth.getFullYear() === today.getFullYear() &&
					previousMonth.getMonth() < today.getMonth()
				)
			) {
				return;
			}

			calendarDate = previousMonth;

			renderCalendar();
		});


		nextButton?.addEventListener('click', () => {
			calendarDate = new Date(
				calendarDate.getFullYear(),
				calendarDate.getMonth() + 1,
				1
			);

			renderCalendar();
		});


		// Выбор даты
		calendar.addEventListener('click', event => {
			const button = event.target.closest('[data-date]');

			if (!button || button.disabled) return;

			const [year, month, day] = button.dataset.date
				.split('-')
				.map(Number);

			state.date = new Date(year, month - 1, day);

			updateDateValue();
			renderCalendar();
			updateNightsInfo();

			closeDropdowns();
		});


		// Обновление основного поля даты
		const updateDateValue = () => {
			if (!state.date) {
				dateValue.textContent = 'Выберите дату';
				return;
			}

			const flexibleText = state.flexible
				? ' ±3 дня'
				: '';

			dateValue.textContent =
				`с ${formatDate(state.date)}${flexibleText}`;
		};


		// Переключение гибких дат
		flexibleDates?.addEventListener('change', () => {
			state.flexible = flexibleDates.checked;

			updateDateValue();
			updateNightsInfo();
		});


		renderCalendar();
	}


	// ==========================================
	// 4. Количество ночей
	// ==========================================

	if (nightsFrom && nightsTo && nightsValue) {

		// Обновление значений количества ночей
		const updateNights = () => {
			state.nightsFrom = Number(nightsFrom.value);
			state.nightsTo = Number(nightsTo.value);

			nightsValue.textContent =
				`на ${state.nightsFrom}-${state.nightsTo} ночей`;

			updateNightsInfo();
		};


		// Изменение значений кнопками +/-
		form.querySelectorAll('[data-counter-action]').forEach(button => {
			button.addEventListener('click', () => {
				const target = button.dataset.counterTarget;
				const action = button.dataset.counterAction;

				const input = target === 'nights-from'
					? nightsFrom
					: nightsTo;

				let value = Number(input.value);

				value += action === 'plus' ? 1 : -1;

				value = Math.max(1, Math.min(30, value));


				// Синхронизация минимального и максимального значения
				if (
					input === nightsFrom &&
					value > Number(nightsTo.value)
				) {
					nightsTo.value = value;
				}

				if (
					input === nightsTo &&
					value < Number(nightsFrom.value)
				) {
					nightsFrom.value = value;
				}

				input.value = value;

				updateNights();
			});
		});


		// Ручной ввод значений
		[nightsFrom, nightsTo].forEach(input => {
			input.addEventListener('change', () => {
				let from = Math.max(
					1,
					Math.min(30, Number(nightsFrom.value) || 1)
				);

				let to = Math.max(
					1,
					Math.min(30, Number(nightsTo.value) || 1)
				);


				if (from > to) {
					if (input === nightsFrom) {
						to = from;
					} else {
						from = to;
					}
				}

				nightsFrom.value = from;
				nightsTo.value = to;

				updateNights();
			});
		});


		updateNights();
	}


	// ==========================================
	// 5. Количество туристов
	// ==========================================

	if (touristsValue) {

		// Обновление количества туристов
		const updateTourists = () => {
			const adultsInput = form.querySelector(
				'input[name="adults"]:checked'
			);

			const childrenInput = form.querySelector(
				'input[name="children"]:checked'
			);

			state.adults = Number(adultsInput?.value || 2);
			state.children = Number(childrenInput?.value || 0);


			// Правильные окончания слов
			const adultsText = state.adults === 1
				? 'взрослый'
				: 'взрослых';

			const childrenText = state.children === 1
				? 'ребёнок'
				: state.children >= 2
					? 'ребёнка'
					: '';


			// Формируем итоговое значение
			let result = `${state.adults} ${adultsText}`;

			if (state.children > 0) {
				result += `, ${state.children} ${childrenText}`;
			}

			touristsValue.textContent = result;
		};


		// Обработчики выбора взрослых и детей
		form.querySelectorAll(
			'input[name="adults"], input[name="children"]'
		).forEach(input => {
			input.addEventListener('change', updateTourists);
		});


		updateTourists();
	}


	// ==========================================
	// 6. Начальная инициализация
	// ==========================================

	closeDropdowns();

};


// Запуск инициализации
initTourSearch();
