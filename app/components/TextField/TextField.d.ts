export type TextFieldProps = {
  isInvalid?: true | false;
  label?: string;
  required?: true | false;
  autoFocus?: true | false;
  name: string;
  type: string;
  autoComplete?: string; 
  error?: string | null | undefined;
  children?: JSX.Element
}