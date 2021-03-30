export const loadFromCDN = (url, type) => {
	if (type === 'js') {
		$('head').append(`<script src="${ url }"></script>`);
	} else if (type === 'css') {
		$('head').append(`<link rel="stylesheet" href="${ url }" />`);
	}
};
