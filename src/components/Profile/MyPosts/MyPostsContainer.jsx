import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator
} from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// const MyPostsContainer = (props) => {
//
//   const state = props.store.getState().profilePage
//   const addNewPost = () => props.store.dispatch(addPostActionCreator())
//   const onPostChange = (text) => {
//     let action = updateNewPostTextActionCreator(text)
//     props.store.dispatch(action)
//   }
//
//   return (
//     <MyPosts
//       addNewPost={ addNewPost }
//       updateNewPostText={ onPostChange }
//       posts={ state.posts }
//       newPostText={ state.newPostText }
//     />
//   )
// }

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text)
      dispatch(action)
    },

    addNewPost: () => dispatch(addPostActionCreator()),
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer