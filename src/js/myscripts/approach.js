function approachSliderInit() {
	const approachSlider = document.querySelector('.js-approach-slider');

	if (!approachSlider) {
		return;
	}

	new Swiper(approachSlider, {
		slidesPerView: 1.1,
		spaceBetween: 10,
		
		navigation: {
			prevEl: '.approach__prev',
			nextEl: '.approach__next',
		},

		breakpoints: {
			460: {
				slidesPerView: 2.15,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 14,
			},
			993: {
				slidesPerView: 4,
				spaceBetween: 14,
			},
			1300: {
				slidesPerView: 5,
				spaceBetween: 14,
			}
		},
	});
}

approachSliderInit();