module.exports = function(app) {

    /* GET homepage */
    app.get('/', function(req, res) {
        res.render('index', { title: 'Suprez-Slides' });
    });

    /* GET prez-new form */
    app.get('/prez/new', function(req, res) {
        console.log("DID YOU MAKE IT???")
        res.render('prez-new');
    });

    /* GET presentation */
    app.get('/prez', function(req, res) {
        res.render('prez');
    });
};