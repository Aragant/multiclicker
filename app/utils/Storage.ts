import { Rethink_Sans } from "next/font/google";

class Storage {
  static playerIdKey = "player_id";
  static guildIdKey = "guild_id";

  static save(username: string, guild_id: string): void {
    try {
      localStorage.setItem(this.playerIdKey, username);
      localStorage.setItem(this.guildIdKey, guild_id);
    } catch (error) {
      console.error("Failed to save player name:", error);
    }
  }

  static getGuildId(): string | null {
    try {
      const guildId = localStorage.getItem(this.guildIdKey);
      if(guildId === "null") {
        return null;
      }
      return guildId;
    } catch (error) {
      console.error("Failed to get guild ID:", error);
      return null;
    }
  }
  
  static getPlayerId(): string | null {
    try {
      return localStorage.getItem(this.playerIdKey);
    } catch (error) {
      console.error("Failed to get player ID:", error);
      return null;
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(this.playerIdKey);
      localStorage.removeItem(this.guildIdKey);
    } catch (error) {
      console.error("Failed to clear player name:", error);
    }
  }
}

export default Storage;