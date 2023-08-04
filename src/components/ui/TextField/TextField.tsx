import React from "react";
import { UIInput } from "./UIInput/UIInput";

type TextFieldPropsType = {
	type: "text" | "password" | "search";
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	width?: number;
	placeHolder?: string;
	value?: string;
	onChange?: (value: string) => void;
};

export const TextField: React.FC<TextFieldPropsType> = ({
	width,
	...restProps
}) => {
	return (
		<div style={{ width: width ? width : "279px" }}>
			<UIInput {...restProps} />
		</div>
	);
};
