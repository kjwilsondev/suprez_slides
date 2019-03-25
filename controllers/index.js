module.exports = function(app) {

    /* GET homepage */
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Suprez-Slides' });
    });

    /* GET slide link form */
    app.get('/prez/new', function(req, res, next) {
        res.render('slide-link');
    });

    app.post('/prez/new', (req, res, next) => {
        // link = new Presentation(req.params.link);
        console.log("link");
    });

    /* GET presentation */
    app.get('/prez', function(req, res, next) {
        res.render('prez');
    });
};
