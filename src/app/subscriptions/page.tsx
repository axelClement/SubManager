"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mockData";
import { Search, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { Category } from "@/types";

const CATEGORIES: Category[] = ["streaming", "utilities", "mobile", "internet", "gym", "other"];

export default function SubscriptionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

    const filteredSubs = MOCK_SUBSCRIPTIONS.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || sub.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-md mx-auto min-h-screen p-6 space-y-6">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">Your Subscriptions</h1>
            </header>

            {/* Search & Filter */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search subscriptions..."
                        className="pl-9 bg-white/5 border-white/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Badge
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        className="cursor-pointer whitespace-nowrap"
                        onClick={() => setSelectedCategory("all")}
                    >
                        All
                    </Badge>
                    {CATEGORIES.map(cat => (
                        <Badge
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap capitalize"
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {filteredSubs.map((sub) => (
                    <Link href={`/subscription/${sub.id}`} key={sub.id}>
                        <Card className="hover:bg-white/10 transition-colors border-white/5 bg-white/5 mb-3">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {sub.logoUrl ? (
                                        <img src={sub.logoUrl} alt={sub.name} className="h-10 w-10 rounded-xl object-contain bg-white p-1" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                                            {sub.serviceName[0]}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{sub.name}</h4>
                                        <p className="text-xs text-muted-foreground capitalize truncate">{sub.category} • {sub.billingCycle}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm">{sub.price}€</p>
                                    <p className="text-[10px] text-muted-foreground">Next: {new Date(sub.nextPaymentDate).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                {filteredSubs.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                        No subscriptions found.
                    </div>
                )}
            </div>
        </div>
    );
}
