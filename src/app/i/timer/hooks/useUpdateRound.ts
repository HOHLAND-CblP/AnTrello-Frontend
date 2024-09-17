import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypePomodoroRoundFromState } from '@/types/pomodoro.types'
import { pomodoroService } from '@/services/pomodore.service'

export function useUpdateRound() {
	const queryClient = useQueryClient();
	
	const {mutate: updateRound, isPending: isUpdateRoundPending} = useMutation({
		mutationKey: ['updateRound'],
		mutationFn: ({
			id,
			data
		}: {
			id: number
			data: TypePomodoroRoundFromState
		}) => pomodoroService.updateRound(id, data),
		onSuccess() {
			queryClient.invalidateQueries({queryKey: ['get today session']})
		}
	})
	
	return { updateRound, isUpdateRoundPending}
}