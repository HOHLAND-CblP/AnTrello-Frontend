import { useProfile } from '@/hooks/useProfile'
import { useEffect, useState } from 'react'

export function useLoadSettings() {
	const { data, isLoading } = useProfile()
	
	const [workInterval, setWorkInterval] = useState(data?.user.workInterval ?? 50) 
	const [breakInterval, setBreakInterval] = useState(data?.user.breakInterval ?? 10)

	useEffect(() => {
		if (!isLoading) {
			setWorkInterval(data?.user.workInterval!)
			setBreakInterval(data?.user.breakInterval!)
		}
	}, [isLoading])

	return {workInterval, breakInterval }
}