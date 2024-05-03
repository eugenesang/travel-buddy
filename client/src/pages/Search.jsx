import { useEffect, useState } from "react";
import { searchDestinations } from "../services/destinationApi";
import ExploreCard from "../components/ExploreCard";
import { useLocation } from "react-router-dom";

const Search = () => {
    const location = useLocation();

    const [results, setResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async function (q) {
        setLoading(true);
        setError(false);
        try {
            if(q.length < 2){
                throw new Error("No input")
            }
            const res = await searchDestinations(q);

            setResults(res);

        } catch (error) {
            console.log(error);
            setError("An error occurred");
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("q") || searchParams.get("query");

        if(query){
            setSearchQuery(query);
            handleSubmit(query);
        }
    }, [location.search])


    return (<section id="search-section">
        <div className="search-head">
            <form onSubmit={e=>{ e.preventDefault(); handleSubmit(searchQuery);}}>
                <label htmlFor="search">
                    <input type="search" name="search" id="search" onChange={e=>{setSearchQuery(e.target.value)}} value={searchQuery} />
                </label>
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
        {searchQuery && results?.length == 0 && <h3><span> &ldquo;{searchQuery}&rdquo;</span> wasn&apos;t found in any travel destinations</h3>}
        <div className="search-results">
        {loading && "Loading destinations..."}
        {error && "An error occurred fetching destinations"}
        {results && results.sort((a, b)=>b.score - a.score).map((d, i) => {
            return (<ExploreCard key={i} title={d.title} location={d.location} img={d.img} description={d.description} _id={d._id} />)
        })} 
        </div>
    </section>);
}

export default Search;