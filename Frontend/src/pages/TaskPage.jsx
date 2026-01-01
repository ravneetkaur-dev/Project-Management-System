import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getTasksByProject, createTask, updateTask, deleteTask, changeTaskStatus } from '../api/taskApi';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../api/projectApi';

const TasksPage=() => {
    const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [id, setId]= useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [total, setTotal]= useState(0);
  const [completed, setComplete]= useState(0);
  const [search, setSearch]= useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTasks= async () => {
    try {
        
      const data = await getTasksByProject(projectId);
      setTotal(data.length);
      let a= data.filter(t=>t.status=="Completed");
      setComplete(a.length);
      setTasks(data);
      setAllTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const openModal = (task = null) => {
    setEditTask(task);
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setImage(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
        formData.append('id',id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('projectId', projectId);
      if (editTask) formData.append('id', editTask.id);
      if (image) formData.append('file', image);

      if (editTask) {
        await updateTask(formData);
      } else {
        await createTask(formData);
        setTotal(total+1);
      }
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, projectId);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeStatus = async (taskId) => {
    try {
      await changeTaskStatus(taskId);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
  const value = e.target.value;
  setSearch(value); 

  if (value === '') {
    setTasks(allTasks); 
  } else {
    const filtered = allTasks.filter(task =>
      task.title.toLowerCase().includes(value.toLowerCase())
    );
    setTasks(filtered);
  }
};

const handleStatusFilter=(e) => {
  const value = e.target.value;
  setStatusFilter(value);

  if (value==='') {
    setTasks(allTasks); 
  } else {
    const filtered = allTasks.filter(
      task => task.status===value
    );
    setTasks(filtered);
  }
};


  return (
    
    <div className="container mt-4">
    <div className="d-flex justify-content-between mb-3">
      <div><h2>Tasks</h2>
      <Button className="mb-3" onClick={() => openModal()}>Create Task</Button>
      </div>
      <div><input type='search' placeholder='Search....' value={search} onChange={(e)=>handleSearch(e)}></input>
      <select
        value={statusFilter}
        onChange={(e) => handleStatusFilter(e)}
        className="form-select mb-3"
        >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <h5>Tasks: {completed}/{total}</h5>
        <h5>Percentage: {completed/total*100}%</h5>
      </div>
      </div>
      {
        tasks.length>0?
      <Table striped bordered hover>
        
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
            <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
                <td>{task.id}</td>
                    {task.taskImage?<td><img src={`${API_BASE}${task.taskImage}`}
                              alt={task.title}
                              style={{ height: '50px', width: '50px', objectFit: 'cover' }}/></td>:
                              <td>{"N/A"}</td>                  }
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
            <td>
                <Button size="sm" variant="primary" className="me-2" onClick={() => openModal(task)}>Edit</Button>
                <Button size="sm" variant="danger" className="me-2" onClick={() => handleDelete(task.id)}>Delete</Button>
                <Button size="sm" variant="secondary" onClick={() => handleChangeStatus(task.id)}>Change Status</Button>
              </td>
            </tr>
          ))}
          </tbody>
         
        
      </Table>:
       <h1>No Tasks to show</h1>
        }

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editTask ? 'Edit Task' : 'Create Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control value={id} onChange={(e) => setId(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>{editTask ? 'Update' : 'Create'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TasksPage;
