import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import Clock from "./Clock";

import {formatDateTime, formatDateHuman, formatTime } from '../formatter';
import { roles } from '../roles';

const userCanEditPost = (user, post) => {
  if (!user) { return false; }
  return (user._id === post.author._id) || user.role >= roles.admin;
};


const NewsPost =React.createClass({
  getInitialState() {
    return {
      toLong: false
    };
  },
  componentDidMount() {
    if(!this.props.showFull){
      let innerHTMLDomNode=ReactDOM.findDOMNode(this.innerHTML);
      let testSize=()=>{
        if(innerHTMLDomNode.offsetHeight>=1000){
          this.setState({toLong:true});
        }
      };
      var divs=innerHTMLDomNode.querySelectorAll('img');
      [...divs].forEach((div)=> {
        div.onload = ()=>{
          div.onload=null;
          testSize();
        };
      });
      testSize();
    }
  },
  render(){
    const { post,user } = this.props;
    const { toLong } = this.state;


    return(
      <article className="paper-shadow">
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
        <div className="article-content" ref={(elm)=>this.innerHTML=elm} dangerouslySetInnerHTML={{__html: post.body}} style={ {maxHeight: toLong && "1000px"}}></div>
        {toLong && (<Link to={`/news/${post.slug}`} className="toLong button">read more</Link>)}
        {post.eventData && <hr/>}
        {post.eventData && <EventsPartial {...post.eventData} />}
      </article>
    );
  }
});

export const renderTimeTag = (date, formatter, className = null) => date && (
  <time dateTime={date} className={className}>{formatter(date)}</time>
);

const EventsPartial = ({ from, to, rsvp, location }) => (
  <div className="event-partial">
    <div className="date-time">
      <div className="row">
        <div className="fance">
          <Clock time={moment(from).toDate()}/>
        </div>
        <div className="info">
          {renderTimeTag(from, formatDateHuman, 'time-day')}
          <div className="time-row">{renderTimeTag(from, formatTime)} - {renderTimeTag(to, formatTime)}</div>
        </div>
      </div>
      {rsvp && (<a href={rsvp} className="button">RSVP</a>)}
    </div>
    {location && (<div className="google-maps">
      {(<GoogleMapsLink {...location} />)}
    </div>)}
  </div>
);

const ProviderBadge = ({ provider, url }) => (
  <a href={url} className={'provider ' + provider} target="_blank" />
);


const GoogleMapsLink = ({ lat, lng, name }) => (
  <a href={`https://www.google.com/maps/preview/@${lat},${lng},13z`} target="_blank">{name}</a>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NewsPost);
