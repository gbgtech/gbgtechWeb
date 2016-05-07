import { get } from '../fetcher';

export const SET_SIGNED_IN = 'SET_SIGNED_IN';
export const SET_SIGNED_OUT = 'SET_SIGNED_OUT';

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERROR = 'RECEIVE_POST_ERROR';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR';

export const setSignedIn = (user) => ({
  type: SET_SIGNED_IN,
  user
});

export const setSignedOut = () => {
  get('/auth/signout');
  return ({
    type: SET_SIGNED_OUT
  });
};

export const requestPosts = () => {
  return dispatch => {
    get('/posts')
      .then(posts => dispatch(receivePosts(posts)))
      .catch(error => dispatch(receivePostsError(error)))
  }
};

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePostsError = (error) => ({
  type: RECEIVE_POSTS_ERROR,
  error
});

export const requestPost = (id) => {
  return dispatch => {
    get(`/posts/${id}`)
      .then(post => dispatch(receivePost(post)))
      .catch(error => dispatch(receivePostError(error)))
  }
};

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

export const receivePostError = (error) => ({
  type: RECEIVE_POST_ERROR,
  error
});