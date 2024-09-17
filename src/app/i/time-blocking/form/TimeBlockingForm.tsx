import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import  type { TypeTimeBlockFromState } from '@/types/time-block.types'
import { useUpdateTimeBlock } from '../hooks/useUpdateTimeBlock'
import { useCreateTimeBlock } from '../hooks/useCreateTimeBlock'
import { COLORS } from './colors.data'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { Button } from '@/components/ui/buttons/Button'
import { useTimeBlocks } from '@/app/i/time-blocking/hooks/useTimeBlocks'

export function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit } = useFormContext<TypeTimeBlockFromState>()

	const existsId = watch('id')

	const { updateTimeBlock } = useUpdateTimeBlock()
	const { createTimeBlock, isPending } = useCreateTimeBlock()
	const {items} = useTimeBlocks()
	
	const onSubmit: SubmitHandler<TypeTimeBlockFromState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || 'lightslategray' }

		if (id) {
			updateTimeBlock({
				id,
				data: dto
			})
		} else {
			console.log(dto.order)
			dto.order = items?.length || 0
			console.log(dto.order)
			createTimeBlock(dto)
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				{...register('name', {
					required: true
				})}
				id='name'
				label='Enter name:'
				placeholder='Enter name:'
				extra='mb-4'
			/>

			<Field
				{...register('duration', {
					required: true,
					valueAsNumber: true
				})}
				id='duration'
				label='Enter duration (min.):'
				placeholder='Enter duration (min.):'
				extra='mb-4'
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={COLORS.map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || COLORS[COLORS.length - 1]}
							isColorSelected
						/>
					)}
				/>
			</div>

			<Button
				type='submit'
				disabled={isPending}
				className='mt-6'
			>
				{existsId ? 'Update' : 'Create'}
			</Button>			
		</form>
	)
}