import { usePlayerScore } from "@/app/context/usePlayerScore";

export default function Player() {
    const playerScore = usePlayerScore();

    return (
        <div className="player flex flex-row">
            <ul>
                {
                    playerScore.map((player) => {
                        return (
                            <li key={player.username}>
                                {player.username} : {player.sumScore}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}