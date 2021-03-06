import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostContainer} from "./MyPost/MyPostContainer";
import {UserProfile} from '../../Redux/profile-reducer';
import {ProfileUpdateProperties} from '../../API/api';

type ProfileType = {
    userProfile: UserProfile
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    updateProfileTC: (payload: ProfileUpdateProperties) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo {...props}/>
            <MyPostContainer/>
        </div>
    );
};

export default Profile;