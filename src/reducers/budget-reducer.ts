export type BudgetAction = 
    { type: "add-budget", payload: {budget : number} } |
    { type: 'show-modal'} |
    { type: 'hide-modal'}

export type BudgetState = {
    budget : number,
    modal : boolean
}

export const initialState : BudgetState = {
    budget : 0,
    modal : false
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action : BudgetAction
) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget : action.payload.budget
            }
        case 'show-modal' :
            return {
                ...state,
                modal: true
            }
        case 'hide-modal' :
            return {
                ...state,
                modal: false
            }
    }
}