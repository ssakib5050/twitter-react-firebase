import React from "react";
import "./Post.css";

import LeftSidebar from "../LeftSidebar/LeftSidebar.js";
import MiddleSidebar from "../MiddleSidebar/MiddleSidebar.js";
import RightSidebar from "../RightSidebar/RightSidebar.js";

import { Link, useParams } from "react-router-dom";

import {
  FontAwesomeIcon,
  faImages,
  faGift,
  faPoll,
  faSmile,
  faChevronDown,
  faComment,
  faRetweet,
  faHeart,
  faHearted,
  faShareSquare,
} from "../../fontawesome";

function Post() {
  let { postid } = useParams();
  return (
    <div className="App">
      <div className="leftSidebar d-md-block d-none">
        <LeftSidebar />
      </div>
      <div className="middleSidebar">
        <MiddleSidebar />

        <div className="middleSidebar__tweet__wrap ">
          <div className="middleSidebar__tweet_top">
            <Link to="/test">
              <div className="middleSidebar__tweet_img_wrap">
                <img
                  src="https://via.placeholder.com/150"
                  alt=""
                  className="middleSidebar__tweeter_img"
                />
              </div>
            </Link>

            <div className="middleSidebar__tweeter_right">
              <div className="middleSidebar__tweeter_header">
                <p className="middleSidebar__tweeter_header_name">Rajib Khan</p>
                <span className="middleSidebar__tweeter_header_timeline">
                  3m
                </span>
              </div>

              <p className="middleSidebar__tweeter_header_timeline_tweet">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aliquid, nisi nam vitae amet repellat recusandae. Quidem iure
                aspernatur accusamus veritatis, iste tempora mollitia sequi
                autem. Officia culpa natus libero iusto suscipit cum architecto,
                accusamus reiciendis, sapiente corrupti ipsum, rerum laudantium
                quos soluta repellat obcaecati eius tempora quia debitis maiores
                maxime.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="rightSidebar  d-xl-block d-none">
        <RightSidebar />
      </div>
    </div>
  );
}

export default Post;
