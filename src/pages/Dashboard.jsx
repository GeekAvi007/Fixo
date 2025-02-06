import Navbar from "../components/Navbar";
import BookingForm from "../components/BookingForm";
// import ReviewRatings from "../components/ReviewRatings";

const Dashboard = () => (
  <>
    <Navbar />
    <h1 className="text-2xl text-center my-4">Welcome to Your Dashboard</h1>
    <BookingForm />
    {/* <ReviewRatings /> */}
  </>
);

export default Dashboard;
