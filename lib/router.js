Router.route('/', function(){
    this.layout('layout');
    this.render('index');
});

Router.route('/add', function(){
    this.layout('layout');
    this.render('insertBookForm');
});

Router.route('/delete', function(){
    this.layout('layout');
    this.render('delete');
});
