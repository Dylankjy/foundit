import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import constants from '../../constants';
import dataService from '../../services/data.service';

const ItemModal = (props) => {
    const { visibilitySetter, changeInvoker } = props;
    const { name, category, imgBase64, _id } = props.data || {}

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

    const formInitialValues = {
        _id: '',
        name: '',
        category: '',
        imgBase64: '',
    }
    const formik = useFormik({
        initialValues: formInitialValues,
        onSubmit: (values, { resetForm }) => {
            // If the item is being edited
            if (props.data) {
                dataService.post(`items/${_id}`, values).then(() => {
                    resetForm()
                    despawnModal()
                }).catch((err) => {
                    alert(err)
                })
                return
            }

            // If it's a new item being added
            dataService.post('items', values)
                .then(() => {
                    resetForm()
                    despawnModal()
                })
        },
    });

    const despawnModal = () => {
        visibilitySetter(false)
        changeInvoker()
    }

    useEffect(() => {
        if (props.data) {
            // Set form data with existing item data
            formik.setFieldValue("_id", _id);
            formik.setFieldValue("name", name);
            formik.setFieldValue("category", category);
            formik.setFieldValue("imgBase64", imgBase64);
            setFileName(<span className="has-text-grey-light"><i className="fa-solid fa-file-import"></i>&ensp;Replace current image</span>)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        {(!props.data) ?
                            <p className="title">Add new item</p>
                            :
                            <>
                                <p className="title">Edit item</p>
                                <p className="subtitle">Editing '{name}'</p>
                            </>
                        }
                        <form onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <label className="label">Item Name</label>
                                <div className="control has-icons-left">
                                    <input name="name" className="input" type="text" placeholder="Pencil with bear eraser" onChange={formik.handleChange} value={formik.values.name} />
                                    <span className="icon is-small is-left">
                                        <i className="fa-solid fa-book"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control has-icons-left">
                                    <div className="select is-fullwidth">
                                        <select name="category" onChange={formik.handleChange} value={formik.values.category} defaultValue={category}>
                                            <option value={null}>Select a category</option>
                                            {constants.itemCategories.map((itemCat) => {
                                                return <option key={itemCat.id} value={itemCat.id}>{itemCat.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <span className="icon is-small is-left">
                                        <i className="fa-solid fa-list-ul"></i>
                                    </span>
                                </div>
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
                                                    {
                                                        fileName ?
                                                            <p className='has-text-dark'>{fileName}</p>
                                                            :
                                                            <p className='has-text-grey-light'><i className="fa-solid fa-xmark"></i>&ensp;No file selected</p>
                                                    }
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <p className="help">5MB maximum file size</p>
                            </div>
                            <div className="buttons mt-5">
                                <button type='submit' className="button is-success"><i className="fa-solid fa-floppy-disk"></i>&ensp;Save</button>
                                <button type='button' className="button is-light" onClick={despawnModal}><i className="fa-solid fa-xmark"></i>&ensp;Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemModal
