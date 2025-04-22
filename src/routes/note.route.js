import { Router } from "express"
import { 
    getMedicalNote, 
    getMedicalNotes, 
    createMedicalNote, 
    deleteMedicalNote, 
    updateMedicalNote } from "../controllers/note.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.js"
import { medicalNoteSchema } from "../schemas/medical-notes.schemas.js"

const router = Router()

router.get('/medical-notes', authRequired , (getMedicalNotes))
router.get('/medical-note/:id', authRequired, (getMedicalNote))
router.put('/medical-note/:id', authRequired, (updateMedicalNote))
router.delete('/medical-note/:id', authRequired, (deleteMedicalNote))
router.post('/medical-note', authRequired, validateSchema(medicalNoteSchema),(createMedicalNote))

export default router