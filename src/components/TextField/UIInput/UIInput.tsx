import React from "react";
import s from "./UIInput.module.scss";
import { text } from "stream/consumers";

type UIInputPropsType = {
	type: "text" | "password";
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
};

export const UIInput: React.FC<UIInputPropsType> = (props) => {
	const { type, disabled, errorMessage, label } = props;
	const [show, setShow] = React.useState<"text" | "password">("password");

	const openClosePssHandler = () =>
		show === "password" ? setShow("text") : setShow("password");

	const _type = type === "text" ? "text" : type === "password" ? show : "text";

	return (
		<div className={s.textFieldWrap}>
			<div className={`${s.label} ${disabled && s.disabledLabel}`}>{label}</div>
			<input
				type={_type}
				disabled={disabled}
				className={`${s.textField} ${errorMessage && s.errorInput} ${
					disabled && s.disabledInput
				}`}
			/>
			{type === "password" &&
				(show === "password" ? (
					<div className={s.iconOpenEye} onClick={openClosePssHandler}></div>
				) : (
					<div className={s.iconCloseEye} onClick={openClosePssHandler}></div>
				))}
			{errorMessage && <div className={s.error}>{errorMessage}</div>}
		</div>
	);
};
