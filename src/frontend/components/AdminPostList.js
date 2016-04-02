import React from 'react';

const AdminPostList = ({ posts, setAccepted, setDenied, reset, edit, goto }) => (
  <div className="admin-post-list" >
    {posts.map(post => (
      <div className="admin-post-list-item">
        <div className={"dot " + post.accepted.toLowerCase()}  />
        { post.title }
        { post.accepted !== 'APPROVED' && <button onClick={() => setAccepted(post.slug)}>Accept</button> }
        { post.accepted !== 'DENIED' && <button onClick={() => setDenied(post.slug)}>Deny</button> }
        { post.accepted !== 'WAITING' && <button onClick={() => reset(post.slug)}>Reset</button> }
        <button onClick={() => edit(post.slug)}>Edit</button>
        <button onClick={() => goto(post.slug)}>View</button>
      </div>
    ))}
  </div>
);

export default AdminPostList;
