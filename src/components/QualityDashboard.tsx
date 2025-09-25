import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  BarChart3, 
  Users, 
  FileText,
  TrendingUp,
  Database
} from "lucide-react";

export const QualityDashboard = () => {
  const mockData = {
    schemaCompliance: 94,
    missingData: 12,
    demographicCoverage: 87,
    totalRecords: 8542,
    batchResults: [
      { name: "Required Fields", status: "pass", score: 98 },
      { name: "Data Types", status: "pass", score: 95 },
      { name: "Value Ranges", status: "warning", score: 89 },
      { name: "Consistency", status: "pass", score: 92 },
    ],
    missingnessReport: [
      { field: "patient_age", missing: 156, percentage: 1.8 },
      { field: "tumor_stage", missing: 342, percentage: 4.0 },
      { field: "treatment_response", missing: 891, percentage: 10.4 },
      { field: "biomarker_status", missing: 1245, percentage: 14.6 },
    ],
    demographics: [
      { category: "Age Groups", coverage: 92 },
      { category: "Gender", coverage: 98 },
      { category: "Ethnicity", coverage: 76 },
      { category: "Geographic", coverage: 84 },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "text-success";
      case "warning": return "text-warning";
      case "fail": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "fail": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Schema Compliance</p>
                <p className="text-3xl font-bold text-success">{mockData.schemaCompliance}%</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
            <Progress value={mockData.schemaCompliance} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Missing Data</p>
                <p className="text-3xl font-bold text-warning">{mockData.missingData}%</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
            <Progress value={mockData.missingData} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Demographic Coverage</p>
                <p className="text-3xl font-bold text-primary">{mockData.demographicCoverage}%</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={mockData.demographicCoverage} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-3xl font-bold">{mockData.totalRecords.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-medical-blue/10 rounded-full">
                <Database className="h-6 w-6 text-medical-blue" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              Ready for analysis
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="batch" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="batch">Batch Checks</TabsTrigger>
          <TabsTrigger value="missing">Missingness Report</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="batch" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Batch Validation Results
              </CardTitle>
              <CardDescription>
                Automated quality checks across your dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.batchResults.map((result) => (
                  <div key={result.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={getStatusColor(result.status)}>
                        {getStatusIcon(result.status)}
                      </div>
                      <div>
                        <h4 className="font-medium">{result.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quality Score: {result.score}%
                        </p>
                      </div>
                    </div>
                    <Badge variant={result.status === "pass" ? "default" : result.status === "warning" ? "secondary" : "destructive"}>
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Missing Data Analysis
              </CardTitle>
              <CardDescription>
                Fields with missing values and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {mockData.missingnessReport.filter(item => item.percentage > 10).length} fields have more than 10% missing data
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                {mockData.missingnessReport.map((item) => (
                  <div key={item.field} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.field}</span>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          {item.missing} missing ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className={`h-2 ${item.percentage > 10 ? 'bg-destructive/20' : 'bg-warning/20'}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Demographic Coverage Score
              </CardTitle>
              <CardDescription>
                Representation across demographic categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockData.demographics.map((demo) => (
                  <div key={demo.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{demo.category}</span>
                      <span className={`font-bold ${demo.coverage > 85 ? 'text-success' : demo.coverage > 70 ? 'text-warning' : 'text-destructive'}`}>
                        {demo.coverage}%
                      </span>
                    </div>
                    <Progress value={demo.coverage} className="h-3" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-medical-light rounded-lg">
                <h4 className="font-medium mb-2">Coverage Summary</h4>
                <p className="text-sm text-muted-foreground">
                  Overall demographic representation is good, with room for improvement in ethnicity coverage.
                  Consider targeted recruitment for underrepresented groups.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};