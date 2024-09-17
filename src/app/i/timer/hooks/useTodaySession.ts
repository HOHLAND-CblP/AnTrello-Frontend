import { useQuery } from '@tanstack/react-query'
import { pomodoroService } from '@/services/pomodore.service'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'
import { useUpdateSession } from '@/app/i/timer/hooks/useUpdateSession'

export function useTodaySession({
	setActiveRound,
	setSecondsLeft,
}:ITimerState) {
	const { workInterval } = useLoadSettings()
	const { updateSession } = useUpdateSession()
	
	const {
		data: sessionResponse,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessionResponse?.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}

			if (!activeRound && sessionResponse)
				updateSession({
					id: sessionResponse.id!,
					data: { isCompleted: true }
				})
			else if (sessionResponse.isCompleted)
				updateSession({
					id: sessionResponse.id!,
					data: { isCompleted: false }
				})
		}
			
	}, [isSuccess, rounds])

	return { sessionResponse, isLoading, workInterval }
}