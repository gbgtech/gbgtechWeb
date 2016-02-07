import React from 'react';

import RegistrationBox from './RegistrationBox'

const Hello = React.createClass({
    render() {
        return (
            <section>
                <RegistrationBox />
                <h1>Hello </h1>
                <h2>What is #gbgtech?</h2>
                <p>
                    #gbgtech is Gothenburg's Tech and Startup Community. The community exist to position Gothenburg as an attractive tech- and startup-commuity in Scandinavia by promoting communication and interaction. No one is in charge of the community, it is built by the organizations and persons that are a part of it.
                </p>


                <h2>So who is a part of #gbgtech?</h2>
                <p>
                    Everyone who consider themselves to within tech, startup, or tech and startup, but also you who are curious about the community or believe in empowering it.
                    You don't have to join, you are already a part of it!
                </p>

                <h2>What is #gbgtechWeek?</h2>
                <p>
                    It is a week filled of events within the tech and startup community. It aims to put light on the tech and startup scene in Gothenburg by hosting diverse, inspiring non-profit events during one week. The organisations behind the events collaborate in order to show other parts of the scene to their own audience. Scroll down to see images from #gbgtechWeek 2015!
                </p>


                <h2>Will there be a #gbgtechWeek 2016?</h2>
                <p>
                    Of course! 2015 was good, 2016 is going to be even better! Between the 9th and 15th of May Gothenburg will focus on startups, the tech scene and entrepreneurs! There will be hackathons, networking opportunities, lectures and workshops during one week, everything for free! Can it get any better? Spread the word with #gbgtech on Twitter!
                </p>

            </section>
        );
    }
});



export default Hello;
