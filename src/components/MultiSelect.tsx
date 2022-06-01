import { FieldProps } from "formik"
import React from "react"
import Select, { Options, MultiValue } from "react-select"

interface Option {
	label: string
	value: string
}

interface MultiSelectProps extends FieldProps {
	options: Options<Option>
	placeholder?: string
}

export const MultiSelect = ({
	placeholder,
	field,
	form,
	options,
}: MultiSelectProps) => {
	const onChange = (option: MultiValue<Option>) => {
		form.setFieldValue(
			field.name,
			(option as Option[]).map((item: Option) => item.value)
		)
	}

	const getValue = () => {
		return options
			? options.filter(
					(option: Option) => field.value.indexOf(option.value) >= 0
			  )
			: []
	}

	return (
		<Select
			className="multi-select"
			classNamePrefix="multi-select"
			name={field.name}
			value={getValue()}
			onChange={onChange}
			placeholder={placeholder}
			options={options}
			isMulti={true}
		/>
	)
}

export default MultiSelect
