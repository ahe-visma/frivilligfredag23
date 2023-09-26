import { Category, Task } from "~/data/types";
import axios, { AxiosResponse } from "axios";

export const getAll = () => {
	return axios.get<{tasks: Task[], categories: Category[]}>("getAll")
}

export const addTask = (task: Task) => {
	return axios.post<any, AxiosResponse, Task>("tasks", task)
}

export const editTask = (task: Task) => {
	return axios.put<any, AxiosResponse, Task>(`tasks/${task.id}`, task)
}

export const deleteTask = (task: Task) => {
	return axios.delete(`tasks/${task.id}`)
}

export const toggleTask = (task: Task) => {
	task.done = !task.done
	return axios.put<any, AxiosResponse, Task>(`tasks/${task.id}`, task)
}