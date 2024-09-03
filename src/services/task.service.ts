import { axiosWithAuth } from '@/api/interceptors'
import { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

class TaskService {
	private BASE_URL = "/user/tasks";
	
	async getTasks() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
		return  response.data;
	}
	
	async createTask(data: TypeTaskFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response.data
	}
	
	async updateTask(id: number, data: TypeTaskFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response.data
	}
	
	async deleteTask(id: number) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
}

export const taskService = new TaskService();