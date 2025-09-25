import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onResults: () => void;
  hasResults: boolean;
}

export const FileUpload = ({ onResults, hasResults }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.match(/\.(csv|tsv|xlsx|json)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, TSV, XLSX, or JSON file.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing
    setTimeout(() => {
      setUploadProgress(100);
      setIsProcessing(false);
      onResults();
      toast({
        title: "Analysis Complete",
        description: "Your dataset has been analyzed successfully.",
      });
    }, 3000);
  };

  if (hasResults) {
    return (
      <div className="space-y-6">
        <Card className="shadow-medical">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  Analysis Complete
                </CardTitle>
                <CardDescription>
                  Dataset: {uploadedFile?.name || 'cancer_dataset.csv'}
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-success border-success">
                Processing Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-success/10 to-success/5 p-4 rounded-lg border border-success/20">
                <div className="text-2xl font-bold text-success">94%</div>
                <div className="text-sm text-muted-foreground">Schema Compliance</div>
              </div>
              <div className="bg-gradient-to-r from-warning/10 to-warning/5 p-4 rounded-lg border border-warning/20">
                <div className="text-2xl font-bold text-warning">12%</div>
                <div className="text-sm text-muted-foreground">Missing Data</div>
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Demographic Coverage</div>
              </div>
              <div className="bg-gradient-to-r from-medical-blue/10 to-medical-blue/5 p-4 rounded-lg border border-medical-blue/20">
                <div className="text-2xl font-bold text-medical-blue">8,542</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <Button onClick={() => window.location.reload()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Dataset
              </Button>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-medical">
        <CardHeader className="text-center">
          <CardTitle>Upload Cancer Dataset</CardTitle>
          <CardDescription>
            Upload your cancer dataset for comprehensive quality analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isProcessing ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drop your dataset here or click to browse
              </h3>
              <p className="text-muted-foreground mb-6">
                Supports CSV, TSV, XLSX, and JSON files up to 50MB
              </p>
              <input
                type="file"
                accept=".csv,.tsv,.xlsx,.json"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild className="cursor-pointer">
                  <span>
                    <FileText className="h-4 w-4 mr-2" />
                    Select File
                  </span>
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-primary-foreground animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Dataset</h3>
                <p className="text-muted-foreground">
                  Running quality control checks on {uploadedFile?.name}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing Progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  {[
                    { step: "Schema Validation", completed: uploadProgress > 25 },
                    { step: "Missing Data Analysis", completed: uploadProgress > 50 },
                    { step: "Demographic Coverage", completed: uploadProgress > 75 },
                    { step: "Generating Report", completed: uploadProgress >= 100 },
                  ].map(({ step, completed }) => (
                    <div key={step} className="flex items-center space-x-2">
                      {completed ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className={completed ? "text-foreground" : "text-muted-foreground"}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium mb-2">Supported Dataset Formats</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CSV/TSV files with headers</li>
                <li>• Excel spreadsheets (.xlsx)</li>
                <li>• JSON structured data</li>
                <li>• Maximum file size: 50MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};