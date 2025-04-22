import MedicalNote from '../models/medical-notes.js'

export const getMedicalNote = async (req, res) => {
    const note = await MedicalNote.findById(req.params.id).populate('user')
    if (!note) return res.status(404).json('Note not found')
    res.json(note)  
}

export const getMedicalNotes = async (req, res) => { 
    const notes = await MedicalNote.find(
        { user: req.user.id }
    ).populate('user')
    res.json(notes)
}

export const createMedicalNote = async (req, res) => {
    const userId = req.user.id;
    const { title, content, date, doctor } = req.body;
       
    const newNote = new MedicalNote({
        title,
        content,
        date,
        doctor,
        user: userId
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
}

export const deleteMedicalNote = async (req, res) => {
    const note = await MedicalNote.findByIdAndDelete(req.params.id)
    if (!note) return res.status(404).json('Note not found')
    res.json('Note deleted')
}

export const updateMedicalNote = async (req, res) => {
    const note = await MedicalNote.findByIdAndUpdate(req.params.id, 
        req.body,
        { new: true } 
    )
    if (!note) return res.status(404).json('Note not found')
    res.json(note)
}