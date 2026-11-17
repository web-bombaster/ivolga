function flistSliderInit() {
	const flistSlider = document.querySelector('.js-hero-flist-slider');

	if (!flistSlider) {
		return;
	}

	new Swiper(flistSlider, {
		slidesPerView: 'auto',
		spaceBetween: 4,
		autoplay: {
			delay: 320000,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.flist-pagination',
			dynamicBullets: true,
			clickable: true,
		},
	});
}

flistSliderInit();