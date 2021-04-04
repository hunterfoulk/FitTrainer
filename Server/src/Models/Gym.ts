interface Gym {
    TrainerId: number
    Username: string
    Role: string
}

export default function Trainer(gymId: number, username: string, role: string): void {
    this.GymId = gymId
    this.Username = username
    this.Role = role
}
