(() => {
	'use strict';

	document.documentElement.classList.add('left-js');

	const button = document.querySelector('[data-left-menu-button]');
	const navigation = document.querySelector('[data-left-navigation]');
	if (button && navigation) {
		button.addEventListener('click', () => {
			const open = navigation.classList.toggle('is-open');
			button.setAttribute('aria-expanded', String(open));
		});
	}

	const lightboxImages = Array.from(document.querySelectorAll('.article-body img, .featured-media-single img'))
		.filter((image) => !image.closest('a') && image.dataset.noLightbox !== 'true');

	if (lightboxImages.length === 0) return;

	const lightbox = document.createElement('div');
	lightbox.className = 'left-image-lightbox';
	lightbox.hidden = true;
	lightbox.setAttribute('role', 'dialog');
	lightbox.setAttribute('aria-modal', 'true');
	lightbox.setAttribute('aria-label', 'Image preview');
	lightbox.innerHTML = '<button class="left-image-lightbox-close" type="button" aria-label="Close image preview">&times;</button><img alt="">';
	document.body.appendChild(lightbox);

	const preview = lightbox.querySelector('img');
	const closeButton = lightbox.querySelector('.left-image-lightbox-close');
	let trigger = null;

	const closeLightbox = () => {
		if (lightbox.hidden) return;
		lightbox.hidden = true;
		document.body.classList.remove('left-lightbox-open');
		preview.removeAttribute('src');
		preview.alt = '';
		if (trigger) trigger.focus({ preventScroll: true });
		trigger = null;
	};

	const openLightbox = (image) => {
		trigger = image;
		preview.src = image.currentSrc || image.src;
		preview.alt = image.alt || '';
		lightbox.hidden = false;
		document.body.classList.add('left-lightbox-open');
		closeButton.focus({ preventScroll: true });
	};

	lightboxImages.forEach((image) => {
		image.classList.add('left-zoomable-image');
		image.tabIndex = image.tabIndex >= 0 ? image.tabIndex : 0;
		image.setAttribute('role', 'button');
		image.setAttribute('aria-label', image.alt ? `Enlarge image: ${image.alt}` : 'Enlarge image');
		image.addEventListener('click', () => openLightbox(image));
		image.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openLightbox(image);
			}
		});
	});

	closeButton.addEventListener('click', closeLightbox);
	preview.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) closeLightbox();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
	});
})();
