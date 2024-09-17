import { useCallback, useEffect } from 'react'
import { TypeTaskFormState } from '@/types/task.types'
import debounce from 'lodash.debounce'
import { UseUpdateTask } from '@/app/i/tasks/hooks/useUpdateTask'
import { useCreateTask } from '@/app/i/tasks/hooks/useCreateTask'
import { UseFormWatch } from 'react-hook-form'

const debounceTimer = 1000

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: number
}

export function useTaskDebounce({watch, itemId}: IUseTaskDebounce) {
	const {createTask} = useCreateTask()
	const {updateTask} = UseUpdateTask()
	
	const debouncedCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData)
		}, debounceTimer),
		[]
	)

	const debouncedUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({id: itemId, data: formData})
		}, debounceTimer),
		[]
	)
	
	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debouncedUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debouncedCreateTask(formData)
			}

			return () => {
				unsubscribe()
			}
		})
	}, [watch(), debouncedUpdateTask, debouncedCreateTask])
	
	
}