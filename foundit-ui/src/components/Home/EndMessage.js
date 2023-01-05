import NoMoreItems from "./NoMoreItems"
import NoResults from "./NoResult"

const EndMessage = (props) => {
    const count = props.dataLength
    if (count === 0) {
        return <NoResults />
    } else {
        return <NoMoreItems />
    }
}

export default EndMessage