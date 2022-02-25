"use strict";

import { expect } from "chai";
import { parseBold, parseItalic } from "../js/functions.js";
("./js/functions.js");

// * BOLD TEXT PARSING FUNCTION TEST
const bold = [
  "**Bold**",
  "** Bold**",
  "**Bold **",
  "** Bold **",
  "**Bold***",
  "***Bold**",
  "__Bold__",
  "__ Bold__",
  "__ Bold __",
  "__Bold__ **Bold**"
];

expect(parseBold(bold[0])).to.be.equals("<strong>Bold</strong>");
expect(parseBold(bold[1])).to.be.equals("** Bold**");
expect(parseBold(bold[2])).to.equals("**Bold **");
expect(parseBold(bold[3])).to.be.eq("** Bold **");
expect(parseBold(bold[4])).to.be.equal("<strong>Bold</strong>*");
expect(parseBold(bold[5])).to.be.eql("<strong>*Bold</strong>");

expect(parseBold(bold[6])).to.be.equals("<strong>Bold</strong>");
expect(parseBold(bold[7])).to.be.equal("__ Bold__");
expect(parseBold(bold[8])).to.eq("__ Bold __");
expect(parseBold(bold[9])).to.be.eqls(
  "<strong>Bold</strong> <strong>Bold</strong>"
);

// * ITALIC TEXT PARSING FUNCTION TEST
const italic = [
  "*Italic*",
  "* Italic*",
  "*Italic *",
  "* Italic *",
  "**Italic*",
  "***Italic***",
  "*Italic**",
  "_Italic_",
  "__Italic_",
  "_Italic_ *Italic*"
];

expect(parseItalic(italic[0])).to.be.equals("<em>Italic</em>");
expect(parseItalic(italic[1])).to.be.equal("* Italic*");
expect(parseItalic(italic[2])).to.be.eq("*Italic *");
expect(parseItalic(italic[3])).to.be.eql("* Italic *");
expect(parseItalic(italic[4])).to.be.eqls("**Italic*");
expect(parseItalic(italic[5])).to.be.equals("***Italic***");
expect(parseItalic(italic[6])).to.be.equals("*Italic**");

expect(parseItalic(italic[7])).to.be.equals("<em>Italic</em>");
expect(parseItalic(italic[8])).to.be.equals("__Italic_");
expect(parseItalic(italic[9])).to.be.equals("<em>Italic</em> <em>Italic</em>");
