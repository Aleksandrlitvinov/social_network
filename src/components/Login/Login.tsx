// @ts-ignore
import React from 'react';
import styles from "./Login.module.css"
import errStyles from "../common/FormsControls/FormsControls.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {login, logout} from "../../redux/reducers/auth-reducer.ts";
import {connect} from "react-redux";
import {Input} from "../common/FormsControls/FormsControls.tsx";
import {requiredField} from "../../utils/validators.ts";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type OwnPropsTypes = {
  captchaUrl: string | null
}

const LoginForm: React.FC = (props: InjectedFormProps<LoginFormValuesType> & OwnPropsTypes) => {
  const {handleSubmit, error, captchaUrl} = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formInput}>
        <Field
          component={Input}
          validate={[requiredField]}
          name="email"
          type="text"
          placeholder="E-mail"
        />
      </div>
      <div className={styles.formInput}>
        <Field
          component={Input}
          validate={[requiredField]}
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className={styles.formInput}>
        <Field
          component={Input}
          name="rememberMe"
          type="checkbox"
        />Remember me
      </div>
      {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
      {captchaUrl && <Field
        component={Input}
        validate={[requiredField]}
        name="captcha"
        type="text"
      />}

      {error &&
        <div className={errStyles.formSummaryError}>
          <p>{error}</p>
        </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsTypes>({form: 'login'})(LoginForm)


type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
const Login: React.FC = ({login, isAuth, captchaUrl}: LoginPropsType) => {

  const onSubmit = (formData: any) => {
    const {email, password, rememberMe, captcha} = formData

    login(email, password, rememberMe, captcha)
  }

  if (isAuth) {
    return <Navigate to={"/profile"}/>
  }

  return (
    <div className={styles.formWrapper}>
      <h1>Login</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaUrl={captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }
}
//export default connect(mapStateToProps, {login})(Login);
export default connect(mapStateToProps, {login, logout})(Login)