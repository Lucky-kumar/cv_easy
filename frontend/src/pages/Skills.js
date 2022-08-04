import React, { useState } from 'react'
import Sidebar from './../components/Sidebar';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container, Button, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import { AuthContext } from './../context/AuthContext';
import useFetch from './../hooks/UseFetch';
import axios from 'axios';
import { useContext } from 'react';
import Loader from '../components/Loader';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Skills = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(2);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchValue, setSearchValue] = useState("");

  console.log(searchValue);


  const { user } = useContext(AuthContext)


  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/users/skills/${user.id}`)


  const skillnames = []

  data.map((skill) => {
    skillnames.push(skill.name);
  })

  const addSkill = async (e) => {
    e.preventDefault();
    handleClose();

    const updatedForm = new FormData(e.target);
    const newSkill = Object.fromEntries(updatedForm.entries())

    try {
      await axios.post(`http://localhost:8800/api/skills/${user.id}`, newSkill);
    }
    catch (error) {
      console.log(error);
    }

    reFetch();

  }


  if (loading) {
    return <Loader/>
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container">
      <Sidebar />
      <div className='box' >
        <Stack direction="row" margin={5} >
          <Container sx={{ width: 700 }}>
            <Autocomplete
              id="skills"
              freeSolo
              options={skillnames.map((option) => option)}
              onChange={(event, value) => setSearchValue(value)}
              renderInput={(params) => <TextField {...params}
                label="Search Skills"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (<InputAdornment position="start"> <SearchIcon />
                  </InputAdornment>),
                  disableUnderline: true
                }}
              />}
            >
            </Autocomplete>
          </Container>
          <Container sx={{ width: 200 }}>
            <Button variant="contained" id="skill-btn" onClick={handleOpen}>+ Add a Skill</Button>
          </Container>
        </Stack>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          id="skill-modal"
        >
          <form onSubmit={addSkill}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add a New Skill
              </Typography>
              <Typography id="modal-modal-description" variant="h5" sx={{ mt: 4 }}>
                Skill
              </Typography>
              <Box sx={{ width: 400, mt: 2 }}>
                <TextField name="name" id="skill" label="Enter Your Skill" variant="outlined" fullWidth />
              </Box>
              <Typography id="modal-modal-description" variant="h5" sx={{ mt: 4, mb: 3 }}>
                How would you rate yourself?
              </Typography>
              <Rating
                id="simple-controlled"
                name="rating"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <Container sx={{ width: 200, mt: 5 }}>
                <Button variant="contained" id="save-btn" type="submit">Add Skill</Button>
              </Container>
            </Box>
          </form>
        </Modal>

        <Box margin={10}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {data.map((skill) => (
              <>
                {skill.name === searchValue
                  ?
                  <>
                    <Grid key={skill._id} item xs={6}>
                      <Container sx={{ backgroundColor: "#FFF9CA", height: 110, borderRadius: 10, padding: 3, textAlign: "left" }}>
                        <Typography variant="h5" color="initial" sx={{ marginBottom: 1 }}>{skill.name}</Typography>
                        <Rating name="read-only" value={skill.rating} readOnly />
                      </Container>
                    </Grid>
                  </>

                  :
                  <>
                    {!searchValue &&
                      <>
                        <Grid key={skill._id} item xs={6}>
                          <Container sx={{ backgroundColor: "#FFF9CA", height: 110, borderRadius: 10, padding: 3, textAlign: "left" }}>
                            <Typography variant="h5" color="initial" sx={{ marginBottom: 1 }}>{skill.name}</Typography>
                            <Rating name="read-only" value={skill.rating} readOnly />
                          </Container>
                        </Grid>
                      </>
                    }
                  </>
                }
              </>
            ))}
          </Grid>
        </Box>
      </div>
    </div >
  )
}

export default Skills