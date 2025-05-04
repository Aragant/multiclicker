import { Guild } from "../types/guild";

export async function getGuilds(): Promise<Guild[]> {

    try {
        const response = await fetch("http://localhost:9999/guild", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return [];
    }
}