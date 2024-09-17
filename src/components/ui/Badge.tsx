import type { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'
import { EnumTaskPriority } from '@/types/task.types'

interface IBadge {
	className?: string
	variant?: string
	style?: CSSProperties
}

const badge = tv({
	base: 'rounded-lg  py-1 px-2 text-xs font-semibold text-sm transition',
	variants: {
		backgroundColor: {
			gray: 'bg-gray-500/20',
			High: 'bg-red-400/60',
			Medium: 'bg-orange-400/70',
			Low: 'bg-blue-400/70'
		}
	},
	defaultVariants: {
		backgroundColor: 'gray'
	}
})

export function Badge({
												children,
												className,
												variant,
												style
											}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={badge({
				backgroundColor: variant as keyof typeof EnumTaskPriority,
				className
			})}	
			style={style}
		>
			{children}
		</span>
	)
}
