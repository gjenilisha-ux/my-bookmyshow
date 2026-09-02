import { useMemo, useState } from "react";
import "./App.css";

const movies = [
  {
    title: "Kantara",
    genre: "Adventure • Drama",
    image: `${import.meta.env.BASE_URL}kantara.jpg`,
  },
  {
    title: "Baahubali 2",
    genre: "Action • Fantasy",
    image: `${import.meta.env.BASE_URL}baahubali2.jpg`,
  },
  {
    title: "Pathu Thala",
    genre: "Action • Crime • Thriller",
    image: `${import.meta.env.BASE_URL}pathu%20thala.jpg`,
  },
];

const times = ["10:00 AM", "1:30 PM", "4:30 PM", "7:30 PM"];

const dates = [
  { day: "Today", date: "Sep 2" },
  { day: "Tomorrow", date: "Sep 3" },
  { day: "Friday", date: "Sep 4" },
  { day: "Saturday", date: "Sep 5" },
];

const seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"];

const bookedSeats = ["A3", "B2", "C4"];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(null);
  const [bookingStep, setBookingStep] = useState("booking");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const pricePerSeat = 180;

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const total = selectedSeats.length * pricePerSeat;

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const openBooking = (movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]);
    setSelectedDate(dates[0]);
    setSelectedTime(times[1]);
    setBookingStep("booking");
    setPaymentMethod("");
    setPaymentDone(false);
  };

  const closeBooking = () => {
    setSelectedMovie(null);
    setSelectedSeats([]);
    setBookingStep("booking");
    setPaymentMethod("");
    setPaymentDone(false);
  };

  const continueToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    setBookingStep("payment");
  };

  const completePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setPaymentDone(true);
    setBookingStep("success");
  };

  const toggleFavourite = (movieTitle) => {
    if (favourites.includes(movieTitle)) {
      setFavourites(favourites.filter((title) => title !== movieTitle));
    } else {
      setFavourites([...favourites, movieTitle]);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleLogin = () => {
    if (!loginName.trim()) {
      setLoginMessage("Please enter your name.");
      return;
    }

    setLoginMessage(`Welcome, ${loginName}!`);
  };

  const getFeatureContent = () => {
    if (featureOpen === "Latest Movies") {
      return {
        icon: "🎞️",
        title: "Latest Movies",
        text: "Discover the latest blockbusters and popular movies available on BookNow.",
      };
    }

    if (featureOpen === "Best Seats") {
      return {
        icon: "💺",
        title: "Best Seats",
        text: "Choose your favourite available seats and enjoy your movie comfortably.",
      };
    }

    if (featureOpen === "Secure Booking") {
      return {
        icon: "🛡️",
        title: "Secure Booking",
        text: "This demo provides a safe frontend booking experience without processing real payments.",
      };
    }

    if (featureOpen === "Instant Confirmation") {
      return {
        icon: "🎟️",
        title: "Instant Confirmation",
        text: "After the demo payment, your movie ticket is generated instantly.",
      };
    }

    return null;
  };

  const featureContent = getFeatureContent();

  return (
    <div className="app">

      {/* HEADER */}
      <header className="navbar">
        <div
          className="logo"
          onClick={() => scrollToSection("home")}
        >
          🎬 <span>BOOK</span><b>NOW</b>
        </div>

        <nav>
          <a
            className="active"
            onClick={() => scrollToSection("home")}
          >
            Home
          </a>

          <a onClick={() => scrollToSection("movies")}>
            Movies
          </a>

          <a onClick={() => scrollToSection("theatres")}>
            Theatres
          </a>
        </nav>

        <button
          className="login-btn"
          onClick={() => {
            setLoginOpen(true);
            setLoginMessage("");
          }}
        >
          Login
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">

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

          <button
            className="explore-btn"
            onClick={() => scrollToSection("movies")}
          >
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
      <section className="movies-section" id="movies">

        <div className="section-header">
          <div>
            <h2>Now Showing</h2>
            <p className="section-subtitle">
              Choose a movie and book your favourite seats
            </p>
          </div>

          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="view-all"
            onClick={() => setSearchTerm("")}
          >
            View All →
          </button>
        </div>

        <div className="movie-layout">

          <div className="movie-grid">

            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <div className="movie-card" key={index}>

                  <div className="poster">
                    <img
                      src={movie.image}
                      alt={movie.title}
                    />

                    <div className="poster-overlay"></div>

                    <button
                      className="heart"
                      onClick={() =>
                        toggleFavourite(movie.title)
                      }
                    >
                      {favourites.includes(movie.title)
                        ? "♥"
                        : "♡"}
                    </button>
                  </div>

                  <div className="movie-info">

                    <h3>{movie.title}</h3>

                    <p>{movie.genre}</p>

                    <button
                      className="book-btn"
                      onClick={() => openBooking(movie)}
                    >
                      Book Tickets
                    </button>

                  </div>

                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>🎬 No movies found</h3>
                <p>Try another movie name.</p>
              </div>
            )}

          </div>

          {/* BOOKING PANEL */}
          {selectedMovie && (
            <div className="booking-panel">

              <button
                className="close-btn"
                onClick={closeBooking}
              >
                ✕ Close
              </button>

              {bookingStep === "booking" && (
                <>
                  <h2>🎟️ Book Tickets</h2>

                  <div className="selected-movie-title">
                    <h3>{selectedMovie.title}</h3>
                    <p>{selectedMovie.genre}</p>
                  </div>

                  {/* DATE */}
                  <p className="booking-label">
                    Select your date
                  </p>

                  <div className="dates">
                    {dates.map((date) => (
                      <button
                        key={date.date}
                        className={
                          selectedDate.date === date.date
                            ? "date-btn selected-date"
                            : "date-btn"
                        }
                        onClick={() => setSelectedDate(date)}
                      >
                        <strong>{date.day}</strong>
                        <span>{date.date}</span>
                      </button>
                    ))}
                  </div>

                  {/* TIME */}
                  <p className="booking-label">
                    Select your show time
                  </p>

                  <div className="times">
                    {times.map((time) => (
                      <button
                        key={time}
                        className={
                          selectedTime === time
                            ? "selected-time"
                            : ""
                        }
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {/* SEATS */}
                  <p className="booking-label">
                    Select your seats
                  </p>

                  <div className="screen">
                    SCREEN
                  </div>

                  <div className="seat-container">

                    {["A", "B", "C", "D"].map((row) => (
                      <div
                        className="seat-row-book"
                        key={row}
                      >

                        <span className="row-name">
                          {row}
                        </span>

                        {[1, 2, 3, 4].map((num) => {
                          const seat = `${row}${num}`;
                          const isBooked =
                            bookedSeats.includes(seat);
                          const isSelected =
                            selectedSeats.includes(seat);

                          return (
                            <button
                              key={seat}
                              disabled={isBooked}
                              className={
                                isBooked
                                  ? "seat booked-seat"
                                  : isSelected
                                  ? "seat selected-seat"
                                  : "seat"
                              }
                              onClick={() =>
                                toggleSeat(seat)
                              }
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

                  <div className="booking-summary">
                    <div>
                      <span>
                        {selectedSeats.length} seat(s) selected
                      </span>

                      <small>
                        {selectedSeats.length > 0
                          ? selectedSeats.join(", ")
                          : "No seats selected"}
                      </small>
                    </div>

                    <strong>
                      Total: ₹{total}
                    </strong>
                  </div>

                  <button
                    className="payment-btn"
                    onClick={continueToPayment}
                  >
                    Continue to Payment →
                  </button>
                </>
              )}

              {/* PAYMENT */}
              {bookingStep === "payment" && (
                <div className="payment-screen">

                  <h2>💳 Payment</h2>

                  <p className="payment-movie">
                    {selectedMovie.title}
                  </p>

                  <div className="payment-details">
                    <p>
                      <span>Date</span>
                      <strong>
                        {selectedDate.day}, {selectedDate.date}
                      </strong>
                    </p>

                    <p>
                      <span>Show Time</span>
                      <strong>{selectedTime}</strong>
                    </p>

                    <p>
                      <span>Seats</span>
                      <strong>
                        {selectedSeats.join(", ")}
                      </strong>
                    </p>

                    <p className="payment-total">
                      <span>Total</span>
                      <strong>₹{total}</strong>
                    </p>
                  </div>

                  <p className="booking-label">
                    Select payment method
                  </p>

                  <div className="payment-methods">

                    <button
                      className={
                        paymentMethod === "UPI"
                          ? "payment-method active-payment"
                          : "payment-method"
                      }
                      onClick={() =>
                        setPaymentMethod("UPI")
                      }
                    >
                      📱
                      <span>UPI</span>
                    </button>

                    <button
                      className={
                        paymentMethod === "Card"
                          ? "payment-method active-payment"
                          : "payment-method"
                      }
                      onClick={() =>
                        setPaymentMethod("Card")
                      }
                    >
                      💳
                      <span>Card</span>
                    </button>

                    <button
                      className={
                        paymentMethod === "Cash"
                          ? "payment-method active-payment"
                          : "payment-method"
                      }
                      onClick={() =>
                        setPaymentMethod("Cash")
                      }
                    >
                      💵
                      <span>Cash</span>
                    </button>

                  </div>

                  <p className="demo-note">
                    🔒 Demo payment only — no real money
                    will be charged.
                  </p>

                  <div className="payment-actions">
                    <button
                      className="back-btn"
                      onClick={() =>
                        setBookingStep("booking")
                      }
                    >
                      ← Back
                    </button>

                    <button
                      className="pay-btn"
                      onClick={completePayment}
                    >
                      Pay ₹{total}
                    </button>
                  </div>

                </div>
              )}

              {/* SUCCESS */}
              {bookingStep === "success" && (
                <div className="success-screen">

                  <div className="success-icon">
                    ✓
                  </div>

                  <h2>Booking Confirmed!</h2>

                  <p className="success-text">
                    Your movie ticket has been booked
                    successfully.
                  </p>

                  <div className="ticket">

                    <div className="ticket-header">
                      <span>🎬 BOOKNOW</span>
                      <span>CONFIRMED</span>
                    </div>

                    <h3>{selectedMovie.title}</h3>

                    <div className="ticket-info">

                      <div>
                        <span>Date</span>
                        <strong>
                          {selectedDate.day}, {selectedDate.date}
                        </strong>
                      </div>

                      <div>
                        <span>Time</span>
                        <strong>{selectedTime}</strong>
                      </div>

                      <div>
                        <span>Seats</span>
                        <strong>
                          {selectedSeats.join(", ")}
                        </strong>
                      </div>

                      <div>
                        <span>Amount</span>
                        <strong>₹{total}</strong>
                      </div>

                    </div>

                    <div className="booking-id">
                      Booking ID: BN
                      {Math.floor(
                        100000 + Math.random() * 900000
                      )}
                    </div>

                  </div>

                  <button
                    className="done-btn"
                    onClick={closeBooking}
                  >
                    Done ✓
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* THEATRES */}
      <section className="theatres-section" id="theatres">

        <div className="theatre-heading">
          <p className="small-title">OUR THEATRES</p>
          <h2>Find your favourite cinema</h2>
          <p>
            Enjoy movies on the big screen with comfortable
            seats and a great atmosphere.
          </p>
        </div>

        <div className="theatre-grid">

          <div className="theatre-card">
            <span>🎭</span>
            <h3>BookNow Cinemas</h3>
            <p>Premium screens with comfortable seating.</p>
            <button
              onClick={() =>
                alert("BookNow Cinemas selected!")
              }
            >
              View Theatre
            </button>
          </div>

          <div className="theatre-card">
            <span>🍿</span>
            <h3>Grand Cinema</h3>
            <p>Enjoy movies with your friends and family.</p>
            <button
              onClick={() =>
                alert("Grand Cinema selected!")
              }
            >
              View Theatre
            </button>
          </div>

          <div className="theatre-card">
            <span>⭐</span>
            <h3>Premium Screens</h3>
            <p>Experience movies with premium facilities.</p>
            <button
              onClick={() =>
                alert("Premium Screens selected!")
              }
            >
              View Theatre
            </button>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <button
          className="feature"
          onClick={() => setFeatureOpen("Latest Movies")}
        >
          <span>🎞️</span>
          <div>
            <h4>Latest Movies</h4>
            <p>Watch the latest blockbusters</p>
          </div>
        </button>

        <button
          className="feature"
          onClick={() => setFeatureOpen("Best Seats")}
        >
          <span>💺</span>
          <div>
            <h4>Best Seats</h4>
            <p>Choose your favourite seats</p>
          </div>
        </button>

        <button
          className="feature"
          onClick={() => setFeatureOpen("Secure Booking")}
        >
          <span>🛡️</span>
          <div>
            <h4>Secure Booking</h4>
            <p>Safe and quick transactions</p>
          </div>
        </button>

        <button
          className="feature"
          onClick={() =>
            setFeatureOpen("Instant Confirmation")
          }
        >
          <span>🎟️</span>
          <div>
            <h4>Instant Confirmation</h4>
            <p>Get confirmed tickets instantly</p>
          </div>
        </button>

      </section>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="modal-background">

          <div className="modal">

            <button
              className="modal-close"
              onClick={() => setLoginOpen(false)}
            >
              ✕
            </button>

            <div className="modal-icon">🔐</div>

            <h2>Welcome to BookNow</h2>

            <p>
              This is a demo login. No real account is
              created.
            </p>

            <input
              className="login-input"
              type="text"
              placeholder="Enter your name"
              value={loginName}
              onChange={(e) =>
                setLoginName(e.target.value)
              }
            />

            <button
              className="login-submit"
              onClick={handleLogin}
            >
              Continue
            </button>

            {loginMessage && (
              <p className="login-message">
                {loginMessage}
              </p>
            )}

          </div>

        </div>
      )}

      {/* FEATURE MODAL */}
      {featureOpen && featureContent && (
        <div className="modal-background">

          <div className="modal feature-modal">

            <button
              className="modal-close"
              onClick={() => setFeatureOpen(null)}
            >
              ✕
            </button>

            <div className="modal-icon">
              {featureContent.icon}
            </div>

            <h2>{featureContent.title}</h2>

            <p>{featureContent.text}</p>

            <button
              className="login-submit"
              onClick={() => setFeatureOpen(null)}
            >
              Got it ✓
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
