import { Router as R } from 'express'

import trainerRouter from './Trainer-Router'

export default function Router(router: R): R {
	trainerRouter(router)
	return router
};