import type {PropsWithChildren} from 'react'
import { Sidebar } from '@/components/dashboard-layout/sidebar/Sidebar'
import { Header } from '@/components/dashboard-layout/header/Header'

export default function DashboardLayout({children}: PropsWithChildren<unknown>) {
	return <div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr] shrink-0'>
		<Sidebar/>
		
		<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
			<Header/>
			{children}
		</main>
	</div>
}