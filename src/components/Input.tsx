import React, { ComponentProps } from 'react';
import { Field } from "react-final-form";

export const Input = (props: ComponentProps<typeof Field>) => (
	<Field component={"input"} {...props} className={`${props.className} form-input font-body text-sm mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0`} />
);

export const Select = (props: ComponentProps<typeof Field>) => (
	<Field component={"select"} {...props} className={`${props.className} form-select font-body text-sm block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0`} />
);

export const Button = (props: ComponentProps<"button">) => (
	<button {...props} className={`${props.className} py-2 px-3 rounded-md font-body text-sm`}>{props.children}</button>
)

export const Label = (props: ComponentProps<"label">) => (
	<label {...props} className={"font-body text-sm"}>{props.children}</label>
)