import { denormalize } from 'normalizr';
import uuid from 'uuid/v4';

import Form from '@/models/Form';
import Page from '@/models/Page';
import Question, { RESPONSE_TYPE_TEXT } from '@/models/Question';
import Section from '@/models/Section';
import { FormSchema } from '@/store/schema';

export const CreateFormJsonBlob = (form, formItems) => {
  const data = JSON.stringify(denormalize(form, FormSchema, formItems), undefined, 2);

  return new Blob([data], { type: 'text/json' });
};

export const SaveFile = (filename, data, format) => {
  const event = document.createEvent('MouseEvents');
  const anchor = document.createElement('a');

  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(data);
  anchor.dataset.downloadurl = [format, anchor.download, anchor.href].join(':');

  event.initEvent('click');
  anchor.dispatchEvent(event);
};

export const CreateNewForm = () => new Form(uuid());
export const CreateNewPage = () => new Page(uuid(), '');
export const CreateNewSection = () => new Section(uuid(), '');
export const CreateNewQuestion = () => new Question(uuid(), '', RESPONSE_TYPE_TEXT);
