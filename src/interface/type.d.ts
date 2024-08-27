export interface BaseInfoArray {
  label: string
  name: string
  type: string
  placeholder: string
  required: boolean
  value: string
  options?: Array<{
    value: string
    label: string
  }>
}
