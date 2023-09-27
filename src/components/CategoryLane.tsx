import React from 'react';
import { BiPlus } from "react-icons/bi";
import sortTasksByStatusAndDeadline from "~/util/sort";
import { Task } from "~/components";
import { CategoryLaneProps } from "~/data/types";
export const CategoryLane = ({ category, tasks, actions }: CategoryLaneProps) => {
	const bgClass = `bg-${category.color}-500`
	const textClass = `text-${category.color}-800`
	return (
		<div className={`p-5 ${bgClass} bg-opacity-5 rounded-xl flex grow basis-0 flex-col gap-5`}>
			<div className={`flex justify-between font-title items-center`}>
				<span className={`font-medium text-neutral-800 text-xl`}>{/* TODO Category name */}</span>
				<span className={`p-2 ${bgClass} ${textClass} bg-opacity-5 rounded-md text-xs font-medium`}>{/* TODO Number of tasks in this category */}</span>
			</div>

			<button
				className={`p-2 flex grow ${bgClass} ${textClass} font-title bg-opacity-5 hover:bg-opacity-10 rounded-md text-xs font-medium justify-center items-center gap-1`}
				onClick={() => actions.add(category.id)}
			>
				<BiPlus />
				New
			</button>

			<div className={"flex flex-col gap-5"}>
				{
					// tasks.sort(sortTasksByStatusAndDeadline)
					// TODO For each task:
					// render the task using the Task component
				}
			</div>
		</div>
	);
};