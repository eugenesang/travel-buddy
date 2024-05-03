// import { useEffect, useState } from "react";
import ExploreCard from "../components/ExploreCard";
import useFetch from "../hooks/useFetch";

const Explore = () => {

    return (
        <section id="explore">
            <div className="inner-section">
                <h1>Must visit destinations in <span>Kenya</span> <span className="tick">✔</span></h1>
                <ExploreDestinations />
            </div>
            <div>
                <h1>Visited Destinations</h1>
            </div>
        </section>
    )
}

function ExploreDestinations() {
    const { error, data, loading } = useFetch("/api/destination/explore")

    const cleanData = (arr) => {
        const l = {};
        for (let e of arr) {
            l[e._id] = e;
        }

        return Object.values(l);
    }
    return (<div className="explore-destinations">
        {loading && "Loading destinations..."}
        {error && "An error occurred fetching destinations"}
        {data && cleanData(data).map((d, i) => {
            return (<ExploreCard key={i} title={d.title} location={d.location} img={d.img} description={d.description} _id={d._id} />)
        })}
    </div>);
}

export default Explore;