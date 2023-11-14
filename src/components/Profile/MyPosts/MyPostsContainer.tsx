import {actions} from "../../../redux/reducers/profile-reducer.ts";
import MyPosts, {MapDispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store.ts";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (newPostText: string) => dispatch(actions.addPostActionCreator(newPostText)),
  }
}

const MyPostsContainer = connect<MapPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
  mapDispatchToProps)(MyPosts)

export default MyPostsContainer