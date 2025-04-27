import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor, informe um título.']
  },
  date: {
    type: Date,
    required: [true, 'Por favor, uma data.']
  },
  space: {
    type: String,
    required: [true, 'Por favor, informe um espaço.']
  },
  logs: []
})


mongoose.model('Event', Schema)

export default mongoose.model('Event')
