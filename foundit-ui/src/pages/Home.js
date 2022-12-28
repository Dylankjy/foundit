import Navbar from "../components/Global/Navbar"
import HomeHero from "../components/Home/Hero"
import HomeItemContainer from "../components/Home/HomeItemContainer"
import SearchBox from "../components/Home/SearchBox"

const Home = () => {
    return (
        <>
            <Navbar />
            <HomeHero />
            <SearchBox />
            <HomeItemContainer />
        </>
    )
}

export default Home
