import { useFormik } from 'formik';
import { useState } from 'react';
import dataService from '../../services/data.service';

const ItemModal = (props) => {
    const { visibilitySetter, changeInvoker } = props;

    const [fileName, setFileName] = useState(null);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error("No file provided"))
            }

            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                setFileName(file.name)
                formik.setFieldValue("imgBase64", fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            imgBase64: '',
        },
        onSubmit: (values, { resetForm }) => {
            dataService.post('items', values)
                .then(() => {
                    resetForm()
                    despawnModal()
                    changeInvoker()
                })
        },
    });

    const despawnModal = () => {
        visibilitySetter(false);
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        <p className="title">Add new item</p>
                        <p className="subtitle">Editing '{null}'</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <label className="label">Item Name</label>
                                <div className="control has-icons-left">
                                    <input name="name" className="input" type="text" placeholder="Pencil with bear eraser" onChange={formik.handleChange} value={formik.values.name} />
                                    <span className="icon is-small is-left">
                                        <i className="fa-solid fa-book"></i>
                                    </span>
                                </div>
                                {/* <p className="help is-success">This username is available</p> */}
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control has-icons-left">
                                    <div className="select is-fullwidth">
                                        <select name="category" onChange={formik.handleChange} value={formik.values.category}>
                                            <option value={null}>Select a category</option>
                                            <option value="books">Books</option>
                                            <option value="stationary">Stationary</option>
                                            <option value="wallets">Wallets</option>
                                            <option value="devices">Smart devices</option>
                                            <option value="bags">Bags</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <span className="icon is-small is-left">
                                        <i className="fa-solid fa-list-ul"></i>
                                    </span>
                                </div>
                                {/* <p className="help is-success">This username is available</p> */}
                            </div>
                            <div className="field">
                                <label className="label">Picture of item</label>
                                <div className="control">
                                    <div className="file has-name is-fullwidth">
                                        <label className="file-label">
                                            <input name="imgBin" className="file-input" type="file" accept="image/*" onChange={(e) => convertToBase64(e.currentTarget.files[0])} />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fas fa-upload" />
                                                </span>
                                                <span className="file-label">
                                                    Choose a file…
                                                </span>
                                            </span>
                                            <span className="file-name">
                                                <span>
                                                    {fileName ? <p className='has-text-dark'>{fileName}</p> : <p className='has-text-grey-light'><i className="fa-solid fa-xmark"></i>&ensp;No file selected</p>}
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons mt-5">
                                <button type='submit' className="button is-success"><i className="fa-solid fa-floppy-disk"></i>&ensp;Save</button>
                                <a className="button is-light" onClick={despawnModal}><i className="fa-solid fa-xmark"></i>&ensp;Cancel</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemModal
