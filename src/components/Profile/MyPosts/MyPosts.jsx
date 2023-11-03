import React from "react";
import Post from "./Post/Post";
import styles from "./MyPosts.module.css"

const MyPosts = (props) => {

  const posts = props.posts
  let newPostText = props.newPostText

  const newPostTextRef = React.useRef(null)
  const onAddNewPost = () => props.addNewPost()

  const onPostChange = () => {
    let text = newPostTextRef.current.value
    props.updateNewPostText(text)
  }

  return (
    <div className={ styles.posts }>
      <h3 className={ styles.title }>My posts</h3>
      <div>
        <textarea
          ref={ newPostTextRef }
          value={ newPostText }
          onChange={ onPostChange }
        />
      </div>
      <div>
        <button onClick={ onAddNewPost }>Add Post</button>
      </div>
      <div className={ styles.postItems }>
        {
          posts.map(post => <Post
              message={ post.message }
              likes={ post.likesCount }
              key={ post.id }
            />
          )
        }
      </div>
    </div>
  )
}

export default MyPosts