import { useFormik } from "formik";
import dataService from "../../services/data.service";

const SubscribeModal = ({ onSubmit, onClose }) => {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dataService.post(`notify`, values).then(() => {
                onSubmit()
                onClose()
                resetForm()
            }).catch((err) => {
                alert(err)
            })
        },
    });

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        <h1 className="title">Get notified</h1>
                        <p className="subtitle">Get an email every time a new item gets added.</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="field">
                                {/* <label className="label">Email</label> */}
                                <div className="control">
                                    <input className="input" type="email" name="email" placeholder="johndoe@example.com" onChange={formik.handleChange} defaultValue={formik.values.email} />
                                </div>
                            </div>
                            <span className="buttons">
                                <button className="button is-dark" type="submit">Subscribe</button>
                                <button className="button is-white" onClick={onClose} type="button">Cancel</button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscribeModal