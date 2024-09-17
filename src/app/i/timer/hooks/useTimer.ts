import { useEffect, useState } from 'react'
import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import { useLoadSettings } from '@/app/i/timer/hooks/useLoadSettings'
import { ITimerState } from '@/app/i/timer/timer.types'
import { useUpdateRound } from '@/app/i/timer/hooks/useUpdateRound'

export function useTimer() : ITimerState {
	const {breakInterval, workInterval} = useLoadSettings()
	
	const [isRunning, setIsRunning] = useState(false);
	const [isBreakTime, setIsBreakTime] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(1);
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>();
	const {updateRound} = useUpdateRound()

	
	
	useEffect(() => {
		if (!activeRound) {
			setIsRunning(false)
			return 
		}
		
		let interval: NodeJS.Timeout | null = null;
		
		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}
			
		return () => {
			if (interval) clearInterval(interval) 
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return

		setIsBreakTime(!isBreakTime)

		if (isBreakTime) {
			setSecondsLeft(workInterval * 60)
			updateRound({
				id: activeRound?.id!,
				data: {
					totalSeconds: 0,
					isCompleted: true
				}
			})
		}
		else {
			setSecondsLeft(breakInterval * 60)
		}
	}, [secondsLeft, isBreakTime, workInterval, breakInterval])
		
	useEffect(() => {
		if (!activeRound)
			setSecondsLeft(workInterval * 60) 
		else if (activeRound.totalSeconds === 0)
			setSecondsLeft(workInterval * 60)
	}, [workInterval])

	
	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning
	}
}