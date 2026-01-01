import { Card, Button } from 'react-bootstrap';
import {API_BASE} from '../api/projectApi';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onDelete, onEdit, onManageTasks }) => {
    const navigate= useNavigate();
  return (
    <Card>
      {project.projectImage && (
        <Card.Img
          variant="top"
          src={`${API_BASE}${project.projectImage}`}
          alt={project.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>ID: {project.id}</Card.Text>
        <Button variant="primary" size="sm" onClick={()=> onEdit(project)} className="me-2">
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={()=> onDelete(project.id)} className="me-2">
          Delete
        </Button>
        <Button variant="secondary" size="sm" onClick={()=> navigate(`/tasks/${project.id}`)}>
          Manage Tasks
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
