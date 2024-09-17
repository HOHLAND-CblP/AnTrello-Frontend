'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import { useTasks } from '@/app/i/tasks/hooks/useTasks'
import { useTaskDnd } from '@/app/i/tasks/hooks/useTaskDnd'

import styles from './KanbanView.module.scss'
import { COLUMNS } from '@/app/i/tasks/columns.data'
import { KanbanColumn } from './KanbanColumn'


export function KanbanView() {

	const { items, setItems } = useTasks()

	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{COLUMNS.map(column => (
					<KanbanColumn
						items={items}
						label={column.label}
						value={column.value}
						setItems={setItems}
						key={column.value}
					/>
				))}
			</div>
		</DragDropContext>
	)
}