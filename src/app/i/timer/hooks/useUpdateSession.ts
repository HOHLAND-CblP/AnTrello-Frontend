import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypePomodoroSessionFromState } from '@/types/pomodoro.types'
import { pomodoroService } from '@/services/pomodore.service'

export function useUpdateSession() {
	const queryClient = useQueryClient();

	const {mutate: updateSession, isPending: isUpdateSessionPending} = useMutation({
		mutationKey: ['updateSession'],
		mutationFn: ({
		 	  id,
		 	  data
		  }: {
			id: number
			data: TypePomodoroSessionFromState
		}) => pomodoroService.updateSession(id, data),
		onSuccess() {
			queryClient.invalidateQueries({queryKey: ['get today session']})
		}
	})

	return { updateSession, isUpdateSessionPending}
}