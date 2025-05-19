// wsReducer.ts

type PlayerScore = {
    username: string;
    score: number;
}


export type MulticlickerState = {
    sumScore: number;
    playerScore: PlayerScore[];
    // Tu peux ajouter d'autres propriétés à l'état ici si nécessaire.
};

export type MulticlickerAction =
    | { type: 'SET_SUM_SCORE'; payload: number }
    | { type: 'SET_PLAYER_SCORE'; payload: PlayerScore }
    | { type: 'SET_PLAYER_NAME'; payload: string }
    | { type: 'SET_GAME_INFO'; payload: MulticlickerState }
// Ajoute d'autres actions si nécessaire.

export const initialState: MulticlickerState = {
    sumScore: 0,
    playerScore: [],
};


export const multiclickerReducer = (state: MulticlickerState, action: MulticlickerAction): MulticlickerState => {
    switch (action.type) {
        case 'SET_SUM_SCORE':
            console.log("SET_SUM_SCORE", action.payload);
            return {
                ...state,
                sumScore: action.payload,
            };
        case 'SET_PLAYER_SCORE':
            console.log("SET_PLAYER_SCORE", action.payload);
            setPlayerScore(action.payload, state);
            return {
                ...state,
                playerScore: [...state.playerScore],
            }
        case 'SET_PLAYER_NAME':
            return {
                ...state
            }
        case 'SET_GAME_INFO':
            return {
                ...state,
                sumScore: action.payload.sumScore,
                playerScore: action.payload.playerScore,
            };
        default:
            return state;
    }
};


function setPlayerScore(playerScore: PlayerScore, state: MulticlickerState) {
    const index = state.playerScore.findIndex((p) => p.username === playerScore.username);
    if (index === -1) {
        state.playerScore.push(playerScore);
    } else {
        state.playerScore[index].score = playerScore.score;
    }
}


