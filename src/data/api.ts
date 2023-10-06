import { Category, Task } from "~/data/types";
import axios, { AxiosResponse } from "axios";

export const getAll = () => {
	return axios.get<{tasks: Task[], categories: Category[]}>("getAll")
}

export function addTask(task: Task) {
	// TODO
}

export function editTask(task: Task) {
	// TODO
}

export function deleteTask(task: Task) {
	// TODO
}

export function toggleTask(task: Task) {
	// TODO
}