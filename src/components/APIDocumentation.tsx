import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Play, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const APIDocumentation = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully",
    });
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/quality-check",
      description: "Analyze dataset quality",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/results/{id}",
      description: "Get analysis results",
      auth: true,
    },
    {
      method: "POST",
      path: "/api/batch-upload",
      description: "Upload dataset for batch processing",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/health",
      description: "API health check",
      auth: false,
    },
  ];

  const codeExamples = {
    curl: `curl -X POST https://api.cancerqc.com/quality-check \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_url": "https://example.com/dataset.csv",
    "schema_version": "v1.0",
    "options": {
      "check_demographics": true,
      "strict_validation": false
    }
  }'`,
    javascript: `const response = await fetch('https://api.cancerqc.com/quality-check', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    dataset_url: 'https://example.com/dataset.csv',
    schema_version: 'v1.0',
    options: {
      check_demographics: true,
      strict_validation: false
    }
  })
});

const result = await response.json();
console.log(result);`,
    python: `import requests

url = "https://api.cancerqc.com/quality-check"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "dataset_url": "https://example.com/dataset.csv",
    "schema_version": "v1.0",
    "options": {
        "check_demographics": True,
        "strict_validation": False
    }
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`
  };

  const responseExample = `{
  "id": "qc_abc123def456",
  "status": "completed",
  "dataset_info": {
    "total_records": 8542,
    "columns": 45,
    "file_size": "2.3MB"
  },
  "quality_scores": {
    "schema_compliance": 94,
    "missing_data_percentage": 12,
    "demographic_coverage": 87,
    "overall_score": 89
  },
  "batch_checks": {
    "required_fields": "pass",
    "data_types": "pass",
    "value_ranges": "warning",
    "consistency": "pass"
  },
  "missing_data": [
    {
      "field": "biomarker_status",
      "missing_count": 1245,
      "percentage": 14.6
    }
  ],
  "demographics": {
    "age_groups": 92,
    "gender": 98,
    "ethnicity": 76,
    "geographic": 84
  },
  "recommendations": [
    "Consider improving ethnicity data collection",
    "Review biomarker status collection procedures"
  ]
}`;

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            CancerQC API Documentation
          </CardTitle>
          <CardDescription>
            RESTful API for automated cancer dataset quality control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Secure</h4>
                <p className="text-sm text-muted-foreground">API key authentication</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="p-2 bg-success/10 rounded-full">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-medium">Fast</h4>
                <p className="text-sm text-muted-foreground">Real-time analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="p-2 bg-warning/10 rounded-full">
                <Play className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h4 className="font-medium">RESTful</h4>
                <p className="text-sm text-muted-foreground">Standard HTTP methods</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Available Endpoints</CardTitle>
          <CardDescription>
            Base URL: <code className="bg-muted px-2 py-1 rounded">https://api.cancerqc.com</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                    {endpoint.method}
                  </Badge>
                  <code className="font-mono text-sm">{endpoint.path}</code>
                  <span className="text-muted-foreground">{endpoint.description}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {endpoint.auth && (
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Auth Required
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Tabs defaultValue="curl" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="curl">cURL</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
        </TabsList>

        {Object.entries(codeExamples).map(([language, code]) => (
          <TabsContent key={language} value={language}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Example Request - {language.charAt(0).toUpperCase() + language.slice(1)}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(code)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{code}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Response Example */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Example Response</CardTitle>
              <CardDescription>Successful quality check analysis result</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(responseExample)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{responseExample}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-medical-light rounded-lg">
              <h4 className="font-medium mb-2">API Key Required</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Include your API key in the Authorization header for all requests.
              </p>
              <code className="bg-background px-3 py-2 rounded border text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>• API keys are available in your account dashboard</p>
              <p>• Rate limits: 100 requests per minute for standard accounts</p>
              <p>• Contact support for enterprise rate limits</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};