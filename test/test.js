"use strict";

import { expect } from "chai";
import {
  parseBold,
  parseItalic,
  parseStrike,
  parseInlineCode
} from "../js/functions.js";
("./js/functions.js");

// * TEST SUITE (FOR MARKDOWN PARSER)
describe("Functions for parsing various markdown syntaxes", () => {
  /* -----------------------------
   * Test Suite for parseBold() function
  ------------------------------- */
  describe("parseBold() - For parsing bold characters", () => {
    // Test Spec
    it("should return string with parsed bold characters", () => {
      expect(parseBold("**Hello**")).to.be.equals("<strong>Hello</strong>");
      expect(parseBold("___Rahul__")).to.be.equals("_<strong>Rahul</strong>");
      expect(parseBold("**parseBold***")).to.be.equals(
        "<strong>parseBold</strong>*"
      );
      expect(parseBold("___Bold Characters___")).to.be.equals(
        "_<strong>Bold Characters</strong>_"
      );
      expect(parseBold("**Hello** __Rahul__")).to.be.equals(
        "<strong>Hello</strong> <strong>Rahul</strong>"
      );
    });

    // Test Spec
    it("should return the actual string", () => {
      expect(parseBold("** Hello**")).to.be.equals("** Hello**");
      expect(parseBold("**Hello **")).to.be.equals("**Hello **");
      expect(parseBold("__Rahul Tewary __")).to.be.equals("__Rahul Tewary __");
    });
  });

  /* -------------------------------
   * Test Suite for parseItalic() function
   ------------------------------ */
  describe("parseItalic() - For parsing Italic characters", () => {
    // Test Spec
    it("should return string with parsed italic characters", () => {
      expect(parseItalic("*Rahul*")).to.be.equals("<em>Rahul</em>");
      expect(parseItalic("_Kya Haal_")).to.be.equals("<em>Kya Haal</em>");
      expect(parseItalic("*_Italic_*")).to.be.equals("<em>_Italic_</em>");
      expect(parseItalic("_Hello_ I am *Rahul*")).to.be.equals(
        "<em>Hello</em> I am <em>Rahul</em>"
      );
    });

    // Test Spec
    it("should return the actual string", () => {
      expect(parseItalic("*Mohit Pandey *")).to.be.equals("*Mohit Pandey *");
      expect(parseItalic("**Piyush**")).to.be.equals("**Piyush**");
      expect(parseItalic("**Abhineet*")).to.be.equals("**Abhineet*");
      expect(parseItalic("__Shivam__")).to.be.equals("__Shivam__");
      expect(parseItalic("*Bahu**")).to.be.equals("*Bahu**");
    });
  });

  /* ------------------------------
  * Test Suite for parseStrike() function
  ------------------------------- */
  describe("parseStrike() - For parsing Striked Character", () => {
    // Test Spec
    it("should return string with parsed strike character", () => {
      expect(parseStrike("~~Ram Bhagwan~~")).to.be.equals(
        "<del>Ram Bhagwan</del>"
      );
      expect(parseStrike("~~~Mukesh~~")).to.be.equals("~<del>Mukesh</del>");
      expect(parseStrike("~~Human~~~")).to.be.equals("<del>Human</del>~");
      expect(parseStrike("~~~Strike~~~")).to.be.equals("~<del>Strike</del>~");
      expect(parseStrike("~~~Attack~~ on ~~America~~~")).to.be.equals(
        "~<del>Attack</del> on <del>America</del>~"
      );
    });

    // Test Spec
    it("should return the actual string", () => {
      expect(parseStrike("~~Violation ~~")).to.be.equals("~~Violation ~~");
      expect(parseStrike("~~ Strike ~~")).to.be.equals("~~ Strike ~~");
      expect(parseStrike("~~ Rahul Baranwal~~")).to.be.equals(
        "~~ Rahul Baranwal~~"
      );
    });
  });

  /* --------------------------------
  * Test Suite for parseInlineCode() function
  -------------------------------- */
  describe("parseInlineCode() - function to parse inline program code", () => {
    // Test Spec
    it("should return parsed program code", () => {
      expect(parseInlineCode("`const`")).to.be.equals("<code>const</code>");
      expect(parseInlineCode("` const `")).to.be.equals("<code> const </code>");
      expect(parseInlineCode('`const name = "Rahul"`')).to.be.equals(
        '<code>const name = "Rahul"</code>'
      );
    });

    // Test Spec
    it("should return the actual string", () => {
      expect(parseInlineCode("``const`")).to.be.equals("``const`");
      expect(parseInlineCode("`const``")).to.be.equals("`const``");
    });
  });
});
