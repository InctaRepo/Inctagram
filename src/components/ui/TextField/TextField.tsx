import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {UIInput} from './UIInput/UIInput';

type DefaultInputPropsType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export type TextFieldPropsType = Omit<DefaultInputPropsType, ''> & {
	label?: string;
	errorMessage?: string;
	width?: string;
	onChangeText?: (value: string) => void;
};

export const TextField: React.FC<TextFieldPropsType> = ({
	width,
	...restProps
}) => {
	return (
		<div style={{ width: width ? width : "100%" }}>
			<UIInput {...restProps} />
		</div>
	);
};
