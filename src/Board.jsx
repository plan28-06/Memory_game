import { useState, useEffect } from "react";
const url =
    "https://api.giphy.com/v1/gifs/search?api_key=QekxzTEPMcNHKFH3eXPGGy94njaQE32Y&q=cats&limit=8&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

export default function Board() {
    const [images, setimg] = useState([]);
    const [clickedimgs, setclickedimgs] = useState([]);
    const [score, setscore] = useState(0);
    const [bestscore, setbestscore] = useState(0);

    useEffect(() => {
        async function apicall() {
            const response = await fetch(url, { mode: "cors" });
            const obj = await response.json();
            const imgurls = obj.data.map((objdata) => objdata.images.original.url);
            setimg(imgurls)
        }
        apicall();
    }, []);

    function handleclicks(event) {
        let imgurl = event.target.src;
        if (clickedimgs.includes(imgurl)) {
            setclickedimgs([]);
            setscore(0);
        } else {
            setclickedimgs([...clickedimgs, imgurl]);
            setscore(score + 1);
            if (score + 1 > bestscore) {
                setbestscore(bestscore + 1);
            }
        }
        shufflearray();
    }

    function shufflearray() {
        const shuffled = [...images];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        setimg(shuffled);
    }

    return (
        <>
            <h4>
                Score: {score}&ensp;Best-Score: {bestscore}
            </h4>
            <div className="cards">
                {images.map((image) => {
                    return (
                        <button onClick={handleclicks} key={image}>
                            <img src={image} />
                        </button>
                    );
                })}
            </div>
        </> 
    );
}
