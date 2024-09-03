import { useQuery } from '@tanstack/react-query'
import { userServices } from '@/services/user.service'

export function useProfile() {
	const {data, isLoading} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userServices.getProfile()
	})
	
	return {data, isLoading}
}