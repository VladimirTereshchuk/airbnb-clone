import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResultArr }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  // const [center, setCenter] = useState({});
  const [viewport, setViewport] = useState({});

  // const coordinates = searchResultArr.map((result) => ({
  //   longitude: result.long,
  //   latitude: result.lat,
  // }));

  useEffect(() => {
    setCoordinates(
      searchResultArr.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
      }))
    );
  }, [searchResultArr]);

  // useEffect(() => {
  //   setCenter(getCenter(coordinates));
  // }, [coordinates]);

  useEffect(() => {
    setViewport({
      width: "100%",
      height: "100%",
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 12,
    });
  }, [coordinates]);

  const center = getCenter(coordinates);

  return (
    <>
      {coordinates.length !== 0 && (
        <ReactMapGL
          mapStyle="mapbox://styles/vofca/cksumq92l5b4617qi95yegtuz"
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MapboxAccessToken}
          {...viewport}
          onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
        >
          {searchResultArr.map((result) => (
            <div key={result.long} className="">
              <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                // className="absolute z-0 cursor-pointer"
              >
                <p
                  role="img"
                  aria-label="marker"
                  onClick={() => setSelectedLocation(result)}
                  className="cursor-pointer animate-bounce"
                >
                  <img src="marker1.png" alt="marker" className="" />
                </p>
              </Marker>
              {selectedLocation.long === result.long ? (
                <Popup
                  onClose={() => setSelectedLocation({})}
                  closeOnClick={true}
                  latitude={result.lat}
                  longitude={result.long}
                >
                  <div className="top-0 right-0 z-150">{result.title}</div>
                </Popup>
              ) : (
                false
              )}
            </div>
          ))}
        </ReactMapGL>
      )}
    </>
  );
}

export default Map;
