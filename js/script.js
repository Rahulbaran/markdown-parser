"use strict";

import { parseItalic, parseBold } from "./functions.js";

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
  const [strikeReg, codeReg, linkReg, horizontalReg] = [
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
  string = parseBold(string);

  // * Italic
  string = parseItalic(string);

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
