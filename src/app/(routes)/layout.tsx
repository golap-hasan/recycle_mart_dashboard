"use client";
import RootLayoutClient from "@/layout/MainLayout";


export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <RootLayoutClient>{children}</RootLayoutClient>
        </>
    )
}
