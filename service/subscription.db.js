import mongoose from 'mongoose';
import Event from './event.db.js';


const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, informe seu nome.']
  },
  email: {
    type: String,
    required: [true, 'Por favor, informe seu email.']
  },
  subscription: {
    type: String,
    required: [true, 'Ocorreu um erro com seu registro, tente novamente.']
  },
  events: [],
  logs: []
})


mongoose.model('Subscription', Schema)

export default mongoose.model('Subscription')
