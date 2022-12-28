import { DateTime } from "luxon"

const HomeItemEntry = (props) => {
    const { imgUrl = 'https://bulma.io/images/placeholders/1280x960.png', name, createdAt, category } = props

    return (
        <div className="column is-4">
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={imgUrl} alt={name} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{name}</p>
                            {/* <p className="subtitle is-6">{itemDesc}</p> */}
                            <span class="tag is-dark">
                                {category}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-content pt-2 pb-2 has-background-light">
                    <p className="has-text-grey">Item added {DateTime.fromISO(new Date(createdAt).toISOString()).toFormat('d LLL yyyy')}</p>
                </div>
            </div>
        </div>
    )
}

export default HomeItemEntry
