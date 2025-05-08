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

export async function getGuildById(guildId: string): Promise<Guild | null> {
    try {
        const response = await fetch(`http://localhost:9999/guild/${guildId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
}

export async function joinGuild(guildId: string): Promise<Guild | null> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Token non trouvé");
        return null;
    }

    try {
        const response = await fetch(`http://localhost:9999/guild/join/${guildId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
}