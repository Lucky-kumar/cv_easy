import React, { useState } from 'react'
import Sidebar from './../components/Sidebar';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container, Button, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
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
  width: 600,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Projects = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchValue, setSearchValue] = useState("");

  let snames = [];
  let skillsName = []

  const { user } = useContext(AuthContext)

  const skills = useFetch(`http://localhost:8800/api/users/skills/${user.id}`)


  skills.data.forEach((item) => {
    const sname = {
      title: item.name,
    }
    skillsName.push(sname)
  })


  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/users/projects/${user.id}`)

  const projectnames = []

  data.map((project) => {
    projectnames.push(project.name);
  })

  const addProject = async (e) => {
    e.preventDefault();
    handleClose();

    const updatedForm = new FormData(e.target);
    let newProject = Object.fromEntries(updatedForm.entries())

    newProject.skills = snames;


    try {
      await axios.post(`http://localhost:8800/api/projects/${user.id}`, newProject);
    }
    catch (error) {
      console.log(error);
    }

    reFetch();
  }



  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const check = (values) => {
    values.forEach(value => {
      snames.push(value.title);
      snames = snames.filter(onlyUnique)

    })
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
      <div className='box'>
        <Stack direction="row" margin={5} >
          <Container sx={{ width: 700 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={projectnames.map((option) => option)}
              onChange={(event, value) => setSearchValue(value)}
              renderInput={(params) => <TextField {...params}
                label="Search Projects"
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
          <Container sx={{ width: 250 }}>
            <Button variant="contained" onClick={handleOpen}>+ Add a Project</Button>
          </Container>
        </Stack>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={addProject} >

            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Add a New Project
              </Typography>
              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 4 }}>
                Project Title
              </Typography>
              <Box sx={{ width: 400, mt: 2 }}>
                <TextField name="name" id="outlined-basic" label="Enter Your Project Title" variant="outlined" fullWidth />
              </Box>

              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 4 }}>
                Project Description
              </Typography>
              <Box sx={{ width: 400, mt: 2 }}>
                <TextField name="description" id="outlined-basic" label="Enter Your Project Description" variant="outlined" fullWidth />
              </Box>

              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 4, mb: 2 }}>
                Add Project Skills
              </Typography>
              <Box>

                <Autocomplete
                  name="skis"
                  multiple
                  id="tags-outlined"
                  options={skillsName}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onChange={(event, value) => check(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add Projects"
                    />
                  )}
                />
              </Box>

              <Container sx={{ width: 200, mt: 5 }}>
                <Button variant="contained" type='submit' >Add Project</Button>
              </Container>

            </Box>
          </form>
        </Modal>

        {data.map((project) => (
          <>
            {
              project.name === searchValue

                ?
                <>
                  <Box margin={10} bgcolor="#FFF9CA" padding={4} borderRadius={6} >
                    <Typography variant="h4" color="initial">{project.name}</Typography>
                    <Typography variant="h6" marginTop={3} marginBottom={4}>{project.description}</Typography>
                    <Stack direction="row" spacing={1}>
                      {project.skills.map((projectSkill) => (
                        <Chip label={projectSkill} color="primary" />
                      ))}
                    </Stack>
                  </Box>
                </>
                :
                <>
                  {!searchValue &&
                    <Box margin={10} bgcolor="#FFF9CA" padding={4} borderRadius={6} >
                      <Typography variant="h4" color="initial">{project.name}</Typography>
                      <Typography variant="h6" marginTop={3} marginBottom={4}>{project.description}</Typography>
                      <Stack direction="row" spacing={1}>
                        {project.skills.map((projectSkill) => (
                          <Chip label={projectSkill} color="primary" />
                        ))}
                      </Stack>
                    </Box>
                  }
                </>
            }
          </>
        ))}

      </div>
    </div >
  )
}

export default Projects