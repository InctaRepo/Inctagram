import React, {ChangeEvent, useState} from 'react';
import s from './UIInput.module.scss';
import EyeIcon from '@/src/assets/icons/eye-icon';
import EyeOffIcon from '@/src/assets/icons/eye-off-icon';
import SearchIcon from '@/src/assets/icons/search-icon';

type UIInputPropsType = {
	type: 'text' | 'password' | 'search';
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	placeHolder?: string;
	value?: string;
	onChange?: (value: string) => void;
};

export const UIInput: React.FC<UIInputPropsType> = (props) => {
	const { type, disabled, errorMessage, label, placeHolder, onChange, value } =
		props;
	const [showPass, setShowPass] = useState<"text" | "password">("password");

	const openClosePssHandler = () =>
		showPass === "password" ? setShowPass("text") : setShowPass("password");

	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e.currentTarget.value);
	};

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
				value={value}
				onChange={onchangeHandler}
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
