import { useEffect, useRef, useState } from "react";
import { deleteTask, getAll, toggleTask } from "~/data/api";
import { Modal, CategoryLane } from "~/components";
import { Actions, DataType, modalPrefillType, Task } from "~/data/types";

const Home = () => {
	//#region Data processing
	const [data, setData] = useState<DataType>()
	const [modalOpen, setModalOpen] = useState(false)
	const modalPrefill = useRef<modalPrefillType>({});
	const refresh = () => getAll().then((res) => { setData(res.data) })

	useEffect(() => { refresh() }, []);

	const actions: Actions = {
		add: (categoryId: Task["categoryId"]) => {
			modalPrefill.current = {
				data: { categoryId, done: false },
				action: "create"
			}
			setModalOpen(true)
		},

		edit: (task: Task) => {
			modalPrefill.current = {
				data: task,
				action: "update"
			}

			setModalOpen(true)
		},

		delete: (task: Task) => deleteTask(task).then(() => refresh()),

		toggle: (task: Task) => toggleTask(task).then(() => refresh())
	}

	if (typeof data === "undefined") return null
	//#endregion

	return (
		<div>
			<div className="p-20 pb-0 flex flex-col gap-20">
				<div className={`text-neutral-800 font-semibold text-4xl font-title`}>Tasks</div>

				<div className="flex gap-10 items-start">
					{
						// TODO For each category:
						// filter the tasks that belong to the given category
						// render the category using the CategoryLane component
					}
				</div>
			</div>

			{modalOpen
				? <Modal
					close={() => {setModalOpen(false); refresh()}}
					initialData={modalPrefill.current.data}
					action={modalPrefill.current.action}
				/>
				: null
			}
		</div>
	);
}

export default Home
