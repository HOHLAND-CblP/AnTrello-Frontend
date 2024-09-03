import { axiosWithAuth } from '@/api/interceptors'
import { IUser, TypeUserForm } from '@/types/auth.types'



export interface IProfileResponse {
	user: IUser
	statistics: {
		label: string
		value: number
	}[]
}

class UserServices {
	private BASE_URL = 'user/profile'
	
	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}
	
	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put<IProfileResponse>(this.BASE_URL, data)
		return response.data
	}
}

export const userServices = new UserServices()