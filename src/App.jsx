import { useState } from "react";
import "./App.css";

const movies = [
  {
    title: "Kantara",
    genre: "Adventure • Drama",
    image:
      <img src="public/images/kantara.jpg" alt="Kantara" />
  },
  {
    title: "Baahubali 2",
    genre: "Action • Fantasy",
    image:
    src={`${import.meta.env.BASE_URL}images/baahubali2.jpg`}
  },
  {
    title: "Pathu Thala",
    genre: "Action • Crime • Thriller",
    image:
      <img src="/my-bookmyshow/images/pathu thala.jpg" />
  },
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="navbar">
        <div className="logo">
          🎬 <span>BOOK</span><b>NOW</b>
        </div>

        <nav>
          <a className="active">Home</a>
          <a>Movies</a>
          <a>Theatres</a>
        </nav>

        <button className="login-btn">Login</button>
      </header>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">
          <p className="small-title">YOUR MOVIE EXPERIENCE</p>

          <h1>
            Movies are better
            <br />
            <span>on the big screen.</span>
          </h1>

          <p className="hero-text">
            Discover the latest movies and book your
            <br />
            favourite seats easily.
          </p>

          <button className="explore-btn">
            Explore Movies
          </button>
        </div>

        <div className="hero-glow"></div>

        <div className="cinema-shapes">
          <div className="seat-row row1"></div>
          <div className="seat-row row2"></div>
          <div className="seat-row row3"></div>
        </div>

      </section>

      {/* MOVIES */}
      <section className="movies-section">

        <div className="section-header">
          <h2>Now Showing</h2>

          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search movies..."
            />
          </div>

          <span className="view-all">
            View All →
          </span>
        </div>

        <div className="movie-layout">

          <div className="movie-grid">

            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>

                <div className="poster">
                  <img src={movie.image} alt={movie.title} />

                  <div className="poster-overlay"></div>

                  <button className="heart">
                    ♡
                  </button>
                </div>

                <div className="movie-info">

                  <h3>{movie.title}</h3>

                  <p>{movie.genre}</p>

                  <button
                    className="book-btn"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setSelectedSeats([]);
                    }}
                  >
                    Book Tickets
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* BOOKING PANEL */}
          {selectedMovie && (
            <div className="booking-panel">

              <button
                className="close-btn"
                onClick={() => setSelectedMovie(null)}
              >
                ✕ Close
              </button>

              <h2>🎟️ Book Tickets</h2>

              <h3>{selectedMovie.title}</h3>

              <p className="booking-label">
                Select your show time
              </p>

              <div className="times">
                <button>10:00 AM</button>
                <button className="selected-time">
                  1:30 PM
                </button>
                <button>4:30 PM</button>
                <button>7:30 PM</button>
              </div>

              <p className="booking-label">
                Select your seats
              </p>

              <div className="screen">
                SCREEN
              </div>

              <div className="seat-container">

                {["A", "B", "C", "D"].map((row) => (
                  <div className="seat-row-book" key={row}>

                    <span className="row-name">
                      {row}
                    </span>

                    {[1, 2, 3, 4].map((num) => {
                      const seat = `${row}${num}`;

                      return (
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
                      );
                    })}

                  </div>
                ))}

              </div>

              <div className="legend">
                <span>
                  <i className="available"></i>
                  Available
                </span>

                <span>
                  <i className="selected"></i>
                  Selected
                </span>

                <span>
                  <i className="booked"></i>
                  Booked
                </span>
              </div>

              <div className="total">
                <span>
                  {selectedSeats.length} seat(s) selected
                </span>

                <strong>
                  Total: ₹{selectedSeats.length * 180}
                </strong>
              </div>

              <button className="payment-btn">
                Continue to Payment
              </button>

            </div>
          )}

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature">
          <span>🎞️</span>
          <div>
            <h4>Latest Movies</h4>
            <p>Watch the latest blockbusters</p>
          </div>
        </div>

        <div className="feature">
          <span>💺</span>
          <div>
            <h4>Best Seats</h4>
            <p>Choose your favourite seats</p>
          </div>
        </div>

        <div className="feature">
          <span>🛡️</span>
          <div>
            <h4>Secure Booking</h4>
            <p>Safe and quick transactions</p>
          </div>
        </div>

        <div className="feature">
          <span>🎟️</span>
          <div>
            <h4>Instant Confirmation</h4>
            <p>Get confirmed tickets instantly</p>
          </div>
        </div>

      </section>

    </div>
  );
}

export default App;
