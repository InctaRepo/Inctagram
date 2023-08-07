import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { UIInput } from "./UIInput/UIInput";
import s from "./textField.module.scss";

type DefaultInputPropsType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export type TextFieldPropsType = Omit<DefaultInputPropsType, ""> & {
	label?: string;
	errorMessage?: string;
	fullWidth?: boolean;
	className?: string;
	onChangeText?: (value: string) => void;
};

export const TextField: React.FC<TextFieldPropsType> = ({
	width,
	className,
	fullWidth,
	...restProps
}) => {
	return (
		<div className={`${className} ${fullWidth ? s.fullWidth : ""}`}>
			<UIInput {...restProps} />
		</div>
	);
};
