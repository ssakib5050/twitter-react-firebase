import React, { useState, useEffect } from "react";
import "./MiddleSidebar.css";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";
import "moment-timezone";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import TextareaAutosize from "react-textarea-autosize";
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

import { db, storage, auth } from "../../firebase";

import { Link } from "react-router-dom";

function MiddleSidebar(globalData) {
  const [tweetInput, setTweetInput] = useState("");
  const [tweetInputImage, setTweetInputImage] = useState(null);
  const [tweetProcess, setTweetProcess] = useState(false);
  const [tweets, setTweets] = useState([]);

  // console.log("globalData", globalData);

  useEffect(() => {
    db.collection("tweets")
      // .orderBy("postTimestamp", "desc")
      .onSnapshot((snapshot) =>
        setTweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  // console.log(globalData.data[0].photoURL);
  // console.log(tweets);

  const tweetHandle = () => {
    if (tweetInput) {
      if (tweetInputImage) {
        // Image found
        setTweetProcess(true);

        const file = tweetInputImage;
        const uploadTask = storage
          .ref()

          .child(`images/${uuidv4()}.${tweetInputImage.name}`)
          .put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // setSetupError("Sorry Something Went Wrong");
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
              db.collection("tweets")
                .add({
                  tweetInput: tweetInput,
                  tweetInputImage: downloadUrl,
                  tweetUsername: globalData.data[0].displayName,
                  tweetPhotoURL: globalData.data[0].photoURL,
                  tweetLikes: [],
                  tweetTimestamp: Date.now(),
                })
                .then(() => {
                  // console.log("Added");
                  setTweetProcess(false);
                  setTweetInput("");
                  setTweetInputImage(null);
                });
            });
          }
        );
      } else {
        // Image not found

        setTweetProcess(true);
        db.collection("tweets")
          .add({
            tweetInput: tweetInput,
            tweetInputImage: null,
            tweetUsername: globalData.data[0].displayName,
            tweetPhotoURL: globalData.data[0].photoURL,
            tweetLikes: [],
            tweetTimestamp: Date.now(),
          })
          .then(() => {
            setTweetInput("");
            setTweetProcess(false);
          });
      }
    }
  };
  return (
    <div className="MiddleSidebar">
      <div className="middleSidebar_tweet_input_wrap ">
        <div className="middleSidebar_tweet_input_wrap_container">
          <div className="middleSidebar__tweet_img_wrap">
            <img
              src={globalData.data && globalData.data[0].photoURL}
              alt=""
              className="middleSidebar__tweet_img"
            />
          </div>
          <TextareaAutosize
            className="middleSidebar__textarea"
            placeholder="What's happening?"
            onChange={(e) => setTweetInput(e.target.value)}
            value={tweetInput}
          />
        </div>
        {tweetInputImage && (
          <div className="middleSidebar__tweeting_img_wrap">
            <p
              className="middleSidebar__tweeting_cross"
              onClick={() => setTweetInputImage("")}
            >
              X
            </p>
            <img
              src={window.URL.createObjectURL(tweetInputImage)}
              alt=""
              className="middleSidebar__tweeting_img"
            />
          </div>
        )}

        <div className="middleSidebar__tool_wrap mt-4">
          <div className="middleSidebar__tool_wrap_left">
            <input
              type="file"
              id="tweeter__photo_upload"
              onChange={(e) => setTweetInputImage(e.target.files[0])}
            />
            <label
              className="middleSidebar__tool_wrap_left_icon_wrap"
              htmlFor="tweeter__photo_upload"
            >
              <FontAwesomeIcon
                icon={faImages}
                className="middleSidebar__tool_wrap_left_icon"
              />
            </label>
            <label className="middleSidebar__tool_wrap_left_icon_wrap">
              <FontAwesomeIcon
                icon={faGift}
                className="middleSidebar__tool_wrap_left_icon"
              />
            </label>
            <label className="middleSidebar__tool_wrap_left_icon_wrap">
              <FontAwesomeIcon
                icon={faPoll}
                className="middleSidebar__tool_wrap_left_icon"
              />
            </label>
            <label className="middleSidebar__tool_wrap_left_icon_wrap">
              <FontAwesomeIcon
                icon={faSmile}
                className="middleSidebar__tool_wrap_left_icon"
              />
            </label>
            <label className="middleSidebar__tool_wrap_left_icon_wrap">
              <FontAwesomeIcon
                icon={faGift}
                className="middleSidebar__tool_wrap_left_icon"
              />
            </label>
          </div>
          <div className="middleSidebar__tool_wrap_right">
            <button
              className={`middleSidebar__tool_wrap_right_tweet`}
              onClick={tweetHandle}
              disabled={tweetProcess}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>

      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          tweetInput={tweet.tweetInput}
          tweetInputImage={tweet.tweetInputImage}
          tweetPhotoURL={tweet.tweetPhotoURL}
          tweetUsername={tweet.tweetUsername}
          tweetTimestamp={tweet.tweetTimestamp}
          tweetLikes={tweet.tweetLikes}
          globalData={globalData}
        />
      ))}
    </div>
  );
}

