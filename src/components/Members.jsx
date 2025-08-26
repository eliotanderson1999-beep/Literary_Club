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

const Members = () => {
  const members = [
    {
      name: "Adrija Debnath, PG-FET",
      description:
        "We read and write poetry because we are members of the human race and the human race is filled with passion.",
      image: adrijaImg,
    },
    {
      name: "Antash Kumar jha",
      description:
        "“It's only after we've lost everything that we're free to do anything.”",
      image: selfImg,
    },
    {
      name: "Samar Verma ",
      description: "Whatever happens, happens for the best.",
      image: samarImg,
    },
    {
      name: "Himanshu Kumar",
      description: "अंतः अस्ति प्रारंभः",
      image: himanshuImg,
    },
    {
      name: "Priyanshu Gandhi",
      description:
        "“Where passion meets hard work, and creativity meets confidence—I travel, write, innovate, and inspire.”",
      image: gandhiImg,
    },
    {
      name: "Nishtha",
      description: "..",
      image: NishthaImg,
    },
    {
      name: "ARPIT GARG",
      description:
        "“Poetry isn’t on paper, it’s in people—come share yours with us.”",
      image: ArpitImg,
    },
    {
      name: "Stuti Rani GCT'24 (Department of Chemical Engineering)",
      description:
        "The only person you are destined to become is the person you decide to be.",
      image: stutiImg,
    },
    {
      name: "Avik Chhoker",
      description:
        "The only person you are destined to become is the person you decide to be.",
      image: avikImg,
    },
    {
      name: "Rahul Kumar",
      description: "“Be the best version of yourself”",
      image: rahulImg,
    },
    {
      name: "Disha",
      description:
        "“Choosing books cause it gives my calmness a longer shelf life”",
      image: dishaImg,
    },
    {
      name: "Prashant Tiwari",
      description:
        "मंज़िल मिल ही जाएगी भटकते-भटकते,गुमराह तो वो हैं जो घर से निकले ही नहीं।",
      image: loduImg,
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
                style={{ width: "150px", height: "150px", borderRadius: "0%" }}
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
