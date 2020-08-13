const INTIAL_STATE={
    search: '',
    theme: true,
    notification: true,
    notificationValue: 3
}

export default (state = INTIAL_STATE, action) => {

    switch(action.type){
        case 'SEARCH':
            return {
                ...state,
                 search: action.search
            }
        case 'THEME':
            return {
                ...state,
                theme: action.theme
            }
        case 'NOTIFICATIONS':
            return {
                ...state,
                notification: action.active,
                notificationValue:action.value
            }
        default:
            return state
    }
}