import { toast } from "react-hot-toast"

export const errorHandler = (data: object) => {

    for(let field in data) {
        if(data.hasOwnProperty(field)) {
            if(field === 'detail') {
                toast.error(data[field]);
                break;
            }

            if(field === 're_password') {
                toast.error('Password and confirm password do not match');
                break;
            }

            else {
                let normalizeField = field.charAt(0).toUpperCase() + field.slice(1);
                let normalizeErrorDescription = data[field][0].replace(/This/gi, '');
                toast.error( normalizeField + normalizeErrorDescription );
                break;
            }
        }
    }


}