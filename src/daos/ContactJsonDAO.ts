import { join } from 'path'
import { writeFileSync } from 'fs'

import { Contact } from '../models/Contact'
import { ContactDAO } from './ContactDao'

export class ContactJsonDAO extends ContactDAO {
  constructor() {
    super('contacts.json')
    const objs: Contact[] = JSON.parse(this._strContent)
    this._contacts = objs
  }

  flush(): void {
    const contactsJson = JSON.stringify(this._contacts)
    const filePath = join(__dirname, '..', 'data', 'contacts.json')
    writeFileSync(filePath, contactsJson)
  }
}
