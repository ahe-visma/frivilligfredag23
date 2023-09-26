import React from 'react';
import { Form } from 'react-final-form'
import categories from "~/data/mockData";
import { addTask, editTask } from "~/data/api";
import { Task } from "~/data/types";
import { Input, Button, Label, Select, Dialog } from "~/components";

type ModalProps = Pick<HTMLDialogElement, "close"> & Partial<{ initialData: Partial<Task>; action: "create" | "update" }>
export const Modal = (props: ModalProps) => {
	const onSubmitFunction = props.action === "create"
		? addTask
	    : editTask

	return (
		<Dialog>
			<Form<Task>
				initialValues={props.initialData}
				onSubmit={(values) => {onSubmitFunction(values).then(() => props.close())}}
			>
				{({ handleSubmit }) => (
					<div className={"flex flex-col gap-5 min-w-[600px]"}>
						<Input type="hidden" name="id" />

						<div>
							<Label htmlFor={"name"}>Name</Label>
							<Input type={"text"} name={"name"} required autoFocus />
						</div>

						<div>
							<Label htmlFor={"deadline"}>Deadline</Label>
							<Input type={"date"} name={"deadline"} />
						</div>

						<div>
							<Label htmlFor={"category"}>Category</Label>
							<Select name={"categoryId"} required defaultValue={1}>
								{categories.map((category) => (
									<option value={category.id} key={category.id}>{category.name}</option>
								))}
							</Select>
						</div>

						<div className={"flex self-end pt-10 gap-3"}>
							<Button className={"bg-neutral-100"} type={"button"} onClick={() => props.close()}>Cancel</Button>
							<Button className={"bg-blue-500 text-white"} onClick={handleSubmit}>Confirm</Button>
						</div>
					</div>
				)}
			</Form>
		</Dialog>
	);
};