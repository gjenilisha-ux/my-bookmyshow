import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const movies = [
    {
      title: "Midnight Story",
      genre: "Mystery • Drama",
      poster: "poster-one",
    },
    {
      title: "Beyond The Stars",
      genre: "Sci-Fi • Adventure",
      poster: "poster-two",
    },
    {
      title: "The Last Journey",
      genre: "Action • Thriller",
      poster: "poster-three",
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const showTimes = ["10:00 AM", "1:30 PM", "4:30 PM", "7:30 PM"];

  const seats = [
    "A1", "A2", "A3", "A4",
    "B1", "B2", "B3", "B4",
    "C1", "C2", "C3", "C4",
    "D1", "D2", "D3", "D4",
  ];

  const ticketPrice = 180;
  const totalAmount = selectedSeats.length * ticketPrice;

  const openBooking = (movie) => {
    setSelectedMovie(movie);
    setSelectedTime("");
    setSelectedSeats([]);
    setShowPayment(false);
    setBookingConfirmed(false);
  };

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const continueToPayment = () => {
    if (!selectedTime) {
      alert("Please select a show time.");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    setShowPayment(true);
  };

  const confirmPayment = () => {
    setBookingConfirmed(true);
  };

  const closeBooking = () => {
    setSelectedMovie(null);
    setSelectedTime("");
    setSelectedSeats([]);
    setShowPayment(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="app">

      <header className="navbar">
        <h1>🎬 BOOKNOW</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#theatres">Theatres</a>
        </nav>

        <button
  className="login-btn"
  onClick={() =>
    alert("Login Demo\n\nEmail: demo@booknow.com\nPassword: ••••••••\n\nDemo Login Successful!")
  }
>
  Login
</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p>YOUR MOVIE EXPERIENCE</p>

          <h2>
            Movies are better
            <br />
            on the big screen.
          </h2>

          <p className="description">
            Discover the latest movies and book your
            favourite seats easily.
          </p>

          <button className="explore-btn">
            Explore Movies
          </button>
        </div>
      </section>

      <section className="movies" id="movies">

        <div className="section-title">
          <h2>Now Showing</h2>

          <input
            type="text"
            placeholder="🔍 Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span>View All →</span>
        </div>

        <div className="movie-container">

          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.title}>

              <div className={`poster ${movie.poster}`}></div>

              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.genre}</p>

                <button onClick={() => openBooking(movie)}>
                  Book Tickets
                </button>
              </div>

            </div>
          ))}

        </div>

      </section>

      {selectedMovie && (
        <section className="booking-section">

          <button className="close-booking" onClick={closeBooking}>
            ✕ Close
          </button>

          {!showPayment && !bookingConfirmed && (
            <>
              <h2>🎟️ Book Tickets</h2>

              <h3>{selectedMovie.title}</h3>

              <p>Select your show time</p>

              <div className="time-container">
                {showTimes.map((time) => (
                  <button
                    key={time}
                    className={
                      selectedTime === time
                        ? "time selected"
                        : "time"
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <p>Select your seats</p>

              <div className="screen">
                SCREEN
              </div>

              <div className="seat-container">
                {seats.map((seat) => (
                  <button
                    key={seat}
                    className={
                      selectedSeats.includes(seat)
                        ? "seat selected-seat"
                        : "seat"
                    }
                    onClick={() => toggleSeat(seat)}
                  >
                    {seat}
                  </button>
                ))}
              </div>

              <p>
                {selectedSeats.length} seat(s) selected
              </p>

              <h3>
                Total: ₹{totalAmount}
              </h3>

              <button
                className="confirm-btn"
                onClick={continueToPayment}
              >
                Continue to Payment
              </button>
            </>
          )}

          {showPayment && !bookingConfirmed && (
            <div className="payment-box">

              <h2>💳 Payment</h2>

              <p>
                {selectedMovie.title}
              </p>

              <p>
                {selectedTime} • {selectedSeats.join(", ")}
              </p>

              <h2>Total: ₹{totalAmount}</h2>

              <div className="payment-options">
                <button>💳 Card</button>
                <button>📱 UPI</button>
                <button>🏦 Net Banking</button>
              </div>

              <button
                className="confirm-btn"
                onClick={confirmPayment}
              >
                Pay ₹{totalAmount}
              </button>

              <p className="demo-note">
                Demo payment only — no real money will be charged.
              </p>

            </div>
          )}

          {bookingConfirmed && (
            <div className="success-box">

              <h2>🎉 Booking Confirmed!</h2>

              <p>
                Your movie ticket has been booked successfully.
              </p>

              <div className="ticket">
                <h3>{selectedMovie.title}</h3>
                <p>🕐 {selectedTime}</p>
                <p>💺 {selectedSeats.join(", ")}</p>
                <p>💰 ₹{totalAmount}</p>
              </div>

              <button
                className="confirm-btn"
                onClick={closeBooking}
              >
                Done
              </button>

            </div>
          )}

        </section>
      )}

      <footer>
        <h2>🎬 BOOKNOW</h2>
        <p>Your movie. Your seat. Your experience.</p>
      </footer>

    </div>
  );
}

export default App;