import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  comment: { _id: commentId, text, name, avatar, date, user },
  deleteComment,
  auth,
  postId
}) => (
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
        Posted on {<Moment format="MM/DD/YYYY">{date}</Moment>}
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={e => deleteComment(postId, commentId)}
        >
          <i className="fas fa-times" /> Delete
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
