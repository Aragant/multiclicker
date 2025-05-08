import { LoginResponse } from "../types/auth";

export async function login(username: string, password: string): Promise<LoginResponse> {
  const formDataToSend = new URLSearchParams();
  formDataToSend.append("username", username);
  formDataToSend.append("password", password);

  try {
    const response = await fetch("http://localhost:9999/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formDataToSend.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.detail || "Login failed" , user: { guild_id: "", id: "" } };
    }

    const data = await response.json();
    console.log("Login successful:", data);


    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    
    return { success: true, message: "Login successful!" , user: data.user};
  } catch (err) {
    return { success: false, message: "An error occurred while logging in: " + err, user: { guild_id: "", id: "" } };
  }
}