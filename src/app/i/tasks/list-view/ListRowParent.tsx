import { ITaskResponse } from '@/types/task.types'
import { Dispatch, SetStateAction } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { filterTasks } from '../filter-tasks'
import styles from './ListView.module.scss'
import { ListRow } from '@/app/i/tasks/list-view/ListRow'
import { FILTERS } from '@/app/i/tasks/columns.data'
import { ListAddRowInput } from '@/app/i/tasks/list-view/ListAddRowInput'

interface IListRowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRowParent({
	value, label, items, setItems
}: IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{
				provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<div className={styles.colHeading}>
							<div className='w-full'>{label}</div>							
						</div>

						{filterTasks(items, value)?.map((item, index) => (
							<Draggable 
								key={item.id}
									draggableId={item.id.toString()}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ListRow
											key={item.id}	
											item={item} 
											setItems={setItems} 
										/>
									</div>	
								)}
							</Draggable>
						))}

						{provided.placeholder}

						{value !== 'completed' && !items?.some(item => !item.id) && (
							<ListAddRowInput
								setItems={setItems}
								filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
							/>
						)}
						
					</div>
				)
			}
		</Droppable>
	)
}