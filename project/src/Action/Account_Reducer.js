const addItem = ( account ) => {
    return { type: "ADDED", payload: account }
}
const removeItem = ( menu_item ) => {
    return { type: "REMOVE_ITEM", payload: account }
}

export { addItem, removeItem }