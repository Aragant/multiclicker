import { PublicUser } from "../types/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUsersByName(usernames: string): Promise<PublicUser[] | null> {

    try {
        const response = await fetch(`${apiUrl}/user/users?usernames=${usernames}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}
