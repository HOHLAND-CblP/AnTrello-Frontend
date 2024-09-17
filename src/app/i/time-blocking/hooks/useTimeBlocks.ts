import { useQuery } from '@tanstack/react-query'
import { timeBlockService } from '@/services/time-block.service'
import { useEffect, useState } from 'react'
import { ITimeBlockResponse } from '@/types/time-block.types'

export const useTimeBlocks = () => {
	const {data, isLoading} = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlock() 
	})
	
	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(data)

	useEffect(() => {
		setItems(data)
	}, [data])
	
	return {items, setItems, isLoading}
}