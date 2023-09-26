import { Task } from "~/data/types";

const sortTasksByStatusAndDeadline = (task1: Task, task2: Task) => {
	if (task1.done && !task2.done) return 1;
	else if (task2.done && !task1.done) return -1;
	else if (task1.done === task2.done) {
		if (task1.deadline === task2.deadline) return 0;
		else if ((task1.deadline ?? 0) > (task2.deadline ?? 0)) return 1
		else return -1
	}
	else return 0;
}

export default sortTasksByStatusAndDeadline