function initIdeaTags() {
	const ideaTags = document.querySelectorAll('.idea-item__tags');
	const visibleCount = 6;

	ideaTags.forEach((container) => {
		const tags = Array.from(container.querySelectorAll('.idea-item__tag:not(.idea-item__tag--btn)'));
		const button = container.querySelector('.idea-item__tag--btn');

		if (!button || tags.length <= visibleCount) {
			if (button) {
				button.classList.add('hidden');
			}
			return;
		}

		tags.forEach((tag, index) => {
			if (index >= visibleCount) {
				tag.classList.add('hidden');
			}
		});

		button.addEventListener('click', () => {
			const isOpen = button.classList.toggle('open');

			tags.forEach((tag, index) => {
				if (index >= visibleCount) {
					tag.classList.toggle('hidden', !isOpen);
				}
			});

			button.childNodes[0].textContent = isOpen ? 'Скрыть ' : 'Еще ';
		});
	});
}

initIdeaTags();