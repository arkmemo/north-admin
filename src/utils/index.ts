export const RadioFilter = (value: string | number | null, option: object[], key = 'label', valueKey = 'value') => {
	const temp = option.find((item) => item[valueKey as keyof typeof item] == value)

	return (temp && temp[key as keyof typeof temp]) || value
}
