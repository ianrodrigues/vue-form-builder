import { schema } from 'normalizr';

export const PageSchema = new schema.Entity('page', {}, { idAttribute: 'uuid' });

export const SectionSchema = new schema.Entity('section', {}, { idAttribute: 'uuid' });

export const QuestionSchema = new schema.Entity('question', {}, { idAttribute: 'uuid' });

export const FormItemsSchema = new schema.Union({
  section: SectionSchema,
  question: QuestionSchema,
}, 'type');

SectionSchema.define({ items: [FormItemsSchema] });
PageSchema.define({ items: [FormItemsSchema] });

export const FormSchema = {
  items: [PageSchema],
};
