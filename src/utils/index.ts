export const RadioFilter = (value: string | number | null, option: object[], key = 'label', valueKey = 'value') => {
	const temp = option.find((item) => item[valueKey as keyof typeof item] === value)

	return (temp && temp[key as keyof typeof temp]) || value
}
export function hasOwnProperty<T, K extends PropertyKey>(obj: T, prop: K): obj is T & Record<K, unknown> {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}
