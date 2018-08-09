const { Router } = require('express');
const controller = require('../controllers/access-control');

const routes = new Router();

routes.post('/signup', async (req, res) => {
    const userExists = await controller.hasUser(req.body.username);

    if (userExists) {
        res.json({status: 'error', message: 'user already exists'});
    }
    else {
        await controller.createNewUser(req.body.username, req.body.password);

        const accessToken = controller.createNewAccessToken(req.body.username);
        res.set('authorization', 'bearer ' + accessToken);

        res.json({status: 'ok', message: 'user created successfully'});
    }
});

routes.post('/login', async (req, res) => {
    const credentialsStatus = await controller.checkCredentials(
        req.body.username,
        req.body.password
    );

    switch (credentialsStatus) {
        case 1:
            res.json({status: 'ok', message: 'login successful'});
            const accessToken = controller.createNewAccessToken(req.body.username);
            res.set('authorization', 'bearer ' + accessToken);
            break;
        case 0:
            res.json({status: 'error', message: 'invalid username or password'});
            break;
        case -1:
        default:
            res.json({status: 'error', message: 'user not found'});
            break;
    }
});

routes.get('/logout', (req, res) => {
    res.removeHeader('authorization');
    res.json({status: 'ok', message: 'you are now logged out'});
});


// export routes under dedicated api namespace
const router = new Router();
router.use('/access-control', routes);
module.exports = router;
