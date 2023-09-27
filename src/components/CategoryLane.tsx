import React from 'react';
import { BiPlus } from "react-icons/bi";
import sortTasksByStatusAndDeadline from "~/util/sort";
import { Task } from "~/components";
import { CategoryLaneProps } from "~/data/types";
export const CategoryLane = ({ category, tasks, actions }: CategoryLaneProps) => {
	const bgClass = `bg-${category.color}-500`
	const textClass = `text-${category.color}-800`
	return (
		<div className={`${bgClass} rounded-xl flex grow basis-0 flex-col gap-5`}>
			<div>
				<span>{category.name}</span>
				<span>{tasks.length}</span>
			</div>

			<button onClick={() => actions.add(category.id)}>
				<BiPlus />
				New
			</button>

			<div>
				{tasks.sort(sortTasksByStatusAndDeadline)
				      .map(task => {
						  return <Task task={task} actions={actions} key={task.id} />
					  })
				}
			</div>
		</div>
	);
};