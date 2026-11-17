function selectedToursInit() {
	const selectedTours = document.querySelector('.js-stours-slider');

	if (!selectedTours) {
		return;
	}

	new Swiper(selectedTours, {
		slidesPerView: 1.1,
		spaceBetween: 12,
		
		pagination: {
			el: '.stours-slider__pagination',
			clickable: true,
		},
		
		breakpoints: {
			601: {
				slidesPerView: 1,
				spaceBetween: 14,
			}
		},
	});
}

selectedToursInit();