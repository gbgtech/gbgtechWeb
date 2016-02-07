import React from 'react';
import moment from 'moment';

import { Link } from 'react-router';


const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

const formatDate = (date) => moment(date).format(DATE_FORMAT);

const NewsPost = ({ post }) => (
    <article className="news-article">
        <h2><Link to={`/news/${post.slug}`}>{post.title}</Link></h2>
        <small>by {post.author && post.author.email} | {moment(post.updatedAt).fromNow()} | {post.categories.map(c => c.name).join(', ')}</small>
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


const GoogleMapsLink = ({ lat, lng, name }) => (
    <a href={`https://www.google.com/maps/preview/@${lat},${lng},13z`} target="_blank">{name}</a>
);

export default NewsPost;