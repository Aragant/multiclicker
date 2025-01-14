

export default function Player(name: string, sumClick: number) {
    return (
        <div className="player flex flex-row">
            <p>{name}</p> : <p>{sumClick}</p>
        </div>
    );
}