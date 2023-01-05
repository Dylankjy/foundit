import NoMoreItems from "./NoMoreItems"

const EndMessage = (props) => {
    const count = props.dataLength
    if (count !== 0) {
        return <NoMoreItems />
    }
}

export default EndMessage