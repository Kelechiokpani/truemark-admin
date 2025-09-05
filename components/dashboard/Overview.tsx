"use client";
import React, { useState, useMemo } from "react";


const tabs = ["Overview", "My Learning", "Certifications"];


export default function Overview({data}) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabContent = {
    "Overview":   <div> Overview Content</div>,
    "My Learning": <div>My Learning Content</div>,
    "Certifications": <div>Certifications Content</div>,

  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#387467] text-white px-6 py-8 rounded-lg">
        <h1 className="text-3xl font-bold">Overview</h1>
        {/*<nav className="flex flex-wrap mt-8 space-x-4">*/}
        {/*  {tabs.map((tab) => (*/}
        {/*    <button*/}
        {/*      key={tab}*/}
        {/*      className={`pb-2 px-6 border-b-2 transition ${*/}
        {/*        activeTab === tab*/}
        {/*          ? "border-white font-semibold"*/}
        {/*          : "border-transparent hover:border-gray-300"*/}
        {/*      }`}*/}
        {/*      onClick={() => setActiveTab(tab)}*/}
        {/*    >*/}
        {/*      {tab}*/}
        {/*    </button>*/}
        {/*  ))}*/}
        {/*</nav>*/}
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">

        {/*{tabContent[activeTab] ?? <div>Default Content</div>}*/}

      </main>
    </div>
  );
}


