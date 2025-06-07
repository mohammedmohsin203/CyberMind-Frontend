"use client";
import React from "react";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import img from '../../../public/Group.svg'

export const FloatingNav = ({ navItems, className, onOpenModal }) => {
    return (
        <div
            className={cn(
                "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
                className
            )}
        >
            <Image src={img} height={50} width={50} alt="group" className="gap-y-4 mr-16" />
            {navItems.map((navItem, idx) => (
                <a
                    key={`link-${idx}`}
                    href={navItem.link}
                    className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                >
                    <span className="hidden sm:block text-md mx-8">{navItem.name}</span>
                </a>
            ))}
            <button
                onClick={onOpenModal}
                className="border cursor-pointer text-sm bg-[#9521f0] text-white relative border-neutral-200 dark:border-white/[0.2] px-4 py-2 rounded-full"
            >
                <span>Create Job</span>
            </button>
        </div>
    );
};
