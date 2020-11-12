import React from "react";
import "./RightSidebar.css";

import { FontAwesomeIcon, faSearch } from "../../fontawesome";

function RightSidebar() {
  return (
    <div className="RightSidebar">
      <div className="rightSidebar__search_wrap">
        <FontAwesomeIcon
          icon={faSearch}
          className="rightSidebar__search_icon"
        />
        <input
          type="text"
          className="rightSidebar__search_input"
          placeholder="Search Twitter"
        />
      </div>

      <div className="rightSidebar__trending">
        <h4 className="font-weight-bold p-2">What's happening</h4>
        <TrendingItem name="Hashtag1" count="1.3m" />
        <TrendingItem name="Hashtag2" count="500k" />
        <TrendingItem name="Hashtag3" count="2.1m" />
        <TrendingItem name="Hashtag4" count="5.9m" />
        <TrendingItem name="Hashtag5" count="300k" />
        <button className="rightSidebar__trending_button  p-2">See More</button>
      </div>

      <div className="rightSidebar__trending">
        <h4 className="font-weight-bold  p-2">Who to follow</h4>
        <WhoItem name="Person 1" image="https://via.placeholder.com/150" />
        <WhoItem name="Person 2" image="https://via.placeholder.com/150" />
        <WhoItem name="Person 3" image="https://via.placeholder.com/150" />
        <WhoItem name="Person 4" image="https://via.placeholder.com/150" />
        <WhoItem name="Person 5" image="https://via.placeholder.com/150" />
        <button className="rightSidebar__trending_button p-2">See More</button>
      </div>

      <div className="rightSidebar__last_buttons">
        <button>Terms of Service</button>
        <button>Privacy Policy</button>
        <button>Cookie Policy</button>
        <button>Ads info</button>
        <button>More</button>
        <button>© 2020 Twitter, Inc.</button>
      </div>
    </div>
  );
}

function TrendingItem({ name, count }) {
  return (
    <div className="rightSidebar__trending_item_wrap p-1">
      <p className="rightSidebar__trending_item_tag">#{name}</p>
      <p className="rightSidebar__trending_item_tag_count">{count}</p>
    </div>
  );
}
function WhoItem({ name, image }) {
  return (
    <div className="rightSidebar__trending_item_wrap rightSidebar__who_item_wrap  p-2">
      <img src={image} alt="" className="rightSidear__trending_item_img" />
      <p className="rightSidebar__trending_item_tag rightSidebar__who_item_name">
        {name}
      </p>
      <button className="rightSidebar__who_item_button">Follow</button>
    </div>
  );
}

export default RightSidebar;
