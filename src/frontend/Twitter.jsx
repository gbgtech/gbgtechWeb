import React from 'react';

  var Twitter = React.createClass({

      render() {
           return (
            <div><a class="twitter-timeline" href="https://twitter.com/hashtag/gbgtech" data-widget-id="690568248279109633">#gbgtech tweets</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></div>
          );
      }
  });

  export default Twitter;
