export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
  items.map(user => {
    if (user[objPropName] === itemId) {
      return {...user, ...newObjProps}
    }
    return user
  })
}

