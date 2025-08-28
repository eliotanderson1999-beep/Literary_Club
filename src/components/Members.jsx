import React from "react";
import adrijaImg from "../assets/adrija mam.jpg";
import selfImg from "../assets/self.jpg";
import samarImg from "../assets/samar.jpg";
import himanshuImg from "../assets/Himanshu_Kumar.jpg";
import gandhiImg from "../assets/gandhi.jpg";
import NishthaImg from "../assets/Nishita_Mam.jpg";
import ArpitImg from "../assets/Arpit.jpg";
import stutiImg from "../assets/stuti.jpg";
import dishaImg from "../assets/disha.jpg";
import rahulImg from "../assets/Rahul.jpg";
import avikImg from "../assets/avik.jpg";
import loduImg from "../assets/prasant.jpg";
import avishiImg from "../assets/avishiMam.jpg";
import ashishImg from "../assets/AshishOjha.jpg";
import priyanshuImg from "../assets/priyanshu.jpg";

const Members = () => {
  const members = [
    {
      name: "Adrija Debnath (PG-FET)",
      description:
        "We read and write poetry because we are members of the human race and the human race is filled with passion.",
      image: adrijaImg,
    },
    {
      name: "Disha (PG-FET)",
      description:
        "“Choosing books cause it gives my calmness a longer shelf life”",
      image: dishaImg,
    },
    {
      name: "Avishi kala (PG-FET)",
      description:
        "Between the lines of my stories, I hope you find pieces of yourself",
      image: avishiImg,
    },
    {
      name: "Ashish Ojha (GIN)",
      description: "Growth begins when you stay grounded.",
      image: ashishImg,
    },
    {
      name: "Antash Kumar jha (GCS'24)",
      description:
        "“It's only after we've lost everything that we're free to do anything.”",
      image: selfImg,
    },
    {
      name: "Samar Verma (GEE'24)",
      description: "Whatever happens, happens for the best.",
      image: samarImg,
    },
    {
      name: "Himanshu Kumar (GEE'24)",
      description: "अंतः अस्ति प्रारंभः",
      image: himanshuImg,
    },
    {
      name: "Priyanshu Gandhi (GIN'24)",
      description:
        "“Where passion meets hard work, and creativity meets confidence—I travel, write, innovate, and inspire.”",
      image: gandhiImg,
    },
    {
      name: "Nishtha (GCT'23)",
      description:
        "In every page I turn, I seek not stories, but wisdom worth keeping.",
      image: NishthaImg,
    },
    {
      name: "Stuti Rani (GCT'24)",
      description:
        "The only person you are destined to become is the person you decide to be.",
      image: stutiImg,
    },
    {
      name: "Avik Chhoker (GEE'24)",
      description: "Strong roots don’t fear the changing winds.",
      image: avikImg,
    },
    {
      name: "Rahul Kumar (GEE'24)",
      description: "“Be the best version of yourself”",
      image: rahulImg,
    },
    {
      name: "Prashant Tiwari (GEE'24)",
      description:
        "मंज़िल मिल ही जाएगी भटकते-भटकते,गुमराह तो वो हैं जो घर से निकले ही नहीं।",
      image: loduImg,
    },
    {
      name: "Priyanshu (GEE'24)",
      description:
        "Little things aren’t little, they’re the ones that make life big.",
      image: priyanshuImg,
    },
    {
      name: "Arpit Garg (Cff'24)",
      description:
        "“Poetry isn’t on paper, it’s in people—come share yours with us.”",
      image: ArpitImg,
    },
  ];

  return (
    <section id="members" className="members">
      <div className="container">
        <h2>Our Literary Family</h2>
        <div className="members-grid">
          {members.map((member, index) => (
            <div key={index} className="member">
              <img
                src={member.image}
                alt={member.name}
                className="member-img"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "0%",
                  objectFit: "cover",
                }}
              />
              <h4>{member.name}</h4>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Members;
