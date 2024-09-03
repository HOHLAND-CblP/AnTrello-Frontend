import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { Statistics } from '@/app/i/Statistics'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<Heading title='Statistics' />
			<Statistics />
		</div>
	)
}