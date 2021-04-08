export const NAV_BAR = [
	{
		text: 'Sumary Dashboard',
		route: '/sumary',
		icon: 'fas fa-list-alt',
	},
	{
		text: 'Your Patient Dashboard',
		route: '/',
		icon: 'fas fa-columns',
	},
	{
		text: 'Need Relable Dashboard',
		route: '/?relabel=true',
		icon: 'fas fa-check',
	},
	{
		text: 'Expert Dashboard',
		route: '/?relabel=true&expert=true',
		icon: 'fas fa-book-medical',
		role: 'expert',
	},
	{
		text: 'Upload File',
		route: '/upload',
		icon: 'fas fa-upload',
	},
];
