import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GetLocation from "../components/GetLocation";
import FindGarages from "../components/FindGarages";

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <>
      <Navbar />
      <GetLocation onLocationFetched={setUserLocation} />
      {userLocation ? <FindGarages userLocation={userLocation} /> : <p>Fetching location...</p>}
      <Footer />
    </>
  );
};

export default Home;
