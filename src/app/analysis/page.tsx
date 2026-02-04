"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mockData";
import { ArrowLeft, TrendingUp, PieChart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AnalysisPage() {
    const activeSubs = MOCK_SUBSCRIPTIONS.filter(s => s.active);
    const totalMonthly = activeSubs.reduce((acc, sub) => acc + (sub.billingCycle === 'monthly' ? sub.price : sub.price / 12), 0);

    // Calculate category breakdown
    const categorySpend: Record<string, number> = {};
    activeSubs.forEach(sub => {
        const monthlyCost = sub.billingCycle === 'monthly' ? sub.price : sub.price / 12;
        categorySpend[sub.category] = (categorySpend[sub.category] || 0) + monthlyCost;
    });

    const sortedCategories = Object.entries(categorySpend)
        .sort(([, a], [, b]) => b - a);

    const maxSpend = Math.max(...Object.values(categorySpend), 1);

    return (
        <div className="max-w-md mx-auto min-h-screen p-6 space-y-6">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">Spending Analysis</h1>
            </header>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-none">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-purple-200">PROJECTED MONTHLY</p>
                        <h2 className="text-3xl font-bold text-white">{totalMonthly.toFixed(2)}€</h2>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <PieChart className="h-6 w-6 text-purple-300" />
                    </div>
                </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="border-white/5 bg-white/5">
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {sortedCategories.map(([category, amount]) => {
                        const percentage = (amount / totalMonthly) * 100;
                        return (
                            <div key={category} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize">{category}</span>
                                    <span className="font-semibold">{amount.toFixed(2)}€</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full",
                                            category === 'streaming' ? 'bg-red-500' :
                                                category === 'utilities' ? 'bg-yellow-500' :
                                                    category === 'mobile' ? 'bg-blue-500' :
                                                        'bg-purple-500'
                                        )}
                                        style={{ width: `${(amount / maxSpend) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

            {/* Inflation Tracker Mockup */}
            <Card className="border-white/5 bg-white/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-red-400" />
                        Inflation Watch
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
                        <div className="shrink-0 h-10 w-10 bg-black/20 rounded-full flex items-center justify-center text-xs">N</div>
                        <div>
                            <h4 className="font-semibold text-sm">Netflix Premium</h4>
                            <p className="text-xs text-red-300">Price increased by 2€ last month.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
