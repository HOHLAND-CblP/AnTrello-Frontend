import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeUserForm } from '@/types/auth.types'
import { userServices } from '@/services/user.service'
import { toast } from 'sonner'

export function useUpdateSettings() {
	
	const queryClient = useQueryClient()
	
	const {mutate, isPending} = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userServices.update(data),
		onSuccess() {
			toast.success('Successfully updated profile!')
			queryClient.invalidateQueries({queryKey: ['profile']})
		}
	})
	
	return {mutate, isPending}
}