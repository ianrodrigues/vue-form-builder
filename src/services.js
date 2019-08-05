import { normalize, denormalize } from 'normalizr';

import Form from '@/models/Form';
import Page from '@/models/Page';
import Question from '@/models/Question';
import Section from '@/models/Section';
import { FormSchema, SectionSchema, QuestionSchema, PageSchema } from '@/store/schema';

export const CreateFormJsonBlob = (form, formItems) => {
  const data = JSON.stringify(denormalize(form, FormSchema, formItems), undefined, 2);

  return new Blob([data], { type: 'text/json' });
}

export const ReadFormJsonFile = (file, onLoad) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = e => onLoad(e.target.result);
}

export const SaveFile = (filename, data, format) => {
  const event = document.createEvent('MouseEvents');
  const anchor = document.createElement('a');

  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(data);
  anchor.dataset.downloadurl = [format, anchor.download, anchor.href].join(':');

  event.initEvent('click');
  anchor.dispatchEvent(event);
}

export const CreateNormalizedForm = () => {
  const { result } = normalize(new Form(), FormSchema);
  return result;
}

export const CreateNormalizedFormFromObject = (object) => {
  return normalize(object, FormSchema);
}

export const CreateNormalizedPage = () => {
  const { entities: { page }, result } = normalize(new Page(), PageSchema);
  return page[result];
}

export const CreateNormalizedSection = () => {
  const { entities: { section }, result } = normalize(new Section(), SectionSchema);
  return section[result];
} 

export const CreateNormalizedQuestion = () => {
  const { entities: { question }, result } = normalize(new Question(), QuestionSchema);
  return question[result];
}
