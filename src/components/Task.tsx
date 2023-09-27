import React from 'react';
import { BiCircle, BiPencil, BiSolidCheckCircle, BiTimeFive, BiX } from "react-icons/bi";
import { TaskProps } from "~/data/types";

export const Task = ({ task, actions }: TaskProps) => {
	return (
		<div>
			<div>
				<div onClick={() => actions.toggle(task)}>
					{task.done ? <BiSolidCheckCircle /> : <BiCircle />}
				</div>
				<div>
					<span>{task.name}</span>
					<div>
						<button onClick={() => actions.edit(task)}><BiPencil/></button>
						<button onClick={() => actions.delete(task)}><BiX/></button>
					</div>
				</div>
			</div>
			{task.deadline &&
				<div>
					<BiTimeFive />
					<div>{new Date(task.deadline).toLocaleDateString()}</div>
				</div>
			}
		</div>
	);
};