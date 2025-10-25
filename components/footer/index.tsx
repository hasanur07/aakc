"use client";

import React from "react"
import TextPressure from "../ui/textPresser"
import { Link } from "@heroui/link"

export default function Footer() {
    return (
        <div className="mt-12">
            <footer className="flex flex-col max-w-7xl mx-auto w-full px-6">
                <div>
                    <TextPressure
                        text="AAKCMS"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={false}
                        textColor="#000"
                        minFontSize={36}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <h2 className="mb-2">Contact Us</h2>
                        <p className="opacity-55">Barabaria<br></br>
                            North 24 PGS, WB, Kol-700121<br></br>
                            Email: info@aakcedu.com<br></br>
                            Phone: +91 1234567890</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="mb-2">Quick Links</h2>
                        <Link href="#" className="text-current opacity-55">About Us</Link>
                        <Link href="#" className="text-current opacity-55">Admissions</Link>
                        <Link href="#" className="text-current opacity-55">Programs</Link>
                        <Link href="#" className="text-current opacity-55">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="fmb-2">Follow Us</h2>
                        <Link href="#" className="text-current opacity-55">Facebook</Link>
                        <Link href="#" className="text-current opacity-55">Twitter</Link>
                        <Link href="#" className="text-current opacity-55">Instagram</Link>
                        <Link href="#" className="text-current opacity-55">LinkedIn</Link>
                    </div>
                </div>
            </footer>
            <div className="w-full flex items-center justify-between py-3 mt-6 max-w-7xl mx-auto px-6">
                <span>©2025 Al Ameen Knowledge City</span>
                <Link
                    isExternal
                    color="foreground"
                    href="https://hasanur.doclet.app?utm_source=aakc"
                    title="hasanur.12 portfolio"
                >
                    <p>by <strong className="text-blue-500 font-normal">hasanur.io</strong></p>
                </Link>
            </div>
        </div>
    )
}
