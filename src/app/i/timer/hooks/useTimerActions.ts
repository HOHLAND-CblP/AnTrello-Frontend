import { useUpdateRound } from '@/app/i/timer/hooks/useUpdateRound'
import { ITimerState } from '@/app/i/timer/timer.types'
import { useLoadSettings } from '@/app/i/timer/hooks/useLoadSettings'
import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined
}

export function useTimerActions({ 
	activeRound, 
	setIsRunning,
	setActiveRound,
	setSecondsLeft,
 	secondsLeft,
	rounds
}: TypeUseTimerActions) {
	const {workInterval} = useLoadSettings()
	const {isUpdateRoundPending, updateRound} = useUpdateRound()
	
	const pauseHandler = () => {
		

		setIsRunning(false)

		if (activeRound?.id)
			updateRound({
				id: activeRound?.id,
				data: {
					totalSeconds: secondsLeft,
					isCompleted: secondsLeft / 60 >= workInterval
				}
			})
	}
	
	const playHandler = () => {
		setIsRunning(true)
	}
	
	const nextRoundHandler = () => {
		if (!activeRound?.id) return
		
		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
		
		setSecondsLeft(workInterval * 60)
	}
	
	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)
		
		if (!lastCompletedRound?.id) return
		
		updateRound({
			id: lastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		})
		setSecondsLeft(workInterval * 60)
		
		setActiveRound(lastCompletedRound)
	}
	
	return {isUpdateRoundPending, prevRoundHandler, nextRoundHandler, pauseHandler, playHandler}
}