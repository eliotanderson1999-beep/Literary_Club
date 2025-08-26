import React from "react";

const About = () => {
  const activities = [
    {
      icon: "fas fa-pen-fancy",
      title: "Creative Writing Workshops",
      description:
        "Regular sessions to hone your writing skills across various genres",
    },
    {
      icon: "fas fa-book-reader",
      title: "Book Discussions",
      description:
        "Monthly book club meetings to discuss contemporary and classic literature",
    },
    {
      icon: "fas fa-microphone",
      title: "Poetry Recitals",
      description: "Open mic nights for sharing original poetry and prose",
    },
    {
      icon: "fas fa-theater-masks",
      title: "Literary Events",
      description:
        "Organizing drama performances, storytelling sessions, and author meets",
    },
  ];

  const rules = [
    {
      icon: "fas fa-star",
      title: "Be Original and Real",
      description: "Authenticity is the foundation of great literature",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Don't Be a Yes Man",
      description: "Critical thinking and honest opinions foster growth",
    },
    {
      icon: "fas fa-handshake",
      title: "Accept Different Viewpoints",
      description: "Diversity of thought enriches our discussions",
    },
    {
      icon: "fas fa-heart",
      title: "Act from the Heart",
      description: "Make decisions based on passion, not fear or insecurity",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Our Literary Club</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Our Literary Club is a vibrant community of passionate readers,
              writers, and literature enthusiasts. We believe in the
              transformative power of words and the magic that happens when
              creative minds come together.
            </p>

            <h3>What We Do</h3>
            <div className="activities">
              {activities.map((activity, index) => (
                <div key={index} className="activity">
                  <i className={activity.icon}></i>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                </div>
              ))}
            </div>

            <div className="rules-section">
              <h3>Our Rules & Norms</h3>
              <div className="rules-grid">
                {rules.map((rule, index) => (
                  <div key={index} className="rule">
                    <i className={rule.icon}></i>
                    <h4>{rule.title}</h4>
                    <p>{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
