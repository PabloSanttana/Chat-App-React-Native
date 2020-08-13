
export const Search = (search) =>{
    return{
        type: 'SEARCH',
        search
    }
}

export const Theme = (theme) =>{
    return{
        type: 'THEME',
        theme
    }
}
export const Notifications = (active,value) =>{
    return{
        type: 'NOTIFICATIONS',
        active,
        value
    }
}