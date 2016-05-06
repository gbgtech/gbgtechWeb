import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { formatDate, formatDateTime, formatDateHuman, formatTime } from '../formatter';
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
        </header>
        <div className="post-info">
            <small>{renderTimeTag(post.createdAt, formatDateTime)} | {post.categories.map(c => c.name).join(', ')}</small>
            {post.origin && <ProviderBadge {...post.origin} />}
            {userCanEditPost(user, post) && <Link to={`/news/${post.slug}/edit`}>Edit post</Link>}
        </div>
        <div className="article-content" dangerouslySetInnerHTML={{__html: post.body}}></div>
        {post.eventData && <hr/>}
        {post.eventData && <EventsPartial {...post.eventData} />}
    </article>
);

const renderTimeTag = (date, formatter) => date && (
    <time dateTime={date}>{formatter(date)}</time>
);

const EventsPartial = ({ from, to, rsvp, location }) => (
    <div className="event-partial">
        <div className="date-time">
            <div className="row">
                <div className="fance">
                    <i className="fa fa-clock-o" ariaHidden="true"></i>
                </div>
                <div>
                    {renderTimeTag(from, formatDateHuman)}
                    <div className="time-row">{renderTimeTag(from, formatTime)} - {renderTimeTag(to, formatTime)}</div>
                </div>
            </div>
            {rsvp && (<a href={rsvp} className="button">RSVP</a>)}
        </div>
        {location && (<GoogleMapsLink {...location} />)}
    </div>
);

const ProviderBadge = ({ provider, url }) => (
    <a href={url} className={'provider ' + provider} target="_blank" />
);


const GoogleMapsLink = ({ lat, lng, name }) => (
    <a href={`https://www.google.com/maps/preview/@${lat},${lng},13z`} className="google-maps" target="_blank">{name}</a>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NewsPost);
