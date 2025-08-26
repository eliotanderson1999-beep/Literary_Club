import React from "react";

const Home = () => {
  const scrollToForm = () => {
    const element = document.getElementById("form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const floatingBooks = [
    { icon: "fas fa-book", className: "book1" },
    { icon: "fas fa-book-open", className: "book2" },
    { icon: "fas fa-journal-whills", className: "book3" },
    { icon: "fas fa-bookmark", className: "book4" },
  ];

  const quotes = [
    {
      text: "Books are a uniquely portable magic.",
      author: "Stephen King",
      className: "quote1",
    },
    {
      text: "A reader lives a thousand lives.",
      author: "George R.R. Martin",
      className: "quote2",
    },
    {
      text: "Words are, of course, the most powerful drug used by mankind.",
      author: "Rudyard Kipling",
      className: "quote3",
    },
  ];

  return (
    <section id="home" className="home">
      <div className="container">
        <div className="home-content">
          <div className="club-intro">
            <div className="club-logo">
              <i className="fas fa-feather-alt"></i>
            </div>
            <h1>Welcome to Our Literary Club</h1>
            <p className="intro-text">
              Where words come alive and imagination knows no bounds
            </p>
            <button onClick={scrollToForm} className="cta-button">
              Join Our Community
            </button>
          </div>
        </div>
      </div>

      {/* Floating Books */}
      <div className="floating-books">
        {floatingBooks.map((book, index) => (
          <i key={index} className={`${book.icon} ${book.className}`}></i>
        ))}
      </div>

      {/* Quotes */}
      <div className="floating-quotes">
        {quotes.map((quote, index) => (
          <div key={index} className={`quote ${quote.className}`}>
            "{quote.text}" - {quote.author}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
