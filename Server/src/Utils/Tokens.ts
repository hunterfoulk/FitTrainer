import * as jwt from 'jsonwebtoken'
import Trainer from '../Models/Trainer'
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const TRAINER_SECRET = process.env.JWT_TRAINER_SECRET

const options = { expiresIn: '7d', issuer: 'FT-Server' }
import { Response } from 'express'

export function createAccessToken(trainer: typeof Trainer): string {
	return jwt.sign({ trainer }, ACCESS_SECRET, options)
}

export function createTrainerToken(trainer: typeof Trainer): string {
	return jwt.sign({ trainer }, TRAINER_SECRET, options)
}

export function sendTrainerCookie(res: Response, token: string) {
	res.cookie("_ftTrainerAuth", token, {
		httpOnly: true,
		expires: new Date(Date.now() + (6.048e+8 * 4)),
		path: "/"
	})
}

export function revokeTrainerCookie(res: Response) {
	console.log({ tokenRevoked: true })
	res.clearCookie('_ftTrainerAuth')
}
