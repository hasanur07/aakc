"use client";
import gsap from "gsap/all";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const splittTextElements = (selector: string, type = "words, chars", addFirstChar = false) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((element) => {
        const splitText = new SplitText(element, { type: type, wordsClass: "word", charsClass: "char" });
        if (type.includes("chars")) {
            splitText.chars.forEach((char,index) => {
                const orginalText = char.textContent;
                char.innerHTML = `<span>${orginalText}</span>`;
                if (addFirstChar && index === 0) {
                    char.classList.add("first-char");
                }
            });
        }
    });
}