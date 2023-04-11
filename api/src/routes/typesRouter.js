const { Router } = require('express');
const handler = require('../handlers/handlers')

const typesRouter = Router();

typesRouter.get('/', handler.getTypes)

module.exports = typesRouter;