import { axiosWithAuth } from '@/api/interceptors'
import { ITimeBlockResponse, TypeTimeBlockFromState } from '@/types/time-block.types'

class TimeBlockService {
	private BASE_URL = "/user/time-blocks";
	
	async getTimeBlock() {
		const response = await axiosWithAuth.get<ITimeBlockResponse[]>(
			this.BASE_URL
		)
		return response.data
	}
	
	async createTimeBlock(data: TypeTimeBlockFromState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response.data
	}
	
	async updateOrderTimeBlock(ids: number[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids })
		return response.data
	}
	
	async updateTimeBlock(id: number, data: TypeTimeBlockFromState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response.data
	}
	
	async deleteTimeBlock(id: number) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
}

export const timeBlockService = new TimeBlockService()