import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const ProjectModal = ({ show, onHide, onSubmit, editData }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name||'');
      setId(editData.id||'');
      setImage(null); 
    } else {
      setName('');
      setId('');
      setImage(null);
    }
  }, [editData, show]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    if (image) formData.append('file', image);

    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editData?'Edit Project':'Create Project'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project ID</Form.Label>
            <Form.Control
              type="text"
              value={id}
              onChange={(e)=> setId(e.target.value)}
              disabled={editData} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {editData ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
