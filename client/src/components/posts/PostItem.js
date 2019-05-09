import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { updateLikes, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  updateLikes,
  deletePost,
  showDiscussLink
}) => {
  const userLikedPost =
    !auth.loading &&
    user &&
    likes.map(like => like.user).includes(auth.user._id);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>

        <button
          type="button"
          className="btn btn-light"
          onClick={e => updateLikes(_id)}
        >
          {
            <span className={userLikedPost ? "text-primary" : ""}>
              <i
                className={
                  userLikedPost ? "fas fa-thumbs-up" : "far fa-thumbs-up"
                }
              />{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </span>
          }
        </button>
        {showDiscussLink && (
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
        )}
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => deletePost(_id)}
          >
            <i className="fas fa-times" /> Delete
          </button>
        )}
      </div>
    </div>
  );
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

PostItem.defaultProps = {
  showDiscussLink: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateLikes, deletePost }
)(PostItem);
