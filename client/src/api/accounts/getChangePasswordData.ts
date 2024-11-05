
export const getChangePasswordData = async () => {
    
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const uid = pathParts[4];
    const token = pathParts[5]

    console.log(uid, token);

    return {
        uid,
        token
    }
}