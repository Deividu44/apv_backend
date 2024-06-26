import Paciente from '../models/Pacientes.js'

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body)
  paciente.veterinario = req.veterinario._id

  try {
    const pacienteGuardado = await paciente.save()
    res.json(pacienteGuardado)
  } catch (error) {
    console.log(error)
  }
}

// Obtiene todos los pacientes de un Veterinario
const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where('veterinario')
    .equals(req.veterinario)
  res.json(pacientes)
}

// Obtiene un paciente
const obtenerPaciente = async (req, res) => {
  const { id } = req.params
  const paciente = await Paciente.findById(id)
  if (!paciente) {
    res.status(404).json({ msg: 'Paciente no encontrado' })
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Acción no válida' })
  }
}

const actualizarPaciente = async (req, res) => {
  const { id } = req.params
  const paciente = await Paciente.findById(id)

  if (!paciente) {
    res.status(404).json({ msg: 'Paciente no encontrado' })
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Acción no válida' })
  }

  // Actualizar paciente
  paciente.nombre = req.body.nombre || paciente.nombre
  paciente.propieatrio = req.body.propieatrio || paciente.propieatrio
  paciente.email = req.body.email || paciente.email
  paciente.fecha = req.body.fecha || paciente.fecha
  paciente.sintomas = req.body.sintomas || paciente.sintomas

  try {
    const pacienteActualizado = await paciente.save()
    res.json(pacienteActualizado)
  } catch (error) {
    console.log(error)
  }
}

const eliminarPaciente = async (req, res) => {
  const { id } = req.params
  const paciente = await Paciente.findById(id)

  if (!paciente) {
    res.status(404).json({ msg: 'Paciente no encontrado' })
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: 'Acción no válida' })
  }

  try {
    await paciente.deleteOne()
    res.json({ msg: 'Paciente eliminado' })
  } catch (error) {
    console.log(error)
  }
}

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente
}
