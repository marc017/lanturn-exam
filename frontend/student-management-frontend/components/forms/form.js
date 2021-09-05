import { Formik, Form, Field } from 'formik';
import styles from '../../styles/Home.module.css'
import { Tooltip } from '@material-ui/core';

function SearchForm({initialValues, onSubmit, validationSchema, children}) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <Field className={styles.input} name="tutorEmail" type="email"></Field>
                <Tooltip aria-label="Search" title="Search">
                    <button className={styles.buttonPrimary} type="submit">Search</button>
                </Tooltip>
            </Form>
        </Formik>
    )
}

export default SearchForm;