import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div class="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 class="text-primary">Bio</h2>
        <p>{bio}</p>
        <div class="line" />
      </Fragment>
    )}
    <h2 class="text-primary">Skill Set</h2>
    <div class="skills">
      {skills.map((skill, idx) => (
        <div class="p-1" key={idx}>
          <i class="fa fa-check" /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
