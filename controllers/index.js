module.exports = function(app) {

    /* GET homepage */
    app.get('/', function(req, res) {
        res.render('index', { title: 'Suprez-Slides' });
    });

};