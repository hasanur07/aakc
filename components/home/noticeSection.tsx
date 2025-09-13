import { Button } from "@heroui/button"
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import React from "react";

const notices = [
    {
        title: "ADMISSION TEST-I RESULT FOR CLASS-IX",
        date: "12th March 2025"
    },
    {
        title: "ADMISSION TEST RESULT CLASS-X",
        date: "12th March 2025"
    },
    {
        title: "ADMISSION TEST-II RESULT FOR CLASS-IX",
        date: "12th March 2025"
    },
    {
        title: "ADMISSION TEST-II RESULT FOR CLASS-V",
        date: "12th March 2025"
    },
    {
        title: "ADMISSION TEST-II RESULT",
        date: "12th March 2025"
    },
]

export default function NoticeSection() {
    return (
        <section className="flex max-w-7xl mx-auto h-screen justify-center items-center px-6 py-18 flex-col gap-6">
            <h1 className="text-2xl font-bold">NOTICE</h1>
            <div className="flex p-3 w-full sm:w-96 h-96 flex-col bg-white rounded-4xl border-2 border-foreground-100">
                <div className="flex justify-between">
                    <div className="flex w-10 h-10 justify-center items-center bg-foreground-100 rounded-full">
                        📌
                    </div>
                    <Button isIconOnly radius="full" className="bg-foreground-100" title="View All">
                        <HugeiconsIcon
                            icon={ArrowRight02FreeIcons}
                            size={20}
                            color="black"
                        />
                    </Button>
                </div>
                <div className="flex flex-col gap-0 pt-2 mt-2 overflow-y-auto">
                    {
                        notices.map((notice) => (
                            <NoticeBox key={notice.title} title={notice.title} date={notice.date} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}


function NoticeBox({ title, date }: { title: string; date: string }) {
    return (
        <Link
            href="#"
            className="group rounded-lg hover:bg-foreground-100 p-2 gap-2 transition-all flex justify-between"
        >
            <div className="flex flex-col min-w-0"> {/* min-w-0 is key inside flex */}
                <h5 className="truncate text-ellipsis whitespace-nowrap">
                    {title}
                </h5>
                <p className="text-[12px] opacity-50">{date}</p>
            </div>
            <Button
                isIconOnly
                radius="full"
                className="bg-foreground-200 hidden group-hover:flex transition-all"
                title="View All"
            >
                <HugeiconsIcon icon={ArrowRight02FreeIcons} size={20} color="black" />
            </Button>
        </Link>
    )
}