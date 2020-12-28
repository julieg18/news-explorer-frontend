import React from 'react';
import authorImg from '../../images/author.jpg';
import './About.css';

function About() {
  return (
    <section className="about">
      <img
        className="about__img"
        src={authorImg}
        alt="A woman standing crosslegged in a grassy area"
      />
      <h2 className="about__title">About the author</h2>
      <p className="about__text">
        My name is Julie Galvan and I'm a front-end developer. While I focus on
        front-end development, I also know basic back-end and can make a NodeJS
        API from scratch. I have experience in building websites with Vanilla JS
        and JS frameworks like React.
      </p>
    </section>
  );
}

export default About;
