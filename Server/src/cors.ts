import { CorsOptions } from 'cors'

export const corsOptions = (whitelist: string[]): CorsOptions => {
	return {
		origin: (origin, callback: (arg0: Error | null, arg1?: any) => any) => {

			// console.log("ORIGIN", origin)
			if (!origin || whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true
	}
}

export const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// console.log("REQQQQ", req)

	if (req.method === "OPTIONS") {

		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
}