
export const getVerificationData = async () => {
    
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/');
    const uid = pathParts[2];
    const token = pathParts[3]

    return {
        uid,
        token
    }
}