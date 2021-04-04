interface Trainer {
	TrainerId: number
	Username: string
	Role: string
}

export default function Trainer(trainerId: number, username: string, role: string): void {
	this.TrainerId = trainerId
	this.Username = username
	this.Role = role
}
