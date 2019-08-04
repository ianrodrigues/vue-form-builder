import uuid from 'uuid/v4';

export default class Form {
  constructor(id) {
    this.type = 'form';
    this.uuid = id;
    this.items = [];
  }
}

export const CreateNewForm = () => new Form(uuid());
