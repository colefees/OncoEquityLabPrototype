import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/FileUpload";
import { QualityDashboard } from "@/components/QualityDashboard";
import { APIDocumentation } from "@/components/APIDocumentation";
import { Shield, BarChart3, FileText, Users, CheckCircle, AlertTriangle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"upload" | "dashboard" | "api">("upload");
  const [hasResults, setHasResults] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-medical">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">OnceEquity</h1>
                <p className="text-sm text-muted-foreground">Cancer Dataset Quality Control</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                API Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "upload", label: "Upload Dataset", icon: FileText },
              { id: "dashboard", label: "Quality Dashboard", icon: BarChart3 },
              { id: "api", label: "API Documentation", icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {activeTab === "upload" && !hasResults && (
          <div className="text-center mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">
                Ensure Your Cancer Dataset Quality
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive quality control for cancer research datasets with automated schema validation,
                missingness analysis, and demographic coverage scoring.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Schema Compliance", icon: CheckCircle, color: "text-success" },
                  { label: "Batch Validation", icon: BarChart3, color: "text-primary" },
                  { label: "Missing Data", icon: AlertTriangle, color: "text-warning" },
                  { label: "Demographics", icon: Users, color: "text-medical-blue" },
                ].map(({ label, icon: Icon, color }) => (
                  <Card key={label} className="shadow-card">
                    <CardContent className="flex flex-col items-center p-4">
                      <Icon className={`h-8 w-8 mb-2 ${color}`} />
                      <span className="text-sm font-medium text-center">{label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {activeTab === "upload" && (
          <FileUpload onResults={() => setHasResults(true)} hasResults={hasResults} />
        )}
        
        {activeTab === "dashboard" && (
          <QualityDashboard />
        )}
        
        {activeTab === "api" && (
          <APIDocumentation />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">OnceEquity Platform</h3>
              <p className="text-sm text-muted-foreground">
                Professional-grade quality control for cancer research datasets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Schema Validation</li>
                <li>Missingness Analysis</li>
                <li>Demographic Coverage</li>
                <li>Batch Processing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Built for cancer research excellence.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            © 2024 OnceEquity. Professional dataset quality control.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;