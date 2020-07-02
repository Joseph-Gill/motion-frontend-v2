import React, { useEffect } from 'react';
import { connect } from "react-redux";
import MyPosts from '../MyPosts';
import MyLikedPosts from '../MyLikedPosts';
import MyFollowers from '../MyFollowers';
import MyFollowing from '../MyFollowing';
import MyFriends from '../MyFriends';


const MyProfileFeed = ({ activeComponent }) => {

    // The key needs to be the same as the identifiers of the tabsData array defined in "ProfileTabs"
    // TODO find a way to move this into the tabsData array in ProfileTabs so it's not in two places

    useEffect(() => {
        console.log("active component should change");
    }, [activeComponent]);

    const Components = {
        Posts: <MyPosts />,
        Likes: <MyLikedPosts />,
        Followers: <MyFollowers />,
        Following: <MyFollowing />,
        Friends: <MyFriends />,
    };

    return Components[activeComponent]
};


const mapStateToProps = state => {
    return {
        activeComponent: state.userProfileReducer.activeTab
    };
};


export default connect(mapStateToProps)(MyProfileFeed);
