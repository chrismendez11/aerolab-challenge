const getConfig: any = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
})

export default getConfig