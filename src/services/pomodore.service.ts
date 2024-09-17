import { axiosWithAuth } from '@/api/interceptors'
import {
	IPomodoroSessionResponse, TypePomodoroRoundFromState,
	TypePomodoroSessionFromState
} from '@/types/pomodoro.types'

class PomodoroService {
	private BASE_URL = '/user/timer'
	
	async getTodaySession() {
		const response = await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		)
		return response.data
	}
	
	async createSession() {
		const response = await axiosWithAuth.post<IPomodoroSessionResponse>(
			this.BASE_URL
		)
		return response.data
	}
	
	async updateSession(id: number,  data: TypePomodoroSessionFromState) {
		console.log(data)
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response.data
	}
	
	async deleteSession(id: number) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
	
	async updateRound(id: number, data: TypePomodoroRoundFromState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data)
		return response.data
	}
}

export const pomodoroService = new PomodoroService()