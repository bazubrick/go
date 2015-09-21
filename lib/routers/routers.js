Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'NotFound'
});
Router.route('home',{
	path:'/',
	template: 'home'
});

