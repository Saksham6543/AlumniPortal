import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';

function JobForm({ onSubmit, onClose, open }) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('default');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            title,
            company,
            location,
            type,
            description,
            link,
            deadline,
            postedByMe: true,
            appliedByMe: false
        };

        try {
            const response = await axios.post('http://localhost:8080/api/jobs/post', newJob);
            onSubmit(response.data);
            onClose(); 
        } catch (error) {
            console.error("Error posting job:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                maxWidth: '95%',
                height: 'auto',
                maxHeight: '95%',
                bgcolor: '#1a1a1a', 
                borderRadius: '8px',
                overflowY: 'auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                p: 4,
            }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#ff4500', fontWeight: 600, textAlign: 'center', fontSize: '22px' }}>
                    Post a New Job
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <FormControl fullWidth margin="normal" sx={{ color: '#e0e0e0' }}>
                        <InputLabel sx={{ color: '#e0e0e0' }}>Job Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            sx={{
                                color: '#e0e0e0',
                                backgroundColor: '#2b2b2b',
                                borderRadius: '4px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }}
                        >
                            <MenuItem value="default">Choose Job Type</MenuItem>
                            <MenuItem value="full-time">Full-time</MenuItem>
                            <MenuItem value="part-time">Part-time</MenuItem>
                            <MenuItem value="internship">Internship</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        margin="normal"
                        type="url"
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                        margin="normal"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{
                            input: { color: '#e0e0e0', backgroundColor: '#2b2b2b', borderRadius: '4px' },
                            label: { color: '#e0e0e0' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused fieldset': { borderColor: '#ff4500' },
                                '&.Mui-focused .MuiInputBase-input': { color: '#ff4500' },
                                '&.Mui-focused .MuiInputLabel-root': { color: '#ff4500' }
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                        <Button type="submit" variant="contained" sx={{ bgcolor: '#cc0000', color: '#0d0d0d', '&:hover': { bgcolor: '#b30000' } }}>
                            Submit
                        </Button>
                        <Button variant="outlined" sx={{ color: '#e0e0e0', borderColor: '#333', '&:hover': { borderColor: '#555', color: '#e0e0e0' } }} onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>

    );
}

export default JobForm;
