export const FORM_CONTACT_MAX_LENGTH = 3000;
export const FORM_BLURB_MAX_LENGTH = 500;
export const FORM_NAMES_MAX_LENGTH = 50;
export const FORM_URL_INVALID =
  "Must be a valid URL starting with http:// or https://";

export const generateMaxMessage = (length: number) =>
  `Must be less than ${length} characters long`;
