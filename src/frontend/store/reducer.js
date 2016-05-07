import {
  SET_SIGNED_OUT,
  SET_SIGNED_IN,
  RECEIVE_POST,
  RECEIVE_POST_ERROR,
  RECEIVE_POSTS,
  RECEIVE_POSTS_ERROR
} from './actions';

const initialState = {
  signedIn: false,
  user: null,
  postsOrder: [],
  posts: {}
};

const reducePosts = (state, posts) => posts.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, state)

const appReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SIGNED_IN:
    return {
      ...state,
      signedIn: true,
      user: action.user
    };

  case SET_SIGNED_OUT:
    return initialState;
  case RECEIVE_POST:
    return {
      ...state,
      posts: reducePosts(state.posts, [action.post])
    }
  case RECEIVE_POSTS:
    const postsOrder = action.posts.map(p => p.slug)
    return {
      ...state,
      postsOrder,
      posts: reducePosts(state.posts, action.posts)
    }

  default:
    return state;
  }
};

export default appReducer;
