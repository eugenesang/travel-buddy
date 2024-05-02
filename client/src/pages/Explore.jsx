// import { useEffect, useState } from "react";
import ExploreCard from "../components/ExploreCard";
import useFetch from "../hooks/useFetch";

const Explore = () => {
    
    const {error, data, loading} = useFetch("/api/destination/explore")

    
    return ( <section id="explore">
        {loading &&  "Loading ..."}
        {error && "An error occurred"}
        {data && data.map((d, i)=>{
            return (<ExploreCard key={i} title={d.title} location={d.location}  img={d.img} description={d.description} _id={d._id} />)
        })}
    </section> );
}
 
export default Explore;