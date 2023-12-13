import { join } from 'path'
import { writeFileSync } from 'fs'

import { Contact } from '../models/Contact'
import { ContactDAO } from './ContactDao'

export class ContactCsvDAO extends ContactDAO {
  constructor() {
    super('contacts.csv')
    const arr = this._strContent.split('\n').slice(1)
    arr.forEach((c) => {
      if (c) {
        const values = c.split(',')
        const contact: Contact = {
          name: values[0],
          email: values[1],
          phone: values[2],
        }
        this._contacts.push(contact)
      }
    })
  }

  flush(): void {
    let csvString = 'NOME,E-MAIL,TELEFONE\n'
    this._contacts.forEach((c) => {
      csvString += `${c.name},${c.email},${c.phone}\n`
    })

    const filePath = join(__dirname, '..', 'data', 'contacts.csv')
    writeFileSync(filePath, csvString)
  }
}
