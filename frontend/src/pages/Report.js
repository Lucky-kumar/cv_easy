import React from 'react'
import Sidebar from './../components/Sidebar';
import Box from '@mui/material/Box';
import { Avatar, Button, Typography, Stack, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import useFetch from './../hooks/UseFetch';
import { jsPDF } from "jspdf";
import Loader from '../components/Loader';



const Report = () => {
  const { user } = useContext(AuthContext)


  const UserInfo = useFetch(`http://localhost:8800/api/users/${user.id}`);

  const SkillsInfo = useFetch(`http://localhost:8800/api/users/skills/${user.id}`);

  const ProjectsInfo = useFetch(`http://localhost:8800/api/users/projects/${user.id}`);


  if (UserInfo.loading || SkillsInfo.loading || ProjectsInfo.loading) {
    return <Loader/>
  }

  if (UserInfo.error) {
    console.log(UserInfo.error);
  }

  if (SkillsInfo.error) {
    console.log(SkillsInfo.error);
  }

  if (ProjectsInfo.error) {
    console.log(ProjectsInfo.error);
  }

  let sdy = 250;
  let sdx = 100;


  const pdfGenerate = () => {
    const doc = new jsPDF('portrait', 'px', 'a4', 'false');
    doc.setFont('Helevertica', 'bold')
    doc.text(60, 60, "Name");
    doc.text(60, 80, "Email");
    doc.text(60, 100, "Contact Number");
    doc.text(60, 120, "Address");
    doc.text(60, 140, "Description");
    doc.text(160, 200, "Skills");

    doc.setFont('Helevertica', 'Normal')
    doc.text(100, 60, `: ${UserInfo.data.name}`);
    doc.text(100, 80, `: ${UserInfo.data.email}`);
    doc.text(150, 100, `: ${UserInfo.data.phone}`);
    doc.text(130, 120, `: ${UserInfo.data.city}, ${UserInfo.data.state}, ${UserInfo.data.country}`);
    doc.text(130, 140, `: ${UserInfo.data.description}`);

    doc.setFont('Helevertica', 'italic')


    SkillsInfo.data.map((skill) => {
      doc.text(60, sdy, `Name: ${skill.name}, Rating: ${skill.rating}`);
      sdy += 20;
    });

    doc.addPage();

    sdy = 60;

    doc.setFont('Helevertica', 'bold')
    doc.text(160, sdy, "Projects");
    sdy += 40;

    ProjectsInfo.data.map((project) => {

      doc.setFont('Helevertica', 'Normal')
      doc.text(60, sdy, `Name : ${project.name}`);
      sdy += 20;
      doc.text(60, sdy, `Description : ${project.description}`);
      sdy += 20;

      doc.text(60, sdy, `Skills : `);
      project.skills.map((projectSkill) => {
        doc.text(sdx, sdy, `${projectSkill}`);
        sdx +=50;
      })
      sdx =100;
      sdy += 40;
    });

    doc.save(`${UserInfo.data.name}'s Resume.pdf`);

  }

  return (
    <div className="container">
      <Sidebar />
      <div className='box'>
        <Box sx={{ margin: 5 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant='h4'>My Report</Typography>
            <Stack direction="row" spacing={3}>
              <Button variant="outlined" sx={{ width: 300 }} startIcon={<ShareIcon />}>
                Share Report
              </Button>
              <Button variant="contained" sx={{ width: 300 }} onClick={pdfGenerate} startIcon={<DownloadIcon />}>
                Download Report
              </Button>
            </Stack>
          </Stack>

          <><Box direction="row" marginTop={10}>

            <Stack direction="row" spacing={4}>
              <div>

                <Avatar
                  sx={{ width: 150, height: 150, marginLeft: 6, marginTop: 4 }}
                  src={UserInfo.data.image}
                >
                </Avatar>
              </div>
              <div>
                <Typography variant='h3' padding={3}>
                  {UserInfo.data.name}
                </Typography>
                <Typography variant='h5' paddingLeft={3}>
                  {UserInfo.data.city ? UserInfo.data.city : "City"}, {UserInfo.data.state ? UserInfo.data.state : "State"}, {UserInfo.data.country ? UserInfo.data.country : "Country"}
                </Typography>
                <Stack direction="row" spacing={6} marginTop={3}>
                  <Typography variant='h5' paddingLeft={3}>
                    {UserInfo.data.email}
                  </Typography>
                  <Typography variant='h5' paddingLeft={3}>
                    {UserInfo.data.phone}
                  </Typography>
                </Stack>
              </div>
            </Stack>
          </Box><Typography variant='h4' margin={6} marginBottom={3}>
              About Me
            </Typography><Container sx={{ marginLeft: 5, width: 800, padding: 2, backgroundColor: "#FFF9CA", height: 160, borderRadius: 5 }}>
              <Typography>
                {UserInfo.data.description}
              </Typography>
            </Container></>

          <Typography variant='h4' margin={6} marginBottom={3}>
            Skills
          </Typography>
          <Box sx={{ marginLeft: 5 }}>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {SkillsInfo.data.map((skill) => (
                <Grid key={skill._id} item xs={6}>
                  <Container sx={{ backgroundColor: "#FFF9CA", height: 110, borderRadius: 10, padding: 3, textAlign: "left" }}>
                    <Typography variant="h5" color="initial" sx={{ marginBottom: 1 }}>{skill.name}</Typography>
                    <Rating name="read-only" value={skill.rating} readOnly />
                  </Container>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Typography variant='h4' margin={6} marginBottom={3}>
            Projects
          </Typography>

          {ProjectsInfo.data.map((project) => (
            <Box margin={10} bgcolor="#FFF9CA" padding={4} borderRadius={6}>
              <Typography variant="h4" color="initial">{project.name}</Typography>
              <Typography variant="h6" marginTop={3} marginBottom={4}>{project.description}</Typography>


              <Stack direction="row" spacing={1}>
                {project.skills.map((projectSkill) => (
                  <Chip label={projectSkill} color="primary" />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </div>
    </div>
  )
}

export default Report