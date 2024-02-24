const { Router } = require('express');

const router = Router();

// setCookie
router.post('/setCookie', (req, res) => {
    const body = req.body;
    return res.cookie('cookieUser', { userEmail: `${body.email}` }, { maxAge: 20000, signed: true } ).send('Cookie set!');

})

// getCookie
router.get('/', (req, res) => {
    console.log(req.cookies);
    return res.json ({ cookie: req.cookies, signedCookies: req.signedCookies })
})

//req.cookies cookies sin firma
//rq.signedCookies cookies con firma


// deleteCookie
router.get('/deleteCookie', (req, res) => {
    return res.clearCookie('cookieUser').send('Cookie deleted!');
})
module.exports = router;