"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@/types/appwrite.types";

export const columns: ColumnDef<Report>[] = [
    {
        header: "#",
        cell: ({ row }) => {
            return <p className="text-14-medium ">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "patientName",
        header: "Patient Name",
        cell: ({ row }) => {
            const report = row.original;
            return <p className="text-14-medium ">{report.patientName}</p>;
        },
    },
    {
        accessorKey: "gameName",
        header: "Game",
        cell: ({ row }) => {
            const report = row.original;
            return <p className="text-14-medium ">{report.gameName}</p>;
        },
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => {
            const report = row.original;
            return <p className="text-14-medium ">{report.score}</p>;
        },
    },
];
