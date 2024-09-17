import { Dispatch, SetStateAction } from 'react'
import { ITaskResponse } from '@/types/task.types'

interface IKanbanAddCardInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanAddCardInput({filterDate, setItems}: IKanbanAddCardInput) {
	
	const addCard = () => {
		setItems(prev => {
			if (!prev) return
			
			return [
				...prev,
				{
					id: 0,
					name: '',
					isCompleted: false, 
					createdAt: filterDate
				}
			]
		})
	}
	
	return (
		<div className={'mt-5'}>
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}