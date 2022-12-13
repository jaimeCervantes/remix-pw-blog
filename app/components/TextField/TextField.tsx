import { useId, forwardRef } from "react";
import type { ForwardedRef } from "react";
import { XcircleSolidIcon } from "../Icons";
import type { TextFieldProps } from "./TextField.d";

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg dark:text-black";
const errorClassName =
  "pt-1 flex items-center gap-1 text-red-700 dark:text-red-400";

export default forwardRef(TextField);

function TextField(
  {
    isInvalid,
    label,
    required,
    autoFocus,
    name,
    type,
    autoComplete,
    error,
    children,
    ...moreProps
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();
  const ariaId = `${id}-${name}`;

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={id}
        required={required}
        autoFocus={autoFocus}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={isInvalid}
        aria-describedby={ariaId}
        className={inputClassName}
        {...moreProps}
      />
      {error && (
        <div className={errorClassName} id={ariaId}>
          <XcircleSolidIcon />
          {error}
        </div>
      )}

      {children}
    </div>
  );
}
