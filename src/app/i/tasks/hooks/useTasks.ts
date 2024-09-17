import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { useEffect, useState } from 'react'
import { ITaskResponse } from '@/types/task.types'

export function useTasks() {
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})
	
	const [items, setItems] = useState<ITaskResponse[] | undefined>(data)
	
	useEffect(() => {
		setItems(data)
	}, [data])
	
	return {items, setItems}
}