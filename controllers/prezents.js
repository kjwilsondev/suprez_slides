const Prez = require('../models/prez');

module.exports = app => {

    /* CREATE presentation from prez-new form */
    app.post('/prez/new', (req, res) => {
        // console.log(req.body);
        const prez = new Prez(req.body);
        console.log(prez)
        post.save((err, prez) => {
            console.log("saving")
            return res.redirect(`/prez`);
        });

    });

}