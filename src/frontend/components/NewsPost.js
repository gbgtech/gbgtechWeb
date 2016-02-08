import React from 'react';
import moment from 'moment';

import { Link } from 'react-router';

import { formatDate } from '../formatter';

const NewsPost = ({ post }) => (
    <article className="news-article">
        <header>
            {post.origin && <ProviderBadge {...post.origin} />}
            <h2><Link to={`/news/${post.slug}`}>{post.title}</Link></h2>
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

const providers = {
    meetup: 'http://img1.meetupstatic.com/img/94156887029318281691566697/logo.svg'
};

const ProviderBadge = ({ provider, url }) => (
    <a href={url}><img src={providers[provider]}/></a>
);


const GoogleMapsLink = ({ lat, lng, name }) => (
    <a href={`https://www.google.com/maps/preview/@${lat},${lng},13z`} target="_blank">{name}</a>
);

export default NewsPost;