function stepsSliderInit() {
	const stepsSlider = document.querySelector('.js-related-posts');

	if (!stepsSlider) {
		return;
	}

	new Swiper(stepsSlider, {
		slidesPerView: 1.1,
		spaceBetween: 10,
		
		navigation: {
			prevEl: '.related-posts__prev',
			nextEl: '.related-posts__next',
		},

		breakpoints: {
			600: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			993: {
				slidesPerView: 3,
				spaceBetween: 20,
			}
		},
	});
}

stepsSliderInit();