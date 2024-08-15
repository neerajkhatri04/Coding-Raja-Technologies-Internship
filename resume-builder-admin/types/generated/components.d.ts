import type { Schema, Attribute } from '@strapi/strapi';

export interface SkillsSkillls extends Schema.Component {
  collectionName: 'components_skills_skillls';
  info: {
    displayName: 'Skillls';
    icon: 'cube';
  };
  attributes: {
    name: Attribute.String;
    rating: Attribute.Integer;
    ids: Attribute.BigInteger;
  };
}

export interface ExperienceExperience extends Schema.Component {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'Experience';
    icon: 'bell';
  };
  attributes: {
    title: Attribute.String;
    companyName: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    startDate: Attribute.String;
    endDate: Attribute.String;
    ids: Attribute.BigInteger;
    workSummery: Attribute.Text;
  };
}

export interface EducationEducation extends Schema.Component {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'Education';
    description: '';
  };
  attributes: {
    universityName: Attribute.String;
    degree: Attribute.String;
    major: Attribute.String;
    startDate: Attribute.String;
    endDate: Attribute.String;
    description: Attribute.Text;
    ids: Attribute.BigInteger;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'skills.skillls': SkillsSkillls;
      'experience.experience': ExperienceExperience;
      'education.education': EducationEducation;
    }
  }
}
