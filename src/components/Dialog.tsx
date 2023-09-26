import React, { ComponentProps } from 'react';

export const Dialog = (props: ComponentProps<"dialog">) => (
	<dialog open {...props} className={"fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center"}>
		<div className={"bg-white p-10 rounded-md"}>
			{props.children}
		</div>
	</dialog>
);