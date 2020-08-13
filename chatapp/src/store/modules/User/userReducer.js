const INTIAL_STATE={
    id: '',
    name: '',
    email: '',
    phone: '',
    image: '',
    edit: null,
    room: ''
}

export default (state = INTIAL_STATE, action) => {

    switch(action.type){
        case 'USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'USER_IMAGE':
            return {
                ...state,
                image: action.image
            }
        case 'EDIT_CONTACT':
            return {
                ...state,
                edit: action.edit
            }
        default:
            return state
    }
}