// @ts-ignore
import React from "react"
import styles from "./FormsControls.module.css"
//import {FieldValidatorType, requiredField} from "../../../utils/validators"
import { WrappedFieldProps} from "redux-form"

type FormControlPropsType = {
  input: any
  meta: {
    touched: boolean,
    error: string
  }
  children: React.ReactNode,
}

const FormControl: React.FC = ({input, meta: {touched, error}, children, ...props}: FormControlPropsType) => {

  const hasError = (error && touched)

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
      <div>
        {children}
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: React.FC = (props:WrappedFieldProps) => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}/>
    </FormControl>
  )
}

export const Input:React.FC = (props:WrappedFieldProps) => {
  const {input, meta, ...restProps} = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps}/>
    </FormControl>
  )
}

// export const createField = (component: string | React.Component | React.FC,
//                             validators: Array<FieldValidatorType>,
//                             name: string,
//                             type: string,
//                             placeholder: string,
//                             props = {}) => {
//   return (
//     <Field
//       component={component}
//       validate={[validators]}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//     />
//   )
// }

