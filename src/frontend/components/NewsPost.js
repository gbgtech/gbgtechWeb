import React from 'react';
import { Link } from 'react-router';

import { formatDate } from '../formatter';

const NewsPost = ({ post }) => (
    <article>
        <header>
            <h2><Link to={`/news/${post.slug}`}>{post.title}</Link></h2>
            {post.origin && <ProviderBadge {...post.origin} />}
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

export default NewsPost;
