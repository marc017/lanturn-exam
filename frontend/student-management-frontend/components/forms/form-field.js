import React from 'react';
import { useFormikContext } from 'formik';

function AppFormField({
    name,
    width,
    onChangeText = (text) => {},
    ...otherProps
    }) {
        const {
            setFieldTouched,
            setFieldValue,
            values,
            errors,
            touched,
        } = useFormikContext();
        return (
            <>
            <input
                onBlur={() => setFieldTouched(name)}
                onChange={(change) => {
                    console.log(change.nativeEvent.data)
                    setFieldValue(name, change.nativeEvent.data, true);
                    // onChangeText(text);
                }}
                value={values[name]}
                width={width}
                {...otherProps}
            />
            </>
        );
}

export default AppFormField;
