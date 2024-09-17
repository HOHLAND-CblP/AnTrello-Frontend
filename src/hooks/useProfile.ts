import { useQuery } from '@tanstack/react-query'
import { userServices } from '@/services/user.service'

export function useProfile() {
	const {data, isLoading, isSuccess} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userServices.getProfile()
	})
	
	return {data, isLoading, isSuccess}
}