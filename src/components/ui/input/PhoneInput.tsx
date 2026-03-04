import {
	PhoneInput,
	defaultCountries,
} from 'react-international-phone'
import 'react-international-phone/style.css'

export interface IInputComponentProps {
	name?: string
	placeholder?: string
	value?: string
	handleChange?: (value: string) => void
	required?: boolean
}

const PhoneInputComponent = ({
	name = 'phone',
	placeholder = 'Номер',
	value,
	handleChange,
	required = true
}: IInputComponentProps) => {
 
	return (
		<PhoneInput
			defaultCountry='kg'
			countries={defaultCountries}
			name={name}
			value={value}
			required={required}
			onChange={handleChange}
			className="phone-input"
			placeholder={placeholder}
			autoFocus={false}
		/>
	)
}

export default PhoneInputComponent
