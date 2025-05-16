"use client";

import { useEffect, useState } from "react";
import GuildFinder from "./guildFinder";
import MyGuild from "./myGuild";
import Storage from "@/app/utils/Storage";
import GuildOption from "./GuildOption";
import GuildApplicants from "./guildApplicants";

import { ChevronLeftIcon, ChevronRightIcon, UsersIcon, SettingsIcon, UserPlusIcon, ShieldIcon } from "../../icons"
import { cn } from "@/lib/utils";

export default function GuildWindow() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "options" | "applicants" | "finder">(
    "finder"
  )
  const [isAnimating, setIsAnimating] = useState(false)

  const [guildId, setGuildId] = useState<string | null>(null);


  const WindowTitle = 'Guild'

  useEffect(() => {
    const id = Storage.getGuildId();
    setGuildId(id);

    if (id) {
      setActiveTab("info")
    } else {
      setActiveTab("finder")
    }
  }, []);

  const togglePanel = () => {
    setIsAnimating(true)
    setIsOpen((prev) => !prev)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <MyGuild />
      case "options":
        return <GuildOption />
      case "applicants":
        return <GuildApplicants />
      case "finder":
        return <GuildFinder />
      default:
        return <MyGuild />
    }
  }

  return (
    <>
      {/* Toggle button - always visible */}
      <button
        onClick={togglePanel}
        className={`fixed top-1/2 z-40 transform -translate-y-1/2 bg-gradient-to-l from-violet-600 to-indigo-600 text-white p-2 rounded-l-lg shadow-lg transition-all duration-300 
          ${isOpen ? "right-[calc(min((100vw-40px),500px))]" : "right-0"}
          `}
        aria-label={isOpen ? "Close guild panel" : "Open guild panel"}
      >
        {isOpen ? <ChevronRightIcon size={24} /> : <ChevronLeftIcon size={24} />}
      </button>

      {/* Main panel */}
      <div
        className={
          `fixed top-0 right-0 h-full bg-white shadow-xl z-30 transition-all duration-300 ease-in-out",
           ${isOpen ? "max-w-[500px] w-full" : "max-w-0 w-0 opacity-0"}
        `}
      >
        {/* Panel content */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white p-4">
            <h2 className="text-xl font-bold">Guild Panel</h2>
          </div>

          {/* Navigation tabs */}
          <div className="flex border-b">
            {guildId ? (
              <>
                <TabButton
                  icon={<UsersIcon size={18} />}
                  label="My Guild"
                  active={activeTab === "info"}
                  onClick={() => setActiveTab("info")}
                />
                <TabButton
                  icon={<SettingsIcon size={18} />}
                  label="Options"
                  active={activeTab === "options"}
                  onClick={() => setActiveTab("options")}
                />
                <TabButton
                  icon={<UserPlusIcon size={18} />}
                  label="Applicants"
                  active={activeTab === "applicants"}
                  onClick={() => setActiveTab("applicants")}
                />
              </>
            ) : (
              <TabButton
                icon={<ShieldIcon size={18} />}
                label="Find Guild"
                active={activeTab === "finder"}
                onClick={() => setActiveTab("finder")}
              />
            )}
          </div>

          {/* Content area */}
          <div
            className={`flex-grow overflow-y-auto p-4 ${isAnimating ? "opacity-50" : "opacity-100"} transition-opacity`}
          >
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Overlay when panel is open - closes panel when clicked */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-20" onClick={togglePanel} aria-hidden="true" />}
    </>
  )
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${active
        ? "border-b-2 border-violet-500 text-violet-700"
        : "text-gray-600 hover:text-violet-600 hover:bg-violet-50"
        }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  )
}
