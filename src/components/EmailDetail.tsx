import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Clock, AlertTriangle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

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

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

export function EmailDetail({ email, onClose }: EmailDetailProps) {
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  const generateAIResponse = async () => {
    setIsGenerating(true);
    // Simulate AI response generation
    setTimeout(() => {
      let aiResponse = "";
      
      if (email.sentiment === 'negative') {
        aiResponse = `Dear ${email.sender.split('@')[0]},\n\nI sincerely apologize for the inconvenience you've experienced. I understand how frustrating this must be for you.\n\nI'm personally looking into your issue and will ensure it's resolved as quickly as possible. Let me connect you with our senior support team who can provide immediate assistance.\n\nThank you for your patience, and please don't hesitate to reach out if you need anything else.\n\nBest regards,\nSupport Team`;
      } else if (email.priority === 'urgent') {
        aiResponse = `Dear ${email.sender.split('@')[0]},\n\nThank you for reaching out. I understand this is urgent and requires immediate attention.\n\nI'm escalating your request to our priority support queue right away. You can expect a response within the next 2 hours with a detailed solution.\n\nI'll also send you a direct contact number for immediate assistance if needed.\n\nBest regards,\nSupport Team`;
      } else {
        aiResponse = `Dear ${email.sender.split('@')[0]},\n\nThank you for contacting us. I'd be happy to help you with your request.\n\nI'm looking into this matter and will provide you with a comprehensive solution shortly. Based on your inquiry, I believe we can resolve this quickly.\n\nPlease let me know if you have any additional questions in the meantime.\n\nBest regards,\nSupport Team`;
      }
      
      setResponse(aiResponse);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{email.subject}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{email.sender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(email.sentDate).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {email.priority === 'urgent' && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
              <Badge 
                variant="secondary"
                className={`bg-${getSentimentColor(email.sentiment)} text-${getSentimentColor(email.sentiment)}-foreground`}
              >
                {email.sentiment}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-foreground">{email.body}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AI-Generated Response</CardTitle>
            <Button 
              onClick={generateAIResponse} 
              disabled={isGenerating}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate AI Response"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="AI-generated response will appear here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <Separator />
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose}>
              Back to Inbox
            </Button>
            <Button className="flex items-center gap-2" disabled={!response.trim()}>
              <Send className="h-4 w-4" />
              Send Response
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}