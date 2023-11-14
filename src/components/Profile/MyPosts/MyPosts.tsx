import * as React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, requiredField} from '../../../utils/validators.ts';
import {Textarea} from '../../common/FormsControls/FormsControls.tsx';
import {PostType} from "../../../redux/reducers/profile-reducer.ts";

const maxLengthValue10 = maxLengthCreator(10)

export type MapPropsType = {
  posts: PostType[]
}

export type MapDispatchPropsType = {
  addNewPost: (newPostText: string) => void
}

type PropsType = MapPropsType & MapDispatchPropsType

const MyPostForm: React.FC<InjectedFormProps<AddPostFormValuesType & PropsType> & PropsType> = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          placeholder="Enter your new post"
          validate={[requiredField, maxLengthValue10]}
        />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const MyPostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({form: "profileAddNewPost"})(MyPostForm)

type AddPostFormValuesType = {
  newPostText: string
}

type MyPostsPropsType = {
  posts: PostType[]
  addNewPost: (newPostText: string) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {

  const posts = props.posts
  const onSubmit = (values: AddPostFormValuesType) => {
    props.addNewPost(values.newPostText)
  }
  return (
    <div className={styles.posts}>
      <h3 className={styles.title}>My posts</h3>
      <div>
        <div>
          <MyPostReduxForm onSubmit={onSubmit}/>
        </div>
        <div className={styles.postItems}>
          {
            posts.map(post => <Post
                message={post.message}
                likes={post.likesCount}
                key={post.id}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MyPosts