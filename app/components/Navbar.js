"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
export function FloatingNavDemo({ onOpenModal }) {
    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Find Jobs",
            link: "/findjobs",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Find Talents",
            link: "/findtalents",

        },
        {
            name: "About Us",
            link: "/about",

        },
        {
            name: "Testimonials",
            link: "/testimonials",

        },
    ];
    return (
        <div className="relative  w-full">
            <FloatingNav navItems={navItems} onOpenModal={onOpenModal}/>
        </div>
    );
}
