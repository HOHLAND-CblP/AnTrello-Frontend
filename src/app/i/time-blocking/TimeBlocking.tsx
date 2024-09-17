'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { TypeTimeBlockFromState } from '@/types/time-block.types'
import { TimeBlockingForm } from '@/app/i/time-blocking/form/TimeBlockingForm'
import { TimeBlockingList } from '@/app/i/time-blocking/TimeBlockingList'

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFromState>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
		 		<TimeBlockingList/>		 
				<TimeBlockingForm/>
			</div>
		</FormProvider>
	)
}