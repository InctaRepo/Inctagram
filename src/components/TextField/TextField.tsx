import React from "react";
import { Icon } from "./Icon";
import s from "./TextField.module.scss";
import icon from "./icon.svg";

type TextFieldPropsType = {
	label?: string;
	errorMessage?: string;
	disabled?: true;
};

export const TextField: React.FC<TextFieldPropsType> = (props) => {
	const { disabled, errorMessage, label } = props;

	return (
		<div className={s.textFieldWrap}>
			<div className={s.label}>{label}</div>
			<input
				type="text"
				disabled={disabled}
				placeholder="email.com"
				className={`${s.textField} ${errorMessage && s.errorInput} ${
					disabled && s.disabledInput
				}`}
			/>
			{errorMessage && <div className={s.error}>{errorMessage}</div>}
		</div>
	);
};
