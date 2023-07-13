import styles from './UserInformation.module.css'
import ClickableIcon from './ClickableIcon'
import IconEditProfile from '../../assets/icon/edit_profile.svg'
import switchButtonStyles from './SwitchButton.module.css'
import { useState } from 'react'
import { useAppSelector } from '../../store/types'
import { UserData } from '../../types/UserData'
import axios from 'axios'

const UserInformation = () => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const [TFAEnabled, setTFAEnabled] = useState(userData.user.TFAEnabled)

    const editProfile = () => {
        // TODO implement this functionality in both the frontend and the backend
        console.log('Edit Profile')
    }

    const handleToggleSwitch = async () => {
        if (TFAEnabled) {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/auth/2fa/turn-off',
                    {
                        method: 'POST',
                        credentials: 'include',
                    }
                )
                if (response.ok) {
                    console.log('2FA turned off')
                    setTFAEnabled(false)
                }
            } catch (error) {
                console.error('Error turning off 2FA:', error)
            }
        } else {
            window.location.href = 'http://localhost:4040/TFATurnOn'
        }
    }

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
		  try {
			const formData = new FormData();
			formData.append('profilePicture', file);

			const response = await axios.post(
			  'http://localhost:8080/api/user/upload-profile-picture',
			  formData,
			  {
				headers: {
				  'Content-Type': 'multipart/form-data',
				},
			  }
			);

			if (response.status === 200) {
			  console.log('Profile image updated correctly');
			  // Here we can perform any additional action after uploading the image to the backend
			}
		  } catch (error) {
			console.error('Error loading profile image:', error);
		  }
		}
	  };

	  return (
		<div className={styles.container}>
		  <label htmlFor="profile-picture" className={styles.profilePicture}>
			<div
			  className={styles.profilePicture}
			  style={{
				backgroundImage: `url(${userData.user.avatarUrl})`,
				backgroundSize: 'cover',
			  }}
			></div>
			<input
			  id="profile-picture"
			  type="file"
			  accept="image/*"
			  onChange={handleFileChange}
			  style={{ display: 'none' }}
			/>
		  </label>
		  <div>
			<ul className={styles.verticalList}>
			  <li>
				{userData.user.nickname}
				<ClickableIcon icon={IconEditProfile} onClick={editProfile} />
			  </li>
			  <li>Level {Math.floor(userData.user.nbVictory / 5) + 1}</li>
			  <li>
				2fa is
				{TFAEnabled ? ' activated ' : ' deactivated'}
				<label className={switchButtonStyles.switch}>
				  <input
					type="checkbox"
					checked={TFAEnabled}
					readOnly
				  />
				  <span
					className={switchButtonStyles.slider}
					onClick={handleToggleSwitch}
				  ></span>
				</label>
			  </li>
			</ul>
		  </div>
		</div>
	  )
	}

	export default UserInformation
