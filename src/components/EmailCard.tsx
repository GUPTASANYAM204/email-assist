import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, AlertTriangle, MessageSquare } from "lucide-react";

interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  sentDate: string;
  priority: 'urgent' | 'normal';
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
}

interface EmailCardProps {
  email: Email;
  onSelectEmail: (email: Email) => void;
  isSelected?: boolean;
}

export function EmailCard({ email, onSelectEmail, isSelected = false }: EmailCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === 'urgent' ? <AlertTriangle className="h-4 w-4" /> : null;
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'border-primary shadow-sm' : ''
      }`}
      onClick={() => onSelectEmail(email)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium truncate">{email.sender}</span>
            {email.priority === 'urgent' && (
              <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                {getPriorityIcon(email.priority)}
                Urgent
              </Badge>
            )}
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs bg-${getSentimentColor(email.sentiment)} text-${getSentimentColor(email.sentiment)}-foreground`}
          >
            {email.sentiment}
          </Badge>
        </div>
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {email.subject}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {email.body}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{new Date(email.sentDate).toLocaleDateString()}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSelectEmail(email);
            }}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Respond
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}