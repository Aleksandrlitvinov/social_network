import profileReducer, {actions} from "./profile-reducer";

let state = {
  posts: [
    {
      id: 1,
      message: 'Hello, how are you?',
      likesCount: 11,
    },
    {
      id: 2,
      message: 'It is my first post',
      likesCount: 9,
    },
    {
      id: 3,
      message: 'Hello, where are you?',
      likesCount: 1,
    },
    {
      id: 4,
      message: 'It is my first job',
      likesCount: 23,
    }
  ],
  profile: null,
  status: '',
  newPostText: ''
}
// 1. test data
it('length of posts should be incremented', () => {
  let action = actions.addPostActionCreator("I'll be a developer")
  // 2. Action
  let newState = profileReducer(state, action)
  // 3. Expectation
  expect(newState.posts.length).toBe(5)
})

it('message should be correct string', () => {
  let action = actions.addPostActionCreator("I'll be a developer")
  // 2. Action
  let newState = profileReducer(state, action)
  // 3. Expectation
  expect(newState.posts[4].message).toBe("I'll be a developer")
})

it('length of posts should be decrement', () => {
  let action = actions.removePostActionCreator(2)
  // 2. Action
  let newState = profileReducer(state, action)
  // 3. Expectation
  expect(newState.posts.length).toBe(3)
})


