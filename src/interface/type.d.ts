export interface BaseInfoArray {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string | undefined;
  options?: Array<{
    value: string;
    label: string;
  }>;
}
