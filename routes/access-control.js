const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
    res.end('access-control');
});

const router = new Router();
router.use('/access-control', routes);
module.exports = router;
