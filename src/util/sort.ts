import { Task } from "~/data/types";

const sortTasksByStatusAndDeadline = (task1: Task, task2: Task) => {
	// TODO Sorting mechanism, where primary sort is whether the task is finished, and secondary sort is the deadline
	// Sort all unfinished tasks on top, all finished tasks on the bottom
	// Within these, sort them further by the deadline: earliest = first
}

export default sortTasksByStatusAndDeadline