export interface FormBtn {
  title: string;
  onPress?: () => void;
  isSubmit?: boolean;
  disabled?: boolean;
  style?: any;
}
export type Concern = {
  id: string;
  label: string;
};
export interface FormData {
  selectedConcerns?: Concern[];
  priorityConcerns?: Concern[];
  [key: string]: any;
}
export interface FormInputs {
  [key: string]: any;
}
export type FormBtnConfig = {
  [stage: number]: FormBtn[];
};