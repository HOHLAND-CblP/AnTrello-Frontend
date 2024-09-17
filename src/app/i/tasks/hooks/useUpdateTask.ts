import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTaskFormState } from '@/types/task.types'
import { taskService } from '@/services/task.service'

export function UseUpdateTask(key?:string) {
	const queryClient = useQueryClient();
	
	const {mutate: updateTask} = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({id, data}: {id: number, data: TypeTaskFormState}) => 
			taskService.updateTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})
	
	return {updateTask}
}