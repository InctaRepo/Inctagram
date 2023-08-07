import {FieldValues, useController, UseControllerProps} from 'react-hook-form'
import {TextField, TextFieldPropsType} from '@/src/components/ui/TextField/TextField';


type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
	Omit<TextFieldPropsType, 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
																														 control,
																														 name,
																														 ...rest
																													 }: Props<T>
) => {

	const {
		fieldState: {error},
		field: {ref, ...fieldProps},
	} = useController({
		name,
		control
	})
	return <TextField {...fieldProps} errorMessage={error?.message} {...rest}/>
}
