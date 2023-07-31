import React from "react";
import s from "./UIInput.module.scss";
import EyeIcon from "../../../../assets/icons/eye-icon";
import EyeOffIcon from "../../../../assets/icons/eye-off-icon";
import SearchIcon from "../../../../assets/icons/search-icon";

type UIInputPropsType = {
	type: "text" | "password" | "search";
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	placeHolder?: string;
};

export const UIInput: React.FC<UIInputPropsType> = (props) => {
	const { type, disabled, errorMessage, label, placeHolder } = props;
	const [showPass, setShowPass] = React.useState<"text" | "password">(
		"password"
	);

	const openClosePssHandler = () =>
		showPass === "password" ? setShowPass("text") : setShowPass("password");

	const _type =
		type === "text"
			? "text"
			: type === "password"
			? showPass
			: type === "search"
			? "search"
			: "text";

	return (
		<div className={s.textFieldWrap}>
			<div className={`${s.label} ${disabled && s.disabledLabel}`}>{label}</div>
			<input
				type={_type}
				placeholder={placeHolder && placeHolder}
				disabled={disabled}
				className={`${s.textField} ${errorMessage && s.errorInput} ${
					disabled && s.disabledInput
				}`}
			/>
			{type === "password" &&
				(showPass === "password" ? (
					<EyeIcon
						className={`${s.iconOpenEye} ${disabled && s.disabledIconEye}`}
						onClick={openClosePssHandler}
					/>
				) : (
					<EyeOffIcon
						className={`${s.iconCloseEye} ${disabled && s.disabledIconEye}`}
						onClick={openClosePssHandler}
					/>
				))}

			{type === "search" && <SearchIcon className={s.searchIcon} />}
			{errorMessage && <div className={s.error}>{errorMessage}</div>}
		</div>
	);
};
