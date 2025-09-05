import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Smile,
  Frown,
  Minus
} from "lucide-react";

interface AnalyticsProps {
  emails: Array<{
    priority: 'urgent' | 'normal';
    sentiment: 'positive' | 'negative' | 'neutral';
    sentDate: string;
  }>;
}

export function Analytics({ emails }: AnalyticsProps) {
  const totalEmails = emails.length;
  const urgentEmails = emails.filter(e => e.priority === 'urgent').length;
  const positiveEmails = emails.filter(e => e.sentiment === 'positive').length;
  const negativeEmails = emails.filter(e => e.sentiment === 'negative').length;
  const neutralEmails = emails.filter(e => e.sentiment === 'neutral').length;
  
  const today = new Date().toDateString();
  const todayEmails = emails.filter(e => new Date(e.sentDate).toDateString() === today).length;
  
  const urgentPercentage = totalEmails > 0 ? (urgentEmails / totalEmails) * 100 : 0;
  const positivePercentage = totalEmails > 0 ? (positiveEmails / totalEmails) * 100 : 0;
  const negativePercentage = totalEmails > 0 ? (negativeEmails / totalEmails) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalEmails}</div>
            <p className="text-xs text-muted-foreground">
              {todayEmails} received today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-urgent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-urgent">{urgentEmails}</div>
            <Progress value={urgentPercentage} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {urgentPercentage.toFixed(1)}% of total emails
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smile className="h-4 w-4 text-positive" />
                <span className="text-sm font-medium">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{positiveEmails}</span>
                <Badge variant="secondary" className="bg-positive text-positive-foreground">
                  {positivePercentage.toFixed(0)}%
                </Badge>
              </div>
            </div>
            <Progress value={positivePercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Frown className="h-4 w-4 text-negative" />
                <span className="text-sm font-medium">Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{negativeEmails}</span>
                <Badge variant="secondary" className="bg-negative text-negative-foreground">
                  {negativePercentage.toFixed(0)}%
                </Badge>
              </div>
            </div>
            <Progress value={negativePercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-neutral" />
                <span className="text-sm font-medium">Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{neutralEmails}</span>
                <Badge variant="secondary" className="bg-neutral text-neutral-foreground">
                  {(100 - positivePercentage - negativePercentage).toFixed(0)}%
                </Badge>
              </div>
            </div>
            <Progress value={100 - positivePercentage - negativePercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Response Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Resolved</span>
              </div>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                {Math.floor(totalEmails * 0.3)}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                {totalEmails - Math.floor(totalEmails * 0.3)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}