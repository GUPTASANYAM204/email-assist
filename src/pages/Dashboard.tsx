import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmailCard } from "@/components/EmailCard";
import { EmailDetail } from "@/components/EmailDetail";
import { Analytics } from "@/components/Analytics";
import { sampleEmails } from "@/data/sampleEmails";
import { 
  Search, 
  Filter, 
  Inbox,
  BarChart3,
  Mail,
  AlertTriangle,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<"all" | "urgent" | "normal">("all");
  const [filterSentiment, setFilterSentiment] = useState<"all" | "positive" | "negative" | "neutral">("all");

  const filteredEmails = sampleEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.body.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || email.priority === filterPriority;
    const matchesSentiment = filterSentiment === "all" || email.sentiment === filterSentiment;
    
    return matchesSearch && matchesPriority && matchesSentiment;
  });

  const urgentEmails = filteredEmails.filter(e => e.priority === 'urgent');
  const normalEmails = filteredEmails.filter(e => e.priority === 'normal');
  const sortedEmails = [...urgentEmails, ...normalEmails];

  if (selectedEmail) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <EmailDetail 
            email={selectedEmail} 
            onClose={() => setSelectedEmail(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">AI Communication Assistant</h1>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredEmails.length} emails
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {urgentEmails.length} urgent
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {normalEmails.length} normal
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5" />
                  Email Inbox
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search emails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterPriority === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterPriority("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterPriority === "urgent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterPriority("urgent")}
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Urgent
                    </Button>
                    <Button
                      variant={filterPriority === "normal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterPriority("normal")}
                    >
                      Normal
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filterSentiment === "all" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterSentiment("all")}
                  >
                    All Sentiments
                  </Button>
                  <Button
                    variant={filterSentiment === "positive" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterSentiment("positive")}
                    className="bg-positive/10 text-positive hover:bg-positive/20"
                  >
                    Positive
                  </Button>
                  <Button
                    variant={filterSentiment === "negative" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterSentiment("negative")}
                    className="bg-negative/10 text-negative hover:bg-negative/20"
                  >
                    Negative
                  </Button>
                  <Button
                    variant={filterSentiment === "neutral" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterSentiment("neutral")}
                    className="bg-neutral/10 text-neutral hover:bg-neutral/20"
                  >
                    Neutral
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {sortedEmails.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No emails match your current filters.</p>
                  </CardContent>
                </Card>
              ) : (
                sortedEmails.map((email) => (
                  <EmailCard
                    key={email.id}
                    email={email}
                    onSelectEmail={setSelectedEmail}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Analytics emails={sampleEmails} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;