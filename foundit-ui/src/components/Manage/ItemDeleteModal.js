import dataService from '../../services/data.service';

const ItemDeleteModal = (props) => {
    const { visibilitySetter, changeInvoker } = props;
    const { name, _id } = props.data || {}

    const despawnModal = () => {
        visibilitySetter(false);
    }

    const deleteItem = () => { 
        dataService.delete(`items/${_id}`)
            .then(() => {
                despawnModal()
                changeInvoker()
            })
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        <p className="title">Delete item</p>
                        <p className="subtitle">Remove '{ name }' from database?</p>
                        <div className="buttons mt-5">
                            <button className="button is-danger" onClick={deleteItem}><i className="fa-solid fa-trash"></i>&ensp;Delete item</button>
                            <button className="button is-light" onClick={despawnModal}><i className="fa-solid fa-xmark"></i>&ensp;Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDeleteModal
