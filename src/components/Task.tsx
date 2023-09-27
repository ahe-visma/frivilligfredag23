import React from 'react';
import { BiCircle, BiPencil, BiSolidCheckCircle, BiTimeFive, BiX } from "react-icons/bi";
import { TaskProps } from "~/data/types";

export const Task = ({ task, actions }: TaskProps) => {
	return (
		<div className={`bg-white p-5 rounded-md font-body flex flex-col gap-1 shadow-md`}>
			<div className={"font-medium flex items-center gap-2"}>
				<div className={"cursor-pointer"} onClick={() => actions.toggle(task)}>
					{
						// TODO Circle or CheckCircle depending on whether the task is done
					}
				</div>
				<div className={"flex justify-between w-full"}>
					<span className={"font-medium " /* TODO font-medium and line-through if the task is done */}>{/* Task name */}</span>
					<div className={"flex gap-1 items-center"}>
						<button className={"opacity-50 hover:opacity-100"} onClick={() => actions.edit(task)}><BiPencil/></button>
						<button className={"opacity-50 hover:opacity-100"} onClick={() => actions.delete(task)}><BiX/></button>
					</div>
				</div>
			</div>
			{// TODO If the task has a deadline, show this ↓
				<div className={"flex items-center gap-1 ml-6 text-xs opacity-75"}>
					<BiTimeFive />
					<div>{/* TODO Format the date to look like in the mock */}</div>
				</div>
			}
		</div>
	);
};