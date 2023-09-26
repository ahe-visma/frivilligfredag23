import { Prisma, PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors"
import { Category, Task } from "../../src/data/types";

const prisma = new PrismaClient();
const server: FastifyInstance = fastify({logger: false});
server.register(cors)

server.post<{
	Body: CreateTaskBody;
}>(`/tasks`, async (req, res) => {
	const {name, done} = req.body;
	const categoryId = Number.parseInt(req.body.categoryId)
	const deadline = typeof req.body.deadline === "undefined" ? null : req.body.deadline
	const result = await prisma.task.create({
		data: {
			name,
			categoryId,
			done,
			deadline,
		},
	});
	return result;
});

server.post<{
	Body: CreateCategoryBody;
}>(`/categories`, async (req, res) => {
	const {name, color} = req.body;
	const result = await prisma.category.create({
		data: {
			name,
			color,
		},
	});
	return result;
});

server.put<{
	Params: Pick<Task, "id">;
	Body: CreateTaskBody;
}>("/tasks/:id", async (req, res) => {
	const {id} = req.params;
	const {name, done} = req.body;
	const categoryId = Number.parseInt(req.body.categoryId)
	const deadline = typeof req.body.deadline === "undefined" ? null : req.body.deadline

	return await prisma.task.update({
		where: {id: Number(id)},
		data: {name, categoryId, done, deadline},
	});
});

server.put<{
	Params: Pick<Category, "id">;
	Body: CreateCategoryBody;
}>("/categories/:id", async (req, res) => {
	const {id} = req.params;
	const {name, color} = req.body;

	return await prisma.category.update({
		where: {id: Number(id)},
		data: {name, color},
	});
});

server.delete<{
	Params: Pick<Task, "id">;
}>(`/tasks/:id`, async (req, res) => {
	const {id} = req.params;
	return await prisma.task.delete({
		where: {
			id: Number(id),
		},
	});
});

server.delete<{
	Params: Pick<Category, "id">;
}>(`/categories/:id`, async (req, res) => {
	const {id} = req.params;
	return await prisma.category.delete({
		where: {
			id: Number(id),
		},
	});
});

server.get("/ping", async (req, res) => {
	return {pong: "it worked!"};
});

server.get("/tasks", async (req, res) => {
	return await prisma.task.findMany();
});

server.get("/categories", async (req, res) => {
	return await prisma.category.findMany();
});

server.get("/getAll", async (req, res) => {
	return { tasks: await prisma.task.findMany(), categories: await prisma.category.findMany() };
});

server.get<{ Params: Pick<Task, "id"> }>(`/tasks/:id`, async (req, res) => {
	const {id} = req.params;

	const task = await prisma.task.findUnique({
		where: {id: Number(id)},
	});

	if (task) return task;

	res.status(404).send();
});

server.get<{ Params: Pick<Category, "id"> }>(`/categories/:id`, async (req, res) => {
	const {id} = req.params;
	const category = await prisma.category.findUnique({
		where: {id: Number(id)},
	});

	if (category) return category;

	res.status(404).send();
});

type CreateTaskBody = Omit<Task, "id"> & { categoryId: string }

type CreateCategoryBody = Omit<Category, "id">

server.listen({ port: 8080 }, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`
  🚀 Server ready at: http://localhost:8080`);
});
