function filterTagsSliderInit() {
	const filterTagsSlider = document.querySelector('.js-hero-tags-slider');

	if (!filterTagsSlider) {
		return;
	}

	new Swiper(filterTagsSlider, {
		slidesPerView: 'auto',
		spaceBetween: 4,
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
	});
}

filterTagsSliderInit();