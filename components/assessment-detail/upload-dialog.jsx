import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UploadDialog({ open, onOpenChange, onUpload, uploadedPPT }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Presentation</DialogTitle>
          <DialogDescription>
            Upload your PowerPoint presentation for the assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            type="file"
            accept=".ppt,.pptx"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setSelectedFile(file);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            {uploadedPPT
              ? "Select a new file to change your presentation."
              : "Upload your PowerPoint presentation."}
          </p>
          <Button
            onClick={handleUpload}
            className="mt-4 w-full"
            disabled={!selectedFile}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
