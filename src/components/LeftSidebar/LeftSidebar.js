import React, { useState } from "react";
import "./LeftSidebar.css";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  FontAwesomeIcon,
  faTwitter,
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faListAlt,
  faUser,
  faEllipsisH,
  faChevronDown,
} from "../../fontawesome";

function LeftSidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="LeftSidebar">
      <div className="leftSidebar_wrap">
        <div className="leftSidebar__brand_wrap">
          <FontAwesomeIcon icon={faTwitter} className="leftSidebar__brand" />
        </div>

        <div className="leftSidebar__tools">
          <LeftSidebarTool icon={faHome} name="Home" />
          <LeftSidebarTool icon={faHashtag} name="Explore" />
          <LeftSidebarTool icon={faBell} name="Notifications" />
          <LeftSidebarTool icon={faEnvelope} name="Messages" />
          <LeftSidebarTool icon={faBookmark} name="Bookmarks" />
          <LeftSidebarTool icon={faListAlt} name="Lists" />
          <LeftSidebarTool icon={faUser} name="Profile" />
          <LeftSidebarTool icon={faEllipsisH} name="More" />

          <button className="leftSidebar__tweet btn btn-block btn-primary my-3">
            Tweet
          </button>
        </div>

        <div className="leftSidebar__footer">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              caret
              className="leftSidebar__footer_dropdown_button_toggle"
            >
              <div className="leftSidebar__footer_wrap">
                <img
                  src="https://via.placeholder.com/150"
                  alt=""
                  className="leftSidebar__img"
                />
                <span className="font-weight-bold leftSidebar__footer_text">
                  Rajib Khan
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="leftSidebar__footer_icon"
                />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

function LeftSidebarTool({ icon, name }) {
  return (
    <div className="leftSidebar__tool_wrap">
      <div className="leftSidebar__tool">
        <div className="leftSidebar__tool_icon_wrap">
          <FontAwesomeIcon icon={icon} className="leftSidebar__tool_icon" />
        </div>

        <span className="leftSidebar__tool_name">{name}</span>
      </div>
    </div>
  );
}

export default LeftSidebar;
