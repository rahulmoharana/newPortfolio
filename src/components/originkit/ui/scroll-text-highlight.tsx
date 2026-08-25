"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FontStyle = React.CSSProperties;

type SplitBy = "characters" | "words";

type ScrollPosition =
    | "top top"
    | "top center"
    | "top 70%"
    | "top 75%"
    | "top 80%"
    | "top bottom"
    | "center top"
    | "center center"
    | "center bottom"
    | "bottom top"
    | "bottom 35%"
    | "bottom 40%"
    | "bottom center"
    | "bottom bottom"
    | string;

type ScrollHighlightProps = {
    text?: string;
    font?: FontStyle;
    className?: string;
    containerClassName?: string;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    disablePadding?: boolean;

    dimColor?: string;
    highlightColor?: string;

    splitBy?: SplitBy;
    scrollStart?: ScrollPosition;
    scrollEnd?: ScrollPosition;
    scrub?: boolean | number;
};

const CHAR_STAGGER = 0.02;
const WORD_STAGGER = 0.08;

export default function ScrollHighlight({
    text = "Every word in this paragraph will light up as you scroll through it.",

    font,
    className = "",
    containerClassName = "",
    style,
    containerStyle,
    disablePadding = false,

    dimColor = "rgba(255, 255, 255, 0.2)",
    highlightColor = "#FFFFFF",

    splitBy = "characters",
    scrollStart = "top 75%",
    scrollEnd = "bottom 35%",
    scrub = 0.8,
}: ScrollHighlightProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const words = text.trim().split(/\s+/).filter(Boolean);
    const chars = Array.from(text);
    const stagger = splitBy === "characters" ? CHAR_STAGGER : WORD_STAGGER;

    useEffect(() => {
        const paragraph = containerRef.current;
        if (!paragraph) return;

        const targets = paragraph.querySelectorAll(
            splitBy === "characters" ? ".originkit-char" : ".originkit-word"
        );

        const ctx = gsap.context(() => {
            gsap.set(targets, {
                color: dimColor,
                opacity: 0.2,
            });

            gsap.to(targets, {
                color: highlightColor,
                opacity: 1,
                stagger: {
                    each: stagger,
                    ease: "none",
                },
                ease: "none",
                scrollTrigger: {
                    trigger: paragraph,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub,
                    invalidateOnRefresh: true,
                },
            });
        }, paragraph);

        return () => ctx.revert();
    }, [
        text,
        dimColor,
        highlightColor,
        splitBy,
        stagger,
        scrollStart,
        scrollEnd,
        scrub,
    ]);

    const defaultPadding = disablePadding
        ? {}
        : { paddingTop: "50dvh", paddingBottom: "50dvh" };

    return (
        <div
            className={containerClassName}
            style={{ ...defaultPadding, ...containerStyle }}
        >
            <p
                ref={containerRef}
                className={className}
                style={{
                    margin: 0,
                    display: "inline-block",
                    whiteSpace: "pre-wrap",
                    color: dimColor,
                    ...font,
                    ...style,
                }}
            >
                {splitBy === "characters"
                    ? chars.map((char, index) => (
                          <span
                              key={`${char}-${index}`}
                              className="originkit-char inline-block will-change-[color,opacity]"
                              style={{
                                  color: dimColor,
                                  opacity: 0.2,
                              }}
                          >
                              {char === " " ? "\u00A0" : char}
                          </span>
                      ))
                    : words.map((word, index) => (
                          <React.Fragment key={`${word}-${index}`}>
                              <span
                                  className="originkit-word inline-block will-change-[color,opacity]"
                                  style={{
                                      color: dimColor,
                                      opacity: 0.2,
                                  }}
                              >
                                  {word}
                              </span>
                              {index < words.length - 1 ? " " : null}
                          </React.Fragment>
                      ))}
            </p>
        </div>
    );
}