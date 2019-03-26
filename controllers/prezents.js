const Prez = require('../models/prez');

module.exports = app => {

    /* GET prez-new form */
    app.get('/prez/new', function(req, res) {
        console.log("DID YOU MAKE IT???")
        res.render('prez-new');
    });

    /* CREATE presentation from prez-new form */
    app.post('/prez', function(req, res) {
        console.log(req.body);
        const prez = new Prez(req.body);
        console.log(prez)
        prez.save((err, prez) => {
            console.log("saving")
            return res.redirect(`/prez`);
        });

    });

    /* GET presentation */
    app.get('/prez', function(req, res) {
        res.render('prez');
    });

}