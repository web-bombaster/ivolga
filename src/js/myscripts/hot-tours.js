function hotToursSliderInit() {
	const hotToursSlider = document.querySelector('.js-hot-tours-slider');

	if (!hotToursSlider) {
		return;
	}

	new Swiper(hotToursSlider, {
		slidesPerView: 1.1,
		spaceBetween: 10,

		navigation: {
			prevEl: '.hot-tours__prev',
			nextEl: '.hot-tours__next',
		},

		breakpoints: {
			// 460: {
			// 	slidesPerView: 2.15,
			// 	spaceBetween: 20,
			// },
			768: {
				slidesPerView: 2,
				spaceBetween: 14,
			},
			993: {
				slidesPerView: 3,
				spaceBetween: 14,
			},
			1300: {
				slidesPerView: 4,
				spaceBetween: 14,
			}
		},
	});
}

hotToursSliderInit();