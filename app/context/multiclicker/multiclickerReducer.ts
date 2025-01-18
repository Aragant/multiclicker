// wsReducer.ts

type PlayerScore = {
    username: string;
    sumScore: number;
}

type Clan = {
    clan: string | null;
    players: string[];
}

export type MulticlickerState = {
    sumScore: number;
    playerScore: PlayerScore[];
    clans: Clan[];
    clientClan: string | null;
    // Tu peux ajouter d'autres propriétés à l'état ici si nécessaire.
};

export type MulticlickerAction =
    | { type: 'SET_SUM_SCORE'; payload: number }
    | { type: 'SET_PLAYER_SCORE'; payload: PlayerScore }
    | { type: 'SET_CLANS'; payload: Clan[] }
    | { type: 'GET_GAME_INFO'; payload: MulticlickerState }
    | { type: 'SET_CLIENT_CLAN'; payload: string }
// Ajoute d'autres actions si nécessaire.

export const initialState: MulticlickerState = {
    sumScore: 0,
    playerScore: [],
    clans: [],
    clientClan: null
};


export const multiclickerReducer = (state: MulticlickerState, action: MulticlickerAction): MulticlickerState => {
    switch (action.type) {
        case 'SET_SUM_SCORE':
            return {
                ...state,
                sumScore: action.payload,
            };
        case 'SET_PLAYER_SCORE':
            setPlayerScore(action.payload, state);
            return {
                ...state,
                playerScore: [...state.playerScore],
            }

        case 'SET_CLANS':
            return {
                ...state,
                clans: action.payload
            }

        //on as un get qui set des truc ca fait bizarre
        case 'GET_GAME_INFO':
            return {
                ...state,
                sumScore: action.payload.sumScore,
                playerScore: action.payload.playerScore,
                clans: action.payload.clans
            };

        case 'SET_CLIENT_CLAN':
            console.log('SET_CLIENT_CLAN', action.payload);
            return {
                ...state,
                clientClan: action.payload
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
        state.playerScore[index].sumScore = playerScore.sumScore;
    }
}


