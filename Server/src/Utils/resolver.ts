import { Response } from 'express'

export default function resolver(
	res: Response,
	code: number,
	message: string = '',
	data: any = {}
) {
	// message.length > 0 && console.log('Resolver: ', data)
	// console.log("RESOLVER FIRED", code)

	res.json({
		status: code,
		message: message,
		data: data
	})
}