import { UIInput } from "./UIInput/UIInput";

type TextFieldPropsType = {
	type: "text" | "password" | "search";
	label?: string;
	errorMessage?: string;
	disabled?: boolean;
	width?: number;
	placeHolder?: string;
};

export const TextField: React.FC<TextFieldPropsType> = (props) => {
	const { type, disabled, errorMessage, label, width, placeHolder } = props;
	return (
		<div style={{ width: width ? width : "279px" }}>
			<UIInput
				type={type}
				disabled={disabled}
				errorMessage={errorMessage}
				label={label}
				placeHolder={placeHolder}
			/>
		</div>
	);
};
