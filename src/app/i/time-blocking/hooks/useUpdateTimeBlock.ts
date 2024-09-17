import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTimeBlockFromState } from '@/types/time-block.types'
import { timeBlockService } from '@/services/time-block.service'

export function useUpdateTimeBlock() {
	const queryClient = useQueryClient();

	const {mutate: updateTimeBlock, isPending} = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: ({id, data}: {id: number, data: TypeTimeBlockFromState}) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		}
	})

	return {updateTimeBlock, isPending}
}