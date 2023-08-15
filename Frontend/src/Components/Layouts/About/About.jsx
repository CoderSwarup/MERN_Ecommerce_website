import React from "react";
import {
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

import "./About.css"; // Import your custom CSS file
import Logo from "../../../assets/Imges/profile.png"; // Import your logo image

const skills = [
  { skill: "HTML", progress: 90 },
  { skill: "CSS", progress: 85 },
  { skill: "JavaScript", progress: 80 },
  { skill: "React", progress: 85 },
  { skill: "Node", progress: 75 },
  { skill: "MongoDD", progress: 65 },
  { skill: "MySql", progress: 70 },
  // Add more skills
];

export default function About() {
  return (
    <div className="about-root">
      <Container>
        <Paper elevation={3} className="about-paper">
          <div className="about-logo">
            <img src={Logo} alt="Your Logo" className="logo-image" />
          </div>
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1">
            I am <b>Swarup Bhise</b>, a full-stack web developer passionate
            about coding and web development. I have experience with HTML, CSS,
            JavaScript, React, Node.js, Express.js, MongoDB, SQL, Bootstrap, C,
            C++, and Python. For Any Query Please Contact Me
          </Typography>

          <div className="about-form">
            <Typography variant="h5" gutterBottom>
              Get in touch
            </Typography>
            <Grid container justify="center">
              <IconButton href="https://github.com/CoderSwarup">
                <GitHubIcon className="about-icon" />
              </IconButton>
              <IconButton href="https://api.whatsapp.com/send?phone=8308657425">
                <WhatsAppIcon className="about-icon" />
              </IconButton>
              <IconButton href="https://www.instagram.com/swarup_bhise999">
                <InstagramIcon className="about-icon" />
              </IconButton>
              <IconButton href="mailto:swarupbhise12345678912@gmail.com">
                <EmailIcon className="about-icon" />
              </IconButton>
            </Grid>
          </div>

          <div className="skills">
            <Typography variant="h5" gutterBottom>
              Skills
            </Typography>
            {skills.map((skill, index) => (
              <div key={index} className="skill">
                <Typography variant="body1" className="skill-name">
                  {skill.skill}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={skill.progress}
                  className="skill-progress"
                />
              </div>
            ))}
          </div>
        </Paper>
      </Container>
    </div>
  );
}
