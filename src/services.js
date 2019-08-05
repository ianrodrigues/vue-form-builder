import { normalize, denormalize } from 'normalizr';
import uuid from 'uuid/v4';

import Form from '@/models/Form';
import Page from '@/models/Page';
import Question, { RESPONSE_TYPE_TEXT } from '@/models/Question';
import Section from '@/models/Section';
import { FormSchema, SectionSchema, QuestionSchema, PageSchema } from '@/store/schema';

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

export const CreateNormalizedForm = () => {
  const { result } = normalize(new Form(uuid()), FormSchema);
  return result;
}

export const CreateNormalizedPage = () => {
  const { entities: { page }, result } = normalize(new Page(uuid(), ''), PageSchema);
  return page[result];
}

export const CreateNormalizedSection = () => {
  const { entities: { section }, result } = normalize(new Section(uuid(), ''), SectionSchema);
  return section[result];
} 

export const CreateNormalizedQuestion = () => {
  const { entities: { question }, result } = normalize(new Question(uuid(), '', RESPONSE_TYPE_TEXT), QuestionSchema);
  return question[result];
}
