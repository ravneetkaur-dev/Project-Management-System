import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectForm';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projectApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createProject(formData);
      setShowModal(false);
      fetchProjects();
    } catch (err) {}
  };

  const handleUpdate = async (formData) => {
    try {
      await updateProject(formData);
      setShowModal(false);
      setEditData(null);
      fetchProjects();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {}
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Projects</h3>
        <Button onClick={() => setShowModal(true)}>Create Project</Button>
      </div>

        {projects.length>0?
        <Row>
        {projects.map((project) => (
          <Col md={4} key={project.id} className="mb-3">
            <ProjectCard
              project={project}
              onDelete={handleDelete}
              onEdit={(p) => {
                setEditData(p);
                setShowModal(true);
              }}
              onManageTasks={(id) => console.log('Go to tasks of', id)}
            />
          </Col>
        ))}
      </Row>: <h1>No Projects to show</h1>}

      <ProjectModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditData(null);
        }}
        editData={editData}
        onSubmit={editData ? handleUpdate : handleCreate}
      />
    </Container>
  );
};

export default Projects;
