class PlayerStorage {
  private static playerIdKey = "player_id";
  private static guildIdKey = "guild_id";

  static save(username: string, guild_id: string): void {
    try {
      localStorage.setItem(this.playerIdKey, username);
      localStorage.setItem(this.guildIdKey, guild_id);
    } catch (error) {
      console.error("Failed to save player name:", error);
    }
  }

  static get(): string | null {
    try {
      return localStorage.getItem(this.playerIdKey);
    } catch (error) {
      console.error("Failed to get player name:", error);
      return null;
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(this.playerIdKey);
    } catch (error) {
      console.error("Failed to clear player name:", error);
    }
  }
}

export default PlayerStorage;