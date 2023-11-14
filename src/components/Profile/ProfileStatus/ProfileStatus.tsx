import * as React from 'react';
import styles from './ProfileSatus.module.css'


type PropsType = {
  userId: number | null
  status: string
  updateProfileStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

  const [editMode, setEditMode] = React.useState(false)
  const [status, setStatus] = React.useState(props.status)

  const activatedEditMode = () => setEditMode(true)
  const deactivatedEditMode = () => {
    setEditMode(false)
    props.updateProfileStatus(status)
  }
  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

  React.useEffect(() => {

    setStatus(props.status)

  }, [props.status])


  return (
    <div>
      {
        !editMode &&
        <div className={styles.userStatus}>
          <span onDoubleClick={activatedEditMode}>
            {props.status}
          </span>
        </div>
      }
      {
        editMode &&
        <div>
          <input
            type="text"
            value={status}
            onChange={onStatusChange}
            onBlur={deactivatedEditMode}
            autoFocus={true}
          />
        </div>
      }
    </div>
  );
};

export default ProfileStatus;
