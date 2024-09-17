import { useTimeBlocks } from './hooks/useTimeBlocks'
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd'
import Loader from '@/components/ui/Loader'
import { calcHoursLeft } from './calc-left-time'

import styles from './TimeBlocking.module.scss'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TimeBlock } from '@/app/i/time-blocking/TimeBlock'

export function TimeBlockingList() {
	const {items, setItems, isLoading} = useTimeBlocks()
	const {handleDragEnd, sensors} = useTimeBlockDnd(items, setItems)
	
	if (isLoading) return <Loader/>
	
	const { hoursLeft } = calcHoursLeft(items)
	
	
	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext 
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map(item => (
								<TimeBlock 
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add the first time-block on the right panel</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div>
				{hoursLeft > 0 
					? `${hoursLeft} hours out of 24 left for sleep`
					: 'No hours left for sleep'}
			</div>
		</div>
	)
}