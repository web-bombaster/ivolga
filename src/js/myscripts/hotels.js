function hotelsSliderInit() {
	const hotelsSlider = document.querySelector('.js-hotels-slider');

	if (!hotelsSlider) {
		return;
	}

	new Swiper(hotelsSlider, {
		slidesPerView: 1.2,
		spaceBetween: 12,

		navigation: {
			prevEl: '.hotels__prev',
			nextEl: '.hotels__next',
		},

		breakpoints: {
			460: {
				slidesPerView: 2.15,
				spaceBetween: 12,
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

hotelsSliderInit();