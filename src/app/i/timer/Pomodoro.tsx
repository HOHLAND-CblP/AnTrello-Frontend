'use client'

import { useTimer } from '@/app/i/timer/hooks/useTimer'
import { useTimerActions } from '@/app/i/timer/hooks/useTimerActions'
import { useTodaySession } from '@/app/i/timer/hooks/useTodaySession'
import Loader from '@/components/ui/Loader'
import { PomodoroRounds } from '@/app/i/timer/rounds/PomodoroRounds'
import { Pause, Play, RefreshCcw } from 'lucide-react'
import { formatTime } from '@/app/i/timer/format-time'
import { useDeleteSession } from '@/app/i/timer/hooks/useDeleteSession'
import { useCreateSession } from '@/app/i/timer/hooks/useCreateSession'
import { Button } from '@/components/ui/buttons/Button'

export function Pomodoro() {
	const timerState = useTimer()
	const { isLoading, workInterval, sessionResponse } = useTodaySession(timerState)

	const rounds = sessionResponse?.rounds
	const actions = useTimerActions({ ...timerState, rounds: rounds })

	const { isPending, mutate } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60))

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>{formatTime(timerState.secondsLeft)}</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse ? (
				<>
					{sessionResponse.isCompleted ? (
						<div className="text-1.5xl text-center font-bold text-brandLinear">Session completed</div>
					) : (
						<>
							<PomodoroRounds
								rounds={sessionResponse.rounds}
								nextRoundHandler={actions.nextRoundHandler}
								prevRoundHandler={actions.prevRoundHandler}
								activeRound={timerState.activeRound}
							/>
							<button
								className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
								onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
								disabled={actions.isUpdateRoundPending}
							>
								{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
							</button>
						</>
					)}
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionResponse.id)
						}}
						className="absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity"
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}