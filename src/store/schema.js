import { schema } from 'normalizr';

import { SECTION_TYPE } from '../models/Section';
import { PAGE_TYPE } from '../models/Page';
import { QUESTION_TYPE } from '../models/Question';

export const PageSchema = new schema.Entity(PAGE_TYPE, {}, { idAttribute: 'uuid' });

export const SectionSchema = new schema.Entity(SECTION_TYPE, {}, { idAttribute: 'uuid' });

export const QuestionSchema = new schema.Entity(QUESTION_TYPE, {}, { idAttribute: 'uuid' });

export const FormItemsSchema = new schema.Union({
  section: SectionSchema,
  question: QuestionSchema,
}, 'type');

SectionSchema.define({ items: [FormItemsSchema] });
PageSchema.define({ items: [FormItemsSchema] });

export const FormSchema = {
  items: [PageSchema],
};
