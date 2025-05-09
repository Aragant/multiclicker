import { Guild } from "../types/guild";
import { Applicants } from "../types/user";

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

export async function fetchApplicants(): Promise<Applicants[] | null> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Token non trouvé");
        return null;
    }

    try {
        const response = await fetch(`http://localhost:9999/guild/applicants`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const rawData = await response.json();
        const data: Applicants[] = rawData.map((item: any) => ({
            relationId: item.id,
            userId: item.user_id,
            username: item.username,
        }));
        
        return data;
    } catch (err) {
        return null;
    }
}