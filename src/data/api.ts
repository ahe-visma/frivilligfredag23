import { Category, Task } from "~/data/types";
import axios, { AxiosResponse } from "axios";

export const getAll = () => {
	return axios.get<{tasks: Task[], categories: Category[]}>("getAll")
}

export function addTask() {
	// TODO
}

export function editTask() {
	// TODO
}

export function deleteTask() {
	// TODO
}

export function toggleTask() {
	// TODO
}