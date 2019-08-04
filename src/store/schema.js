import { schema } from 'normalizr';

export const PageSchema = new schema.Entity('pages', {}, { idAttribute: 'uuid' });

export const SectionSchema = new schema.Entity('sections', {}, { idAttribute: 'uuid' });

export const QuestionSchema = new schema.Entity('questions', {}, { idAttribute: 'uuid' });

export const FormItemsSchema = new schema.Union({
  section: SectionSchema,
  question: QuestionSchema,
}, 'type');

SectionSchema.define({ items: [FormItemsSchema] });
PageSchema.define({ items: [FormItemsSchema] });

export const FormSchema = {
  pages: [PageSchema],
};
