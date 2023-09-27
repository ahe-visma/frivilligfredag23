import { Category, Task } from "~/data/types";
import axios, { AxiosResponse } from "axios";

export const getAll = () => {
	return axios.get<{tasks: Task[], categories: Category[]}>("getAll")
}

export const addTask = (task: Task) => {
	// TODO
}

export const editTask = (task: Task) => {
	// TODO
}

export const deleteTask = (task: Task) => {
	// TODO
}

export const toggleTask = (task: Task) => {
	// TODO
}