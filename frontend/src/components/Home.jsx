import React from "react";

const Home = ({ userData }) => {
  console.log("userData:", userData); // Log userData to check its structure

  return (
    <div>
      <h2>Welcome to Home Page</h2>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <img src="{userData.profilePhotoUrl}" alt="Profile Photo" />
          <img src="{userData.coverPhotoUrl}" alt="Cover Photo" />

          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Home;
