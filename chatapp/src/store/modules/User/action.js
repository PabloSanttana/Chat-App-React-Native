
export const userData = (data) =>{
    return{
        type: 'USER_DATA',
        data
    }
}

export const userImage = (image) =>{
    return{
        type: 'USER_IMAGE',
        image
    }
}
export const editContact =(edit) =>{
    return{
        type: 'EDIT_CONTACT',
        edit
    }
}