import { Guild } from "../types/guild";
import { Applicant } from "../types/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getGuilds(): Promise<Guild[]> {

    try {
        const response = await fetch(`${apiUrl}/guild`, {
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
        const response = await fetch(`${apiUrl}/guild/${guildId}`, {
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
        const response = await fetch(`${apiUrl}/guild/join/${guildId}`, {
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

export async function fetchApplicants(): Promise<Applicant[] | null> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Token non trouvé");
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/guild/applicants`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const rawData = await response.json();
        const data: Applicant[] = rawData.map((item: any) => ({
            relationId: item.id,
            userId: item.user_id,
            username: item.username,
        }));

        return data;
    } catch (err) {
        return null;
    }
}

export async function acceptApplicants(applicantId: string): Promise<Applicant[] | null> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Token non trouvé");
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/guild/accept/${applicantId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const rawData = await response.json();

        return rawData;
    } catch (err) {
        return null;
    }
}

export async function rejectApplicants(applicantId: string): Promise<Applicant[] | null> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.error("Token non trouvé");
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/guild/reject/${applicantId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const rawData = await response.json();

        return rawData;
    } catch (err) {
        return null;
    }
}