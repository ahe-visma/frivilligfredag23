export type Category = {
	id: number,
	name: string,
	color: string
}

export type Task = {
	id: number,
	name: string,
	done: boolean,
	categoryId: Category["id"],
	deadline?: string
}

export type DataType = {
	tasks: Task[],
	categories: Category[]
}

export type Actions = {
	add: (categoryId: Task["categoryId"]) => void,
	edit: (task: Task) => void,
	delete: (task: Task) => Promise<void>,
	toggle: (task: Task) => Promise<void>
}


export type TaskProps = Partial<HTMLDivElement> & {
	task: Task,
	actions: Actions
}

export type CategoryLaneProps = Partial<HTMLDivElement> & {
	category: Category,
	tasks: Task[],
	actions: Actions
}

export type modalPrefillType = Partial<{ data: Partial<Task>, action: "create" | "update" }>