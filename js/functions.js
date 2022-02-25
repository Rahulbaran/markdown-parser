"use strict";

// * PARSE BOLD CHARACTER
const boldReplacer = (match, p1, p2, p3, p4) => {
  return match.startsWith("**")
    ? `<strong>${p2}</strong>`
    : `<strong>${p4}</strong>`;
};

const parseBold = str => {
  const regex = /(\*{2}(?!\s)(.+?)(?<!\s)\*{2})|(_{2}(?!\s)(.+?)(?<!\s)_{2})/g;
  return str.replaceAll(regex, boldReplacer);
};

// * PARSE ITALIC CHARACTER
const italicReplacer = (match, p1, p2, p3, p4) => {
  return match.startsWith("*") ? `<em>${p2}</em>` : `<em>${p4}</em>`;
};

const parseItalic = str => {
  const regex =
    /((?<!\*)\*(?![\s\*])(.+?)(?<![\s\*])\*(?!\*))|((?<!_)_(?![\s_])(.+?)(?<![\s_])_(?!_))/g;
  return str.replaceAll(regex, italicReplacer);
};

export { parseBold, parseItalic };
