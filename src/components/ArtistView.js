import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams();
    const [artistData, setArtistData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`;
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setArtistData(resData.results);
        };
        fetchData();
    }, [id]);

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        );
    });

    // Menu
    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>
                    Back
                </button>
                <br />
                <button onClick={() => navigate('/')}>
                    Home
                </button>
            </div>
        )
    }

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here!</p>
            {artistData.length > 0 ?
                <h2> {artistData[0].artistName} </h2> :
                <h2>Loading...</h2>
            }
            {navButtons()}
            {renderAlbums}
        </div>
    );
}

export default ArtistView;