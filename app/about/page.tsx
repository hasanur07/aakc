"use client"
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const divRef = useRef<HTMLDivElement>(null);
  const [fontSize,setFontSize] = useState(50);
  const text = "ABOUT AAKC"
  const setSize = ()=>{
    if(!divRef.current) return;
    const {width} = divRef.current.getBoundingClientRect();
    const fontSize = width / (text.length / 2);
    setFontSize(fontSize);
  }
  useEffect(()=>{
    setSize();
    window.addEventListener("resize",setSize);
    return ()=>{
      window.removeEventListener("resize",setSize);
    }
  },[text])
  return (
    <div ref={divRef} className="flex flex-col w-full">
      <h1 className="spaces-nowrap"
      style={{
        fontSize: fontSize,
        whiteSpace: "nowrap",
      }}
      >{text}</h1>
    </div>
  );
}
