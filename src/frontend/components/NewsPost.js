import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { formatDate } from '../formatter';
import { roles } from '../roles';

const userCanEditPost = (user, post) => {
  if (!user) { return false; }
  return (user._id === post.author._id) || user.role >= roles.admin;
};

const NewsPost = ({ post, user }) => (
    <article>
        <header>
            {post.accepted === 'WAITING' && <div>POST UNDER REVIEW (NOT PUBLISHED YET)</div>}
            {post.accepted === 'DENIED' && <div>POST DENIED (NOT PUBLISHED)</div>}
            <h2><Link to={`/news/${post.slug}`}>{post.title}</Link></h2>
            {post.origin && <ProviderBadge {...post.origin} />}
            {userCanEditPost(user, post) && <Link to={`/news/${post.slug}/edit`}>Edit post</Link>}
        </header>
        <small>by {post.author && post.author.email} | {post.createdAt} | {post.categories.map(c => c.name).join(', ')}</small>
        <p dangerouslySetInnerHTML={{__html: post.body}}></p>
        {post.eventData && <EventsPartial {...post.eventData} />}
    </article>
);

const EventsPartial = ({ from, to, rsvp, location }) => (
    <div className="event-partial">
        <span>{from && formatDate(from)} {to && formatDate(to)}</span>
        {rsvp && (<a href={rsvp} className="button">RSVP!</a>)}
        {location && (<GoogleMapsLink {...location} />)}
    </div>
);

const ProviderBadge = ({ provider, url }) => (
    <a href={url} className={'provider ' + provider}></a>
);


const GoogleMapsLink = ({ lat, lng, name }) => (
    <a href={`https://www.google.com/maps/preview/@${lat},${lng},13z`} target="_blank">{name}</a>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NewsPost);
