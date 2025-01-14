// wsReducer.ts
export type MulticlickerState = {
    sumScore: number;
    // Tu peux ajouter d'autres propriétés à l'état ici si nécessaire.
};


export type MulticlickerAction =
    | { type: 'SET_SUM_SCORE'; payload: number }
    // Ajoute d'autres actions si nécessaire.

export const initialState: MulticlickerState = {
    sumScore: 0,
};


export const multiclickerReducer = (state: MulticlickerState, action: MulticlickerAction): MulticlickerState => {
    switch (action.type) {
        case 'SET_SUM_SCORE':
            return {
                ...state,
                sumScore: action.payload,
            };
        default:
            return state;
    }
};