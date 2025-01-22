import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface UserInfo {
  name: string;
  email: string;
  sub: string; // Identifiant unique de l'utilisateur
}

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      axios
        .get<{ user_info: UserInfo }>(
          `http://localhost:8000/auth/callback?code=${code}`
        )
        .then((response) => setUserInfo(response.data.user_info))
        .catch((error) => console.error("Auth error", error));
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Profile</h1>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
