import React, {ComponentProps} from 'react';
import {UIInput} from './UIInput/UIInput';

export type TextFieldPropsType = {
	type?: 'text' | 'password' | 'search';
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	width?: number;
	placeHolder?: string;
	value?: string;
	onChange?: (value: string) => void;
	className?: string
} & ComponentProps<'input'>

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
