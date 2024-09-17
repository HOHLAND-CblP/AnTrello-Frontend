import type { IBase } from './root.types'

export enum EnumTaskPriority {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High'
}

export interface ITaskResponse extends IBase {
	name: string
	priority?: EnumTaskPriority
	isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
