import React, { useEffect, useRef, useState } from "react";
import { deleteTask, getAll, toggleTask } from "~/data/api";
import { Modal } from "~/components";
import { Actions, DataType, modalPrefillType, Task } from "~/data/types";
import { BiCircle, BiPencil, BiPlus, BiSolidCheckCircle, BiTimeFive, BiX } from "react-icons/bi";
import sortTasksByStatusAndDeadline from "~/util/sort";

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
					{data.categories.map((category) => {
						const tasksThisCategory = data.tasks.filter(t => t.categoryId === category.id)

						// TODO turn into CategoryLane component
						const bgClass = `bg-${category.color}-500`
						const textClass = `text-${category.color}-800`
						return (
							<div className={`p-5 ${bgClass} bg-opacity-5 rounded-xl flex grow basis-0 flex-col gap-5`}>
								<div className={`flex justify-between font-title items-center`}>
									<span className={`font-medium text-neutral-800 text-xl`}>{category.name}</span>
									<span className={`p-2 ${bgClass} ${textClass} bg-opacity-5 rounded-md text-xs font-medium`}>{tasksThisCategory.length}</span>
								</div>

								<button
									className={`p-2 flex grow ${bgClass} ${textClass} font-title bg-opacity-5 hover:bg-opacity-10 rounded-md text-xs font-medium justify-center items-center gap-1`}
									onClick={() => actions.add(category.id)}
								>
									<BiPlus />
									New
								</button>

								<div className={"flex flex-col gap-5"}>
									{tasksThisCategory.sort(sortTasksByStatusAndDeadline)
									      .map(task => {
										      // TODO turn into a Task component
										      return (
											      <div className={`bg-white p-5 rounded-md font-body flex flex-col gap-1 shadow-md`}>
												      <div className={"font-medium flex items-center gap-2"}>
													      <div className={"cursor-pointer"} onClick={() => actions.toggle(task)}>
														      {task.done ? <BiSolidCheckCircle /> : <BiCircle />}
													      </div>
													      <div className={"flex justify-between w-full"}>
														      <span className={"font-medium " + (task.done ? "line-through" : "")}>{task.name}</span>
														      <div className={"flex gap-1 items-center"}>
															      <button className={"opacity-50 hover:opacity-100"} onClick={() => actions.edit(task)}><BiPencil/></button>
															      <button className={"opacity-50 hover:opacity-100"} onClick={() => actions.delete(task)}><BiX/></button>
														      </div>
													      </div>
												      </div>
												      {task.deadline &&
													      <div className={"flex items-center gap-1 ml-6 text-xs opacity-75"}>
														      <BiTimeFive />
														      <div>{new Date(task.deadline).toLocaleDateString()}</div>
													      </div>
												      }
											      </div>
										      )
									      })
									}
								</div>
							</div>
						)
					})}
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
