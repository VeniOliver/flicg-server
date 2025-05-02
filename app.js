import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config({
  silent: process.env.NODE_ENV === 'production'
})

import connect from './db.js';
import auth from './model/auth.class.js';
import DefaultRoutes from './router/default.router.js';
import SubscriptionRoutes from './router/subscription.router.js';
import EventRoutes from './router/event.router.js';
import Notification from './model/notification.class.js';
import SubscriptionDB from './service/subscription.db.js';
import EventDB from './service/event.db.js';
//connect to database
await connect()

//create
const data = [
  {
    "title": "Apresentação Cultural - Escolas",
    "date": "2025-05-08T09:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Abertura Oficial",
    "date": "2025-05-08T09:20:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 1 – A métrica é a centelha clareada pela Rima com Siba",
    "date": "2025-05-08T10:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 2 - De Feed em Feed, de Verso em Verso: Produção e Cultivo de Poesia Hoje com Miriam Sam, Bruno Pamponet e Dany Maciel",
    "date": "2025-05-08T11:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Apresentação Cultural - Escolas",
    "date": "2025-05-08T14:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 3 – Entre a Palavra e a Poesia circulam versos de abraços com Fabrício Carpinejar",
    "date": "2025-05-08T14:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 4 – Jogada de Campeão – Futebol e Cidadania com Bobô, Dico Maradona, Gil sergipano e Sandro",
    "date": "2025-05-08T16:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "A Kombi do Zé Livrório",
    "date": "2025-05-08T10:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Contações de Estórias com Tammy Cavalcante",
    "date": "2025-05-08T11:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Susana Moraes",
    "date": "2025-05-08T14:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "A Kombi do Zé Livrório",
    "date": "2025-05-08T15:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Caravana \"Luanda Ruanda - Histórias Africanas\"",
    "date": "2025-05-08T10:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Risos Ancestrais",
    "date": "2025-05-08T11:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Artistas Locais - Lindy Rios e Neto do Cavaco",
    "date": "2025-05-08T13:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Literatura Infantil Afrobaiana com Kalipsa Brito.",
    "date": "2025-05-08T14:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Essa Toalha tem História com Saluá Chequer e Igor Reis",
    "date": "2025-05-08T15:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Clubes de Leitura: Experiências Leitoras com Estudantes da Bacia do Jacuípe",
    "date": "2025-05-08T16:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Daniel da Quixabeira",
    "date": "2025-05-08T17:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Oficina de Escrita Criativa / Teatro / Dança / Workshop DJs",
    "date": "2025-05-08T09:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "Manifestações Culturais",
    "date": "2025-05-08T15:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "DJ Zé Ceará / Negalu / Thedozze",
    "date": "2025-05-08T17:00:00",
    "space": "Espaço Tenda Eletrônica – Casa de Taipa"
  },
  {
    "title": "Exposição Eduardo Lima",
    "date": "2025-05-08T09:00:00",
    "space": "Exposição Eduardo Lima"
  },
  {
    "title": "Apresentação EPJAI",
    "date": "2025-05-08T19:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Zé Livrório",
    "date": "2025-05-08T19:30:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Som de Bar",
    "date": "2025-05-08T20:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Siba",
    "date": "2025-05-08T21:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Chambinho do Acordeon",
    "date": "2025-05-08T22:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Show um só coração – Banda Oliveira convida: Elba Ramalho, Edson Gomes e Isaque Gomes",
    "date": "2025-05-08T23:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Alvorada dos 40 nos",
    "date": "2025-05-09T06:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Hasteamento da Bandeira e Missa de Aniversário dos 40 Anos de Emancipação",
    "date": "2025-05-09T08:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Apresentação Cultural (Escolas)",
    "date": "2025-05-09T09:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 5 – Em cada canto eu sinto a Paisagem do Interior com Jessier Quirino",
    "date": "2025-05-09T10:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 6 - Intersecções Literárias com Pablo Rios, Senária Santana e Juscimeire Oliveira",
    "date": "2025-05-09T11:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Apresentação Cultural (Escolas)",
    "date": "2025-05-09T14:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 7 – Um Ringue pela educação com Robson Conceição, Erica Mattos e Adriana Araújo",
    "date": "2025-05-09T14:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 8 - A escola dando asas aos voos da Literatura com Alencar Schueroff, Alisson Jobim, Wagner Vilas Boas e Vinicius Araujo",
    "date": "2025-05-09T16:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "A Kombi do Zé Livrório",
    "date": "2025-05-09T10:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Contações de Estórias e Cirandas com Tammy Cavancanti",
    "date": "2025-05-09T10:30:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Circo do Capão",
    "date": "2025-05-09T15:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "A Kombi do Zé Livrório",
    "date": "2025-05-09T14:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Sarau da Onça",
    "date": "2025-05-09T16:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Apresentação Cordelistas",
    "date": "2025-05-09T09:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "A força da Poesia Feminina Mariana Guimarães e Pok Ribeiro.",
    "date": "2025-05-09T10:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Dandara",
    "date": "2025-05-09T11:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Artistas Locais – Letícia Oliveira",
    "date": "2025-05-09T13:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "A Doçura da Leitura com Emilia Nuñes",
    "date": "2025-05-09T14:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Marias de Cá com Pok Ribeiro",
    "date": "2025-05-09T15:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Mesa de Glosas com Dayane Rocha, Francisca Araujo, Gislândio Araujo, Clécio Rimas",
    "date": "2025-05-09T16:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Lançamentos de Livros",
    "date": "2025-05-09T17:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Oficina de Escrita Criativa / Teatro / Dança / Workshop DJs",
    "date": "2025-05-09T09:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "Manifestações Culturais",
    "date": "2025-05-09T15:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "Exposição Eduardo Lima",
    "date": "2025-05-09T09:00:00",
    "space": "Exposição Eduardo Lima"
  },
  {
    "title": "Som e Louvor",
    "date": "2025-05-09T20:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Anderson Freire",
    "date": "2025-05-09T21:00:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Apresentação Cultural (Escolas)",
    "date": "2025-05-10T09:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 9 - Teatro e Poesia com Natália Tamara, Vilebaldo de Jesus e Zuryel Rios",
    "date": "2025-05-10T09:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 10 – Palavras de Zanzibar - 40 anos do Axé com Armandinho Macedo e Alexandre Leão",
    "date": "2025-05-10T10:30:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Apresentação Cultural (Escolas)",
    "date": "2025-05-10T14:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 11– As histórias que contamos para nossas crianças e jovens, importam com Livia Vaz e Ana Franciele",
    "date": "2025-05-10T14:15:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "Mesa 12 – Cinema e Literatura com Luis Miranda e Renato Cordeiro",
    "date": "2025-05-10T16:00:00",
    "space": "Espaço Cultura Que Floresce no Sertão - Mesas e Debates"
  },
  {
    "title": "A Kombi do Zé Livrório",
    "date": "2025-05-10T10:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Contações de Histórias",
    "date": "2025-05-10T14:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Circo do Capão",
    "date": "2025-05-10T15:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Sarau Poético",
    "date": "2025-05-10T16:00:00",
    "space": "Espaço Zé Livrório - Praça da Leitura"
  },
  {
    "title": "Apresentação de Cordelistas",
    "date": "2025-05-10T10:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Lançamento de livros - Cem Contos e um Vintém com Zeca Moreira",
    "date": "2025-05-10T11:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Artista Local – Bruno Bastos e Laisla Silva",
    "date": "2025-05-10T13:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Sarau da Onça",
    "date": "2025-05-10T14:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "A Travessia do Grão Profundo – Com Mozart Primo",
    "date": "2025-05-10T15:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Fogo Pagô",
    "date": "2025-05-10T16:00:00",
    "space": "Espaço Cordel e Repente – Carreta Literária"
  },
  {
    "title": "Oficina de Escrita Criativa / Teatro / Dança / Workshop DJs",
    "date": "2025-05-10T09:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "Manifestações Culturais",
    "date": "2025-05-10T15:00:00",
    "space": "Espaço Cultura Popular – Casa de Taipa"
  },
  {
    "title": "DJ Zé Ceará / Negalu / Thedozze / Rimas INC",
    "date": "2025-05-10T17:00:00",
    "space": "Espaço Tenda Eletrônica – Casa de Taipa"
  },
  {
    "title": "Exposição Eduardo Lima",
    "date": "2025-05-10T09:00:00",
    "space": "Exposição Eduardo Lima"
  },
  {
    "title": "Escola Municipal de Música",
    "date": "2025-05-10T19:30:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Mateus Zingue",
    "date": "2025-05-10T20:30:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Teatro Mágico",
    "date": "2025-05-10T21:30:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Armandinho Macedo",
    "date": "2025-05-10T22:30:00",
    "space": "Palco de Eventos"
  },
  {
    "title": "Show um só coração Banda Oliveira Convida: Luiz Caldas / Carlinhos Brown e Olodum",
    "date": "2025-05-10T23:30:00",
    "space": "Palco de Eventos"
  }
]

//for (const item of data) {
//  await EventDB.create({...item, date: new Date(item?.date)})
//
//}

//const notif = new Notification()
//const subscriptions = await SubscriptionDB.find()
//for (const sub of subscriptions) {
//  try {
//    let payload = {
//      subscription: sub?.subscription, 
//      title:`Olá ${sub?.name?.trim().split(' ')[0]}`,
//      body: `Está animado para a FLICG 2025? Em breve teremos novidades.`
//    }
//    await notif.send(payload)
//    console.log('sucesso: ', sub?.name)
//  } catch(e) {
//    //console.log('erro: ', e, sub?.name)
//  }
//}

//create app
const app = express()
// adding Helmet to enhance your API's security
app.use(helmet())
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({limit: '5mb', extended: true}))
// enabling CORS
app.use(cors({
  origin: 'https://flicg.venith.com.br'
}))
//check api key
app.use(auth.apiKeyVerify)
//routers
app.use(DefaultRoutes)
app.use('/subscription', SubscriptionRoutes)
app.use('/event', EventRoutes)


export default app
