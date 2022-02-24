"use strict";

// * FUNCTION FOR BOLD REPLACEMENT
const boldReplacer = (match, p1, p2, p3, p4) => {
  return match.startsWith("**")
    ? `<strong>${p2}</strong>`
    : `<strong>${p4}</strong>`;
};

// * FUNCTION FOR ITALIC REPLACEMENT
const italicReplacer = (match, p1, p2, p3, p4) => {
  return match.startsWith("*") ? `<em>${p2}</em>` : `<em>${p4}</em>`;
};

// * FUNCTION TO PARSE .md FILE
const parseMd = string => {
  const [h1Reg, h2Reg, h3Reg, h4Reg, h5Reg, h6Reg] = [
    /# (.+)/g,
    /#{2} (.+)/g,
    /#{3} (.+)/g,
    /#{4} (.+)/g,
    /#{5} (.+)/g,
    /#{6} (.+)/g
  ];
  const [boldReg, italicReg, strikeReg, codeReg, linkReg, horizontalReg] = [
    /(\*{2}([^\s].+?)\*{2})|(_{2}([^\s].+?)_{2})/g,
    /(\*([^\s].+?)\*)|(_([^\s].+?)_)/g,
    /~{2}(.+?)~{2}/g,
    /`(.+?)`/g,
    /(\[(.*?)\])(\((.+?)\))/g,
    /\n(-){3,}/g
  ];

  // * Headings
  string = string.replace(h6Reg, "<h6>$1</h6>");
  string = string.replace(h5Reg, "<h5>$1</h5>");
  string = string.replace(h4Reg, "<h4>$1</h4>");
  string = string.replace(h3Reg, "<h3>$1</h3>");
  string = string.replace(h2Reg, "<h2>$1</h2>");
  string = string.replace(h1Reg, "<h1>$1</h1>");

  // * Bold
  string = string.replace(boldReg, boldReplacer);

  // * Italic
  string = string.replace(italicReg, italicReplacer);

  // * Strike
  string = string.replace(strikeReg, "<del>$1</del>");

  // * Code
  string = string.replace(codeReg, "<code>$1</code>");

  // * Link
  string = string.replace(
    linkReg,
    "<a href='$4' title='$4' target='_blank'>$2</a>"
  );

  // * Horizontal Line
  string = string.replace(horizontalReg, "<hr></hr>");

  return string;
};

// * FUNCTION TO MAKE HTTP REQUEST FOR FETCHING .md FILE
const fetchMd = file => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = "text";
  xhr.open("get", file, true);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const parsedString = parseMd(xhr.response);
      document
        .querySelector(".blogs--container")
        .insertAdjacentHTML("beforeend", parsedString);
    } else {
      console.error(xhr.response);
    }
  };

  xhr.onerror = err => console.error(err);
};
fetchMd("markdown.md");

// const regex = /(\*([^\s].+?)\*)|(_([^\s].+?)_)/g;

// const boldReplacer = (match, p1, p2, p3, p4) => {
//   console.log(match, p1, p2, p3, p4);
//   return match.startsWith("**")
//     ? `<strong>${p2}</strong>`
//     : `<strong>${p4}</strong>`;
// };

// console.log("_Markdown parser_  *markdonw*".replaceAll(regex, boldReplacer));
