import * as React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {requiredField} from "../../../utils/validators.ts";
import errStyles from "../../common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../redux/reducers/profile-reducer.ts";

type PropsType = {
  profile: ProfileType
}
const UpdateProfileForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
                                                                                              handleSubmit,
                                                                                              profile,
                                                                                              error
                                                                                            }) => {
  return (

    <form onSubmit={handleSubmit}>
      <div>
        {error &&
          <div className={errStyles.formSummaryError}>
            <p>{error}</p>
          </div>
        }
        <button>Save</button>
      </div>
      <div>
        <Field
          name="fullName"
          placeholder="full name"
          component="input"
        />
      </div>
      <div>
        <Field
          name="lookingForAJob"
          component="input"
          type="checkbox"
        /> lookingForAJob
      </div>
      <div>
        <Field
          name="lookingForAJobDescription"
          placeholder="My skills"
          component="textarea"
        />
      </div>
      <div>
        <Field
          name="aboutMe"
          placeholder="About Me"
          component="textarea"
        />
      </div>
      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <ContactInput
          name={key}
          placeholder={key}
          //validate={[requiredField]}
          key={key}/>

      })}
      </div>
    </form>
  );
};

type ContactInputPropsType = {
  name: string,
  placeholder: string
}
const ContactInput: React.FC<ContactInputPropsType> = ({name}) => {
  return <Field name={"contacts." + name} placeholder={name} component="input"/>
}

const UpdateProfileReduxForm = reduxForm<ProfileType, PropsType>({form: "edit-profile"})(UpdateProfileForm)
export default UpdateProfileReduxForm
