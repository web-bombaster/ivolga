const headerFixed = () => {
	const header = document.querySelector('.header');

	if (!header) return;

	const heightHeader = header.offsetHeight; // высота хедера
	document.body.style.paddingTop = heightHeader + 'px';
};

headerFixed();

// запускаем headerFixed при ресайзе
window.addEventListener('resize', headerFixed);