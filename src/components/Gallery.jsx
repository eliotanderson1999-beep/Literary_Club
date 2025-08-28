import React from "react";
import techfestImg from "../assets/techfest.jpg";
import groupImg from "../assets/group.jpg";
import BoardImg from "../assets/Board.jpg";
import partyImg from "../assets/group2.jpg";
import seniorImg from "../assets/seniors.jpg";
import alumniImg from "../assets/alumni.jpg";

const Gallery = () => {
  const galleryItems = [
    { title: "TechFest 2024", image: techfestImg },
    { title: "Group Work", image: groupImg },
    { title: "Club Activities", image: BoardImg },
    { title: "Group Hangout", image: partyImg },
    { title: "Our Seniors", image: seniorImg },
    { title: "Our Alumni", image: alumniImg },
    /*{ title: "Author Meet & Greet", image: null },
    { title: "Drama Performance", image: null },
    { title: "Literary Festival", image: null },*/
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2>Our Literary Journey</h2>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-item">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="gallery-placeholder"
                style={{ display: item.image ? "none" : "flex" }}
              >
                <i className="fas fa-image"></i>
              </div>
              <div className="gallery-overlay">
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

