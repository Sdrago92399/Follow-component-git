import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { generateToken, followUser, unfollowUser, getFollowers, getFollowing } from './api'; // Import API functions

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await generateToken();
        setToken(data.token);
        setProfiles(data.users);
        setCurrentUser(data.currentUser);
        setSelectedProfile(data.currentUser);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const isFollowing = (profile) => {
    return currentUser && profile.followers.includes(currentUser.id);
  };

  const handleFollowClick = async (profile) => {
    if (profile) {
      try {
        if (isFollowing(profile)) {
          await unfollowUser(profile.id, token);
        } else {
          await followUser(profile.id, token);
        }

        const updatedFollowers = await getFollowers(profile.id, token);
        const updatedSelectedFollowers = await getFollowers(selectedProfile.id, token);        
        const updatedFollowing = await getFollowing(profile.id, token);
        const updatedSelectedFollowing = await getFollowing(selectedProfile.id, token);
        setProfiles(profiles.map(members =>
          members.id === profile.id ? { ...profile, followers: updatedFollowers, following: updatedFollowing } : members
        ));
        setSelectedProfile({ ...selectedProfile, followers: updatedSelectedFollowers, following: updatedSelectedFollowing });

      } catch (error) {
        console.error('Error following/unfollowing user:', error);
      }
    }
  };

  return (
    <div className="vh-100">
      <MDBContainer>
        {selectedProfile && (
          <MDBRow className="justify-content-center" style={{ backgroundColor: '#9de2ff' }}>
            <MDBCol md="9" lg="7" xl="5" className="my-5">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={selectedProfile.image}
                        alt='Profile image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <MDBCardTitle>{selectedProfile.username}</MDBCardTitle>
                      <MDBCardText>{selectedProfile.email}</MDBCardText>
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: '#efefef' }}>
                        <div>
                          <p className="small text-muted mb-1">Followers</p>
                          <p className="mb-0">{selectedProfile.followers.length}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Following</p>
                          <p className="mb-0">{selectedProfile.following.length}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                        <MDBBtn className="flex-grow-1" onClick={handleFollowClick}>
                          {isFollowing(selectedProfile) ? 'Unfollow' : 'Follow'}
                        </MDBBtn>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        )}
        <MDBRow className="mt-5">
          {profiles.map((profile, index) => (
            <MDBCol md="4" key={index}>
              <MDBCard>
                <div className="header-cover" style={{ backgroundImage: `url(${profile.cover})`, height: '130px', backgroundSize: 'cover' }}></div>
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={profile.image}
                    className="img-fluid rounded-circle"
                    style={{ width: '100px', marginTop: '-50px', border: '5px solid white' }}
                    alt="Profile avatar"
                  />
                  <MDBCardTitle className="mt-3">{profile.username}</MDBCardTitle>
                  <MDBCardText>{profile.email}</MDBCardText>
                  <div className="user-button">
                    <MDBRow>
                      <MDBCol>
                        <MDBBtn size="sm" color="primary" onClick={() => handleProfileClick(profile)}>Show Profile</MDBBtn>
                      </MDBCol>
                      <MDBCol>
                        <MDBBtn size="sm" color="light" onClick={() => handleFollowClick(profile)}>
                          {isFollowing(profile) ? 'Unfollow' : 'Follow'}
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
