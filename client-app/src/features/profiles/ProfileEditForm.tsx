import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditMode}: Props) {
    const { profileStore } = useStore();
    const { profile, updateProfile } = profileStore;

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display Name is required'),
    })

    function handleFormSubmit(values: Partial<Profile>) {
        updateProfile(values).then(() => setEditMode(false));
    }

    return (
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ isValid, isSubmitting, dirty }) => (
                    <Form className='ui form'>
                        <MyTextInput name='displayName' placeholder='Display Name' />
                        <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                        <Button
                            disabled={!dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right'
                            positive 
                            type='submit' 
                            content='Update Profile' 
                        />
                    </Form>
                )}
            </Formik>
    )
})