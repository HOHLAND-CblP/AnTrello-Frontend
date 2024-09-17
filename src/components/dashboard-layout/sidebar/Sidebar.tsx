import Link from 'next/link'
import { GanttChartSquare } from 'lucide-react'
import { COLORS } from '@/constants/color.constants'
import { LogoutButton } from '@/components/dashboard-layout/sidebar/LogoutButton'
import { MENU } from '@/components/dashboard-layout/sidebar/menu.data'
import { MenuItem } from '@/components/dashboard-layout/sidebar/MenuItem'

export function Sidebar() {
	return <aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
		<div>
			<Link 
				href='/'
				className='flex items-center gap-2.5 p-layout border-b border-b-border'
			>
				<GanttChartSquare
					color={COLORS.primary}
					size={38}
				/>
				<span className='text-2xl font-bold relative'>
					AnTrello
					<span className='absolute -top-1 -right-12 text-xs opacity-40 rotate-[18deg] font-normal'>
						bmw govno
					</span>
				</span>
			</Link>
			<div className='p-3 relative'>
				<LogoutButton/>
				{MENU.map(item => (
					<MenuItem 
						item={item}
						key={item.link}
					/>
				))}
			</div>
		</div>
		<footer className='text-xs opacity-40 font-normal text-center p-layout'>
			Powered by {' '}
			<a
				href='https://t.me/hohland_cblp'
				target='_blank'
				rel='noreferrer'
				className='hover:text-primary text-brand-300 transition-colors'
			>
				hohland_cblp
			</a>
			. <br /> All rights are destroyed.
		</footer>
	</aside>
}

