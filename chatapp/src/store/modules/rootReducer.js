import { combineReducers } from 'redux'

import SearchTheme from './search_theme/SearchThemeReducer'
import UserData from './User/userReducer'

export default combineReducers({
    globalState: SearchTheme,
    userData: UserData
})