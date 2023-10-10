import { useState } from "react";



const useForm = <T extends Object>( initState: T ) => {

    const [formValues, setFormValues] = useState( initState );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormValues({ 
            ...formValues, 
            [name]: value 
        });
    };

    const resetForm = ( resetValue: T) => {
        setFormValues(resetValue);
    };

    
    return {
        formValues,
        handleInputChange,
        resetForm
    }
}


export default useForm;