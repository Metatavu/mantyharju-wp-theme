import React from 'react';

/**
 * A component for readspeaker "listen" button
 */
class ReadSpeaker extends React.Component {

  /**
   * Component render
   */
  render(){
    return (
      <div id="readspeaker_button1" className="rs_skip rsbtn rs_preserve">
        <a rel="nofollow" className="rsbtn_play" accessKey="L" title="Kuuntele ReadSpeaker webReaderilla" href={"//app-eu.readspeaker.com/cgi-bin/rsent?customerid=11747&amp;lang=fi_fi&amp;readid=readthis&amp;url="+encodeURIComponent(window.location.href)}>
          <span className="rsbtn_left rsimg rspart"><span className="rsbtn_text"><span>Kuuntele</span></span></span>
          <span className="rsbtn_right rsimg rsplay rspart"></span>
        </a>
      </div>
    );
  }
}

export default ReadSpeaker;
