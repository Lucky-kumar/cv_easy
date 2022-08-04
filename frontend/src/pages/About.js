import React from 'react'
import Sidebar from '../components/Sidebar'
import './styles/About.css'
import Box from '@mui/material/Box';
import { Avatar, IconButton, Stack, TextField, Typography, Container, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import useFetch from './../hooks/UseFetch';
import axios from 'axios';
import Loader from '../components/Loader';

const About = () => {

  const [file, setFile] = useState("");

  const [editMode, setEditMode] = useState(false);

  const { user } = useContext(AuthContext)

  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/users/${user.id}`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")

    setEditMode(false)
    const img_data = new FormData();
    img_data.append("file", file);
    img_data.append("upload_preset", "upload");

    const updatedForm = new FormData(e.target);
    const updatedAbout = Object.fromEntries(updatedForm.entries())

    try {

      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/luckycloud/image/upload",
          img_data
        );

        const { url } = uploadRes.data;

        const newImg = {
          image: url,
        };

        await axios.put(`http://localhost:8800/api/users/${user.id}`, newImg);
      }
      await axios.put(`http://localhost:8800/api/users/${user.id}`, updatedAbout);
    } catch (err) {
      console.log(err);
    }
    reFetch();
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    console.log(error);
  }


  return (
    <div className="container">
      <Sidebar />
      <div className='box'>
        <>
          {editMode ?
            <>
              <form onSubmit={handleSubmit}>

                <Box sx={{ margin: 3 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={4}>
                      <div>

                        <Avatar
                          sx={{ width: 150, height: 150, marginLeft: 6 }}
                          src={
                            file
                            && URL.createObjectURL(file)
                          }
                        >
                        </Avatar>
                        <Container sx={{ marginLeft: 6, marginTop: 3 }} >
                          <Button variant="contained" component="label" >
                            Upload
                            <input hidden
                              accept="image/*"
                              multiple
                              type="file"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                          </Button>
                        </Container>
                      </div>

                      <div>
                        <Box sx={{ marginLeft: 3, marginBottom: 5, marginTop: 5 }}>
                          <TextField name='name' id="name" label="Enter Your Name" variant="outlined" fullWidth defaultValue={data.name} />
                        </Box>

                        <Stack direction="row" justifyContent="space-between">
                          <Box sx={{ marginLeft: 3, width: 150 }}>
                            <TextField name='city' id="city" label="City" variant="outlined" defaultValue={data.city} />
                          </Box>

                          <Box sx={{ marginLeft: 3, width: 150 }}>
                            <TextField name='state' id="state" label="State" variant="outlined" defaultValue={data.state} />
                          </Box>

                          <Box sx={{ marginLeft: 3, width: 150 }}>
                            <TextField name="country" id="country" label="Country" variant="outlined" defaultValue={data.country} />
                          </Box>
                        </Stack>
                      </div>
                    </Stack>
                    <IconButton sx={{ width: 50, height: 50, margin: 5 }} onClick={() => setEditMode(!editMode)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>

                  <Typography variant='h5' margin={6} marginBottom={3}>
                    Email Address
                  </Typography>
                  <Container sx={{ marginLeft: 3, width: 800 }}>
                    <TextField name='email' id="email" label="Email Address" variant="outlined" fullWidth defaultValue={data.email} />
                  </Container>

                  <Typography variant='h5' margin={6} marginBottom={3}>
                    Contact Number
                  </Typography>
                  <Container sx={{ marginLeft: 3, width: 800 }}>
                    <TextField name="phone" id="contact" label="Contact Number" variant="outlined" fullWidth defaultValue={data.phone} />
                  </Container>

                  <Typography variant='h5' margin={6} marginBottom={3}>
                    About Me
                  </Typography>
                  <Container sx={{ marginLeft: 3, width: 800 }}>
                    <TextField name="description" id="about" label="About Me" fullWidth multiline
                      rows={4}
                      defaultValue={data.description}
                    />
                  </Container>
                </Box>

                <Container sx={{ marginLeft: 50, width: 150 }} >
                  <Button variant="contained" id="save-btn" type='submit' >Save</Button>
                </Container>
              </form>
            </>

            :

            <>
              <Box sx={{ margin: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={4}>
                    <div>

                      <Avatar
                        sx={{ width: 150, height: 150, marginLeft: 6 }}
                        src={data.image}
                      >
                      </Avatar>
                    </div>
                    <div>
                      <Typography variant='h3' padding={3} id="name">
                        {data.name ? data.name : "Name"}
                      </Typography>
                      <Typography variant='h5' paddingLeft={3} >
                        {data.city ? data.city : "City"},  {data.state ? data.state : "State"}, {data.country ? data.country : "Country"}
                      </Typography>
                    </div>
                  </Stack>
                  <IconButton sx={{ width: 50, height: 50, margin: 5 }} onClick={() => setEditMode(!editMode)}>
                    <EditIcon />
                  </IconButton>
                </Stack>

                <Typography variant='h5' margin={6} marginBottom={3}>
                  Email Address
                </Typography>
                <Container sx={{ marginLeft: 5, width: 800, padding: 2, backgroundColor: "#FFF9CA", height: 60, borderRadius: 5 }}>
                  <Typography id="email">
                    {data.email}
                  </Typography>
                </Container>

                <Typography variant='h5' margin={6} marginBottom={3} mar>
                  Contact Number
                </Typography>
                <Container sx={{ marginLeft: 5, width: 800, padding: 2, backgroundColor: "#FFF9CA", height: 60, borderRadius: 5 }}>
                  <Typography>
                    {data.phone}
                  </Typography>
                </Container>

                <Typography variant='h5' margin={6} marginBottom={3}>
                  About Me
                </Typography>
                <Container sx={{ marginLeft: 5, width: 800, padding: 2, backgroundColor: "#FFF9CA", height: 160, borderRadius: 5 }}>
                  <Typography>
                    {data.description}
                  </Typography>
                </Container>
              </Box>
            </>
          }
        </>
      </div>
    </div >
  )
}

export default About