function Tweet(tweet) {
  const [retweetInput, setRetweetInput] = useState("");
  const [retweetImage, setRetweetimage] = useState(null);

  console.log(tweet.tweetInputImage);

  // useEffect(() => {
  //   setTweetLiked(
  //     tweet.tweetLikes.find((data) => data == tweet.globalData.data[0].email)
  //   );
  // }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false); //default false

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const modalToggle = () => setModal(!modal);

  // console.log(tweet.globalData.data[0].email);

  const tweetLikeHandle = () => {
    const tweetEmail = tweet.globalData.data[0].email;

    if (tweet.tweetLikes.find((tweetLike) => tweetLike === tweetEmail)) {
      db.collection("tweets")
        .doc(tweet.tweetId)
        .set(
          {
            tweetLikes: tweet.tweetLikes.filter(
              (tweetLike) => tweetLike !== tweetEmail
            ),
          },
          { merge: true }
        );
    } else {
      db.collection("tweets")
        .doc(tweet.tweetId)
        .set(
          {
            tweetLikes: [...tweet.tweetLikes, tweetEmail],
          },
          { merge: true }
        );
    }
  };
  return (
    <div className="middleSidebar__tweet__wrap ">
      <Modal isOpen={modal} toggle={modalToggle} /*className={className}*/>
        <ModalHeader toggle={modalToggle}></ModalHeader>
        <ModalBody>
          <div className="middleSidebar__tweet_top">
            <div className="middleSidebar__tweet_img_wrap">
              <img
                src={tweet.tweetPhotoURL}
                alt=""
                className="middleSidebar__tweeter_img"
              />
            </div>
            <div className="middleSidebar__tweeter_right">
              <div className="middleSidebar__tweeter_header">
                <p className="middleSidebar__tweeter_header_name">
                  {tweet.tweetUsername}
                </p>
                <span className="middleSidebar__tweeter_header_timeline">
                  <Moment fromNow ago>
                    {tweet.tweetTimestamp}
                  </Moment>
                </span>
              </div>

              <p>{tweet.tweetInput}</p>
            </div>
          </div>

          <div className="retweet_main_wrap">
            <div className="retweet_main_wrap_header">
              <div className="tweet__input_img_wrap">
                <img
                  src={tweet.globalData.data[0].photoURL}
                  alt=""
                  className="tweet__input_img"
                />
              </div>
              <TextareaAutosize
                className="tweet__input_textarea"
                placeholder="Tweet your reply"
              />
            </div>

            {retweetImage && (
              <div className="tweet__img_wrap">
                <div
                  className="tweet_img_cross"
                  onClick={() => setRetweetimage(null)}
                >
                  X
                </div>
                <img
                  src={window.URL.createObjectURL(retweetImage)}
                  alt=""
                  className="tweet_img"
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="middleSidebar__tool_wrap" style={{ width: "100%" }}>
            <div className="middleSidebar__tool_wrap_left">
              <input
                type="file"
                id="retweet__file_img"
                onChange={(e) => setRetweetimage(e.target.files[0])}
              />
              <label
                className="middleSidebar__tool_wrap_left_icon_wrap"
                htmlFor="retweet__file_img"
              >
                <FontAwesomeIcon
                  icon={faImages}
                  className="middleSidebar__tool_wrap_left_icon"
                />
              </label>
              <div className="middleSidebar__tool_wrap_left_icon_wrap">
                <FontAwesomeIcon
                  icon={faGift}
                  className="middleSidebar__tool_wrap_left_icon"
                />
              </div>
              <div className="middleSidebar__tool_wrap_left_icon_wrap">
                <FontAwesomeIcon
                  icon={faPoll}
                  className="middleSidebar__tool_wrap_left_icon"
                />
              </div>
              <div className="middleSidebar__tool_wrap_left_icon_wrap">
                <FontAwesomeIcon
                  icon={faSmile}
                  className="middleSidebar__tool_wrap_left_icon"
                />
              </div>
              <div className="middleSidebar__tool_wrap_left_icon_wrap">
                <FontAwesomeIcon
                  icon={faGift}
                  className="middleSidebar__tool_wrap_left_icon"
                />
              </div>
            </div>
            <div className="middleSidebar__tool_wrap_right">
              <button className="middleSidebar__tool_wrap_right_tweet">
                Retweet
              </button>
            </div>
          </div>
        </ModalFooter>
      </Modal>

      <div className="middleSidebar__tweet_top">
        <div className="middleSidebar__tweet_img_wrap">
          <img
            src={tweet.tweetPhotoURL}
            alt=""
            className="middleSidebar__tweeter_img"
          />
        </div>

        <div className="middleSidebar__tweeter_right">
          <div className="middleSidebar__tweeter_header">
            <p className="middleSidebar__tweeter_header_name">
              {tweet.tweetUsername}
            </p>
            <span className="middleSidebar__tweeter_header_timeline">
              <Moment fromNow ago>
                {tweet.tweetTimestamp}
              </Moment>
            </span>
          </div>

          <p className="middleSidebar__tweeter_header_timeline_tweet">
            {tweet.tweetInput}
          </p>

          {tweet.tweetInputImage && (
            <div>
              <img
                src={tweet.tweetInputImage}
                alt=""
                className="middleSidebar__tweeter_header_timeline_image mb-2"
              />
            </div>
          )}
        </div>

        <div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="middleSidebar__tweeter_toggle">
              <FontAwesomeIcon icon={faChevronDown} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Not interested in this Tweet</DropdownItem>
              <DropdownItem>Unfollow</DropdownItem>
              <DropdownItem>Add/remove from Lists</DropdownItem>
              <DropdownItem>Mute</DropdownItem>
              <DropdownItem>Block</DropdownItem>
              <DropdownItem>Embeded Tweet</DropdownItem>
              <DropdownItem>Report Tweet</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="middleSidebar__tweeter_comment_like_share ">
        <div
          className="middleSidebar__tweeter_comment_like_share_icon_wrap middleSidebar__tweeter_comment_like_share_icon_wrap1 "
          onClick={modalToggle}
        >
          <div className="middleSidebar__tweeter_comment_like_share_icon_container">
            <FontAwesomeIcon
              icon={faComment}
              className="middleSidebar__tweeter_comment_like_share_icon"
            />
          </div>
          <div className="middleSidebar__tweeter_comment_like_share_icon_count"></div>
        </div>

        <div className="middleSidebar__tweeter_comment_like_share_icon_wrap middleSidebar__tweeter_comment_like_share_icon_wrap2 ">
          <div className="middleSidebar__tweeter_comment_like_share_icon_container">
            <FontAwesomeIcon
              icon={faRetweet}
              className="middleSidebar__tweeter_comment_like_share_icon"
            />
          </div>
          <div className="middleSidebar__tweeter_comment_like_share_icon_count"></div>
        </div>

        <div
          className="middleSidebar__tweeter_comment_like_share_icon_wrap middleSidebar__tweeter_comment_like_share_icon_wrap3 "
          onClick={tweetLikeHandle}
        >
          <div className="middleSidebar__tweeter_comment_like_share_icon_container">
            {tweet.tweetLikes.find(
              (data) => data == tweet.globalData.data[0].email
            ) ? (
              <FontAwesomeIcon
                icon={faHearted}
                className="middleSidebar__tweeter_comment_like_share_icon active"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className="middleSidebar__tweeter_comment_like_share_icon"
              />
            )}
          </div>

          <div
            className={`middleSidebar__tweeter_comment_like_share_icon_count ${
              tweet.tweetLikes.find(
                (data) => data == tweet.globalData.data[0].email
              ) && "active"
            }`}
          >
            {tweet.tweetLikes.length ? tweet.tweetLikes.length : ""}
          </div>
        </div>

        <div className="middleSidebar__tweeter_comment_like_share_icon_wrap middleSidebar__tweeter_comment_like_share_icon_wrap4 ">
          <div className="middleSidebar__tweeter_comment_like_share_icon_container">
            <FontAwesomeIcon
              icon={faShareSquare}
              className="middleSidebar__tweeter_comment_like_share_icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleSidebar;
