import { PublicUser } from "../types/user";


export async function getUsersByName(usernames: string): Promise<PublicUser[] | null> {

    try {
        const response = await fetch(`http://localhost:9999/user/users?usernames=${usernames}`, {
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
