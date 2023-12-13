import { fakerPT_BR as faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { Contact } from './models/Contact'

const contacts: Contact[] = []
export const TOTAL = 100
let csvLines = 'NOME,E-MAIL,TELEFONE\n'

for (let i = 0; i < TOTAL; i++) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const obj: Contact = {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number('(##) #####-####'),
  }

  contacts.push(obj)
  const line = `${obj.name},${obj.email},${obj.phone}\n`
  csvLines += line
}

const filesPath = join(__dirname, 'data')

// Salvando o arquivo JSON
const strJson = JSON.stringify(contacts)
const jsonFileName = join(filesPath, 'contacts.json')
writeFileSync(jsonFileName, strJson)

// Salvando o arquivo CSV
const csvFileName = join(filesPath, 'contacts.csv')
writeFileSync(csvFileName, csvLines)

console.log('Mal feito desfeito')
