import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_SUBSCRIPTIONS } from "@/lib/mockData";
import { CreditCard, TrendingUp, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const activeSubs = MOCK_SUBSCRIPTIONS.filter(s => s.active);
  const totalMonthly = activeSubs.reduce((acc, sub) => {
    // Basic calculation assuming monthly specific price or simplified yearly
    return acc + (sub.billingCycle === 'monthly' ? sub.price : sub.price / 12);
  }, 0);

  // Sort by next payment date
  const upcomingRenewals = [...activeSubs].sort((a, b) =>
    new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()
  ).slice(0, 3);

  return (
    <div className="max-w-md mx-auto min-h-screen p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">Review your finances</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          A
        </div>
      </header>

      {/* Main Stats Card */}
      <Card className="border-none bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-white/70">Total Monthly</p>
              <h2 className="text-4xl font-bold text-white mt-1">
                {totalMonthly.toFixed(2)}€
              </h2>
            </div>
            <div className="p-2 bg-white/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="glass" className="text-green-300 bg-green-500/10 border-green-500/20">
              +{((totalMonthly / 1500) * 10).toFixed(1)}% vs last month
            </Badge>
            <Badge variant="glass">
              {activeSubs.length} Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/subscriptions" className="w-full">
          <Button variant="secondary" className="w-full h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10">
            <CreditCard className="h-6 w-6 text-purple-400" />
            <span className="text-xs">All Subscriptions</span>
          </Button>
        </Link>
        <Link href="/add" className="w-full">
          <Button variant="secondary" className="w-full h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10">
            <Plus className="h-6 w-6 text-pink-400" />
            <span className="text-xs">Add New</span>
          </Button>
        </Link>
      </div>

      {/* Upcoming Renewals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Upcoming Renewals</h3>
          <Link href="/subscriptions" className="text-xs text-purple-400 hover:text-purple-300">
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {upcomingRenewals.map((sub) => {
            const daysUntil = Math.ceil((new Date(sub.nextPaymentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            return (
              <Link href={`/subscription/${sub.id}`} key={sub.id} className="block">
                <Card className="group hover:bg-white/10 transition-colors border-white/5 bg-white/5">
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
                        <p className="text-xs text-muted-foreground">
                          {new Date(sub.nextPaymentDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{sub.price}€</p>
                      {daysUntil <= 3 && (
                        <div className="flex items-center text-xs text-orange-400 gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>In {daysUntil} days</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
