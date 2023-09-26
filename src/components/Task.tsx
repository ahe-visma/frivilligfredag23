import React from 'react';
import { BiCircle, BiPencil, BiSolidCheckCircle, BiTimeFive, BiX } from "react-icons/bi";
import { TaskProps } from "~/data/types";

export const Task = ({ task, actions }: TaskProps) => {
	return (
		<div className={`bg-white p-5 rounded-md font-body flex flex-col gap-1 shadow-md`}>
			<div className={"font-medium flex items-center gap-2"}>
				<div className={"cursor-pointer"} onClick={() => actions.toggle(task)}>
					{task.done ? <BiSolidCheckCircle /> : <BiCircle />}
				</div>
				<div className={"flex justify-between w-full"}>
					<span className={"font-medium " + (task.done ? "line-through" : "")}>{task.name}</span>
					<div className={"flex gap-1 items-center"}>
						<button className={"opacity-50 hover:opacity-100"} onClick={() => actions.edit(task)}><BiPencil/></button>
						<button className={"opacity-50 hover:opacity-100"} onClick={() => actions.delete(task)}><BiX/></button>
					</div>
				</div>
			</div>
			{task.deadline &&
				<div className={"flex items-center gap-1 ml-6 text-xs opacity-75"}>
					<BiTimeFive />
					<div>{new Date(task.deadline).toLocaleDateString()}</div>
				</div>
			}
		</div>
	);
};