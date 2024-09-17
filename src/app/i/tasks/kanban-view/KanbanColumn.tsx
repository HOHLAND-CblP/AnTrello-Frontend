import { ITaskResponse } from '@/types/task.types'
import { Dispatch, SetStateAction } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { filterTasks } from '../filter-tasks'
import styles from './KanbanView.module.scss'
import { KanbanCard } from './KanbanCard'
import { FILTERS } from '@/app/i/tasks/columns.data'
import { KanbanAddCardInput } from './KanbanAddCardInput'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanColumn({
	value, label, items, setItems
}: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{
				provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<div className={styles.column}>
							<div className={styles.columnHeading}>{label}</div>

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
											<KanbanCard
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
								<KanbanAddCardInput
									setItems={setItems}
									filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
								/>
							)}							
						</div>						
					</div>
				)
			}
		</Droppable>
	)
